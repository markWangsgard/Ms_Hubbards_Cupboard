using System.Reflection;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.VisualBasic;

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
    recipe.Difficulty.ToString(),
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
    return recipeDatabase.FindLastIndex(recipe => recipe.Title == title);
});
app.MapPost("/rating/{id}/{rating}", (int id, int rating) =>
{
    Recipe? currentRecipe = recipeDatabase.Find((Recipe recipe) =>
    {
        return recipe.Id == id;
    });
    currentRecipe.Rating = (currentRecipe.Rating + rating) / 2;
    saveRecipes();
});
app.MapPost("/newRecipe/", (RecipeWithDifficultyInInt recipeObject) =>
{
    Recipe recipe = new(
        recipeObject.Id,
        recipeObject.Title,
        recipeObject.Creator,
        recipeObject.PhotoURL,
        recipeObject.ServingSize,
        recipeObject.Duration,
        (RecipeDifficulty)recipeObject.Difficulty,
        recipeObject.Rating,
        recipeObject.Ingredients,
        recipeObject.Directions
    );
    // var recipeObject = JsonSerializer.Deserialize<Recipe>(recipe);
    recipeDatabase.Add(recipe);
    recipe.Id = recipeDatabase.IndexOf(recipe);
    saveRecipes();
});
app.MapPost("/newRecipe/photo/{id}", async (int id, IFormFile photo) =>
{
    string path = $"./images/{photo.FileName}";
    using (var stream = File.Create(path))
    {
        await photo.CopyToAsync(stream);
    }
    Recipe recipe = recipeDatabase.Find(recipe => recipe.Id == id);
    recipe.PhotoURL = path;

}).DisableAntiforgery();

app.MapGet("/photo/{fileName}", (string fileName) =>
{
    // string path = $"./images/{fileName}";
    foreach (var file in Directory.GetFiles($"./images"))
    {
        using (FileStream fs = File.Open(file, FileMode.Open))
        {
            return fs;

        }
    }
    return path;
});

app.Run();

void saveRecipes()
{
    string json = JsonSerializer.Serialize(recipeDatabase);
    File.WriteAllText(fileName, json);
}

public class Recipe
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Creator { get; set; }
    public string PhotoURL { get; set; }
    public int ServingSize { get; set; }
    public TimeToMake Duration { get; set; }
    public RecipeDifficulty Difficulty { get; set; }
    public double Rating { get; set; }
    public List<Ingredient> Ingredients { get; set; }
    public List<string> Directions { get; set; }

    public Recipe(int id, string title, string creator, string photoURL, int servingSize, TimeToMake duration, RecipeDifficulty difficulty, double rating, List<Ingredient> ingredients, List<string> directions)
    {
        this.Id = id;
        this.Title = title;
        this.Creator = creator;
        this.PhotoURL = photoURL;
        this.ServingSize = servingSize;
        this.Duration = duration;
        this.Difficulty = difficulty;
        this.Rating = rating;
        this.Ingredients = ingredients;
        this.Directions = directions;
    }
}

public record RecipeWithDifficultyInInt
(
int Id,
string Title,
string Creator,
string PhotoURL,
int ServingSize,
TimeToMake Duration,
string DifficultyRating,
int Difficulty,
double Rating,
List<Ingredient> Ingredients,
List<string> Directions);
public enum RecipeDifficulty { Easy = 1, Standard = 2, Medium = 3, Intermediate = 4, Hard = 5 }
public record Ingredient(string Name, float Quantity, string Unit);
public record TimeToMake(int hours, int minutes);