using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string fileName = "recipes.json";
List<Recipe> recipeDatabase = new();
Recipe newRecipe = new Recipe(1,"Hello","Mark","photo",3,RecipeDifficulty.Easy,new List<Ingredient>(), new List<string>());
Recipe newRecipe2 = new Recipe(1,"boo","Mark","photo",3,RecipeDifficulty.Easy,new List<Ingredient>(), new List<string>());
recipeDatabase.Add(newRecipe);
recipeDatabase.Add(newRecipe2);
if (File.Exists(fileName))
{
    var json = File.ReadAllText(fileName);
    recipeDatabase.AddRange(JsonSerializer.Deserialize<List<Recipe>>(json));
}

app.MapGet("/", () => "Hello World!");

app.MapGet("/recipes", () => recipeDatabase);
app.MapGet("/recipes/search", ([FromQuery] string title) => {
    return recipeDatabase.Where(r => r.Title.ToLower().Contains(title)).ToList();
});

app.Run();


public record Recipe(int Id, string Title, string Creator, string PhotoURL, int ServingSize, RecipeDifficulty Difficulty, List<Ingredient> Ingredients, List<string> Directions);
public enum RecipeDifficulty {Easy, Standard, Medium, Intermediate, Hard}
public record Ingredient (string Name, float Quantity, string Unit);