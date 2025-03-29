using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());


string fileName = "recipes.json";
List<Recipe> recipeDatabase = new();
for (int i = 0; i < 20; i++)
{
    Recipe newRecipe = new Recipe(1, "Hello", "Mark", "/images/pancakes.jpg", 3, new TimeToMake(1, 30), RecipeDifficulty.Easy, 4.5, new List<Ingredient>(), new List<string>());
    recipeDatabase.Add(newRecipe);
}
if (File.Exists(fileName))
{
    var json = File.ReadAllText(fileName);
    recipeDatabase.AddRange(JsonSerializer.Deserialize<List<Recipe>>(json));
}

app.MapGet("/", () => "Hello World!");

app.MapGet("/recipes", () => recipeDatabase.Select((recipe) =>
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
}));
app.MapGet("/recipes/search", ([FromQuery] string title) =>
{
    return recipeDatabase.Where(r => r.Title.ToLower().Contains(title)).ToList();
});

app.Run();


public record Recipe
(
    int Id,
    string Title,
    string Creator,
    string PhotoURL,
    int ServingSize,
    TimeToMake Duration,
    RecipeDifficulty Difficulty,
    double Rating,
    List<Ingredient> Ingredients,
    List<string> Directions);

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
List<string> Directions);
public enum RecipeDifficulty { Easy = 1, Standard = 2, Medium = 3, Intermediate = 4, Hard = 5 }
public record Ingredient(string Name, float Quantity, string Unit);
public record TimeToMake(int hours, int minutes);