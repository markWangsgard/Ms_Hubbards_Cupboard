using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Recipe> recipeDatabase = new();

app.MapGet("/", () => "Hello World!");

app.MapGet("/recipes", () => {
    return recipeDatabase;
});

app.Run();


public record Recipe(int Id, string Title, string Creator, string PhotoURL, int ServingSize, RecipeDifficulty Difficulty, List<Ingredient> Ingredients, List<string> Directions);
public enum RecipeDifficulty {Easy, Standard, Medium, Intermediate, Hard}
public record Ingredient (string Name, float Quantity, string Unit);