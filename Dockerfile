FROM mcr.microsoft.com/dotnet/sdk:9.0
WORKDIR /App
COPY ./api ./
RUN dotnet restore
RUN dotnet publish -o out
WORKDIR /App/out
ENTRYPOINT ["dotnet", "api.dll"]