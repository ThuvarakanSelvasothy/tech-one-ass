using System;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3001").AllowAnyHeader().AllowAnyMethod();

                      });
});

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
app.MapGet("/", () =>
{
    return "hello my world";
});
app.MapPost("/convert", (string id) =>
{
    var data = NumberConverter.ConvertToWords(id);
    return data;
});

app.Run();
