using System.Reflection;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.VisualBasic;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());


string fileName = "recipes.json";
List<Recipe> recipeDatabase = new();

// Generation of random Recipes, if needed
/*
Ingredient ingredient=new("Shredded Cheese", 1, "Cup");
for (int i = 0; i < 20; i++)
{
    Recipe newRecipe = new Recipe(i, "Hello", "Mark", "/images/pancakes.jpg", Random.Shared.Next(20), new TimeToMake(Random.Shared.Next(10), Random.Shared.Next(60)), (RecipeDifficulty)Random.Shared.Next(6), Random.Shared.Next(6), new List<Ingredient>([ingredient, ingredient, ingredient]), new List<string>(["Step 1", "Step 2", "Step 3"]));
    recipeDatabase.Add(newRecipe);
} */
if (File.Exists(fileName))
{
    var json = File.ReadAllText(fileName);
    List<Recipe> recipes = JsonSerializer.Deserialize<List<Recipe>>(json);
    recipeDatabase.AddRange(recipes);
}

List<RecipeWithDifficultyInInt> convertDifficulty()
{
    return recipeDatabase.Select((recipe) =>
{
    return new RecipeWithDifficultyInInt(
    recipe.Id,
    recipe.Title,
    recipe.Creator,
    recipe.PhotoURL,
    recipe.ServingSize,
    recipe.Duration,
    (int)recipe.Difficulty,
    recipe.Rating,
    recipe.Ingredients,
    recipe.Directions
    );
}).ToList();
}

app.MapGet("/", () => "Hello World!");

app.MapGet("/recipes", () => convertDifficulty());
app.MapGet("/recipes/search", ([FromQuery] string title) =>
{
    return recipeDatabase.Where(r => r.Title.ToLower().Contains(title)).ToList();
});
app.MapGet("/recipes/{id}", (int id) =>
{
    return convertDifficulty().FindLast((recipe) => recipe.Id == id);
});
app.MapGet("/recipes/id", ([FromQuery] string title) =>
{
    return recipeDatabase.FindLast(recipe => recipe.Title == title).Id;
});
app.MapPost("/rating/{id}/{rating}", (int id, int rating) =>
{
    Recipe currentRecipe = recipeDatabase.Find((Recipe recipe) =>
    {
        return recipe.Id == id;
    });
    currentRecipe.Rating = (currentRecipe.Rating + rating) / 2;
    saveRecipes();
});
app.MapPost("/newRecipe/upload", ([FromForm] IFormFile photo, [FromForm] string recipeJSON) =>
{
    Recipe newRecipe = JsonSerializer.Deserialize<Recipe>(recipeJSON, new JsonSerializerOptions
    {
        NumberHandling = JsonNumberHandling.AllowReadingFromString
    });
    int id = recipeDatabase.Count();
    string fileName = id + $".{photo.FileName.Split(".")[1]}";
    newRecipe.Id = id;
    newRecipe.PhotoURL = fileName;
    string path = $"./images/{fileName}";

    using (var stream = File.Create(path))
    {
        photo.CopyTo(stream);
    }
    recipeDatabase.Add(newRecipe);
    saveRecipes();

}).DisableAntiforgery();

app.MapGet("/photo/{fileName}", (string fileName) =>
{
    var path = $"./images/{fileName}";
    var bytes = File.ReadAllBytes(path);
    return Results.File(bytes, "image/*");
});

app.Run();

void saveRecipes()
{
    string json = JsonSerializer.Serialize(recipeDatabase);
    File.WriteAllText(fileName, json);
}
public record struct Recipe
{
    public int Id {get; set;}
public string Title {get; init;}
public string Creator {get; init;}
public string PhotoURL {get; set;}
public int ServingSize {get; init;}
public TimeToMake Duration {get; init;}
public int Difficulty {get; init;}
public double Rating {get; set;}
public List<Ingredient> Ingredients {get; init;}
public List<string> Directions {get; init;}
}


public record RecipeWithDifficultyInInt
(
int Id,
string Title,
string Creator,
string PhotoURL,
int ServingSize,
TimeToMake Duration,
int Difficulty,
double Rating,
List<Ingredient> Ingredients,
List<string> Directions
);
public enum RecipeDifficulty { Easy = 1, Standard = 2, Medium = 3, Intermediate = 4, Hard = 5 }
public record Ingredient(string Name, float Quantity, string Unit);
public record TimeToMake(int hours, int minutes);