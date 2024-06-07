const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.set('strictQuery', true); // or false depending on your preference

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(result => {
    console.log("Existing recipes deleted:", result);

    const newRecipe = {
      title: 'scrambled eggs',
      level: 'Easy Peasy',
      ingredients: ['egg', 'butter', 'cream milk'],
      cuisine: 'International',
    };

    console.log("New Recipe added:", newRecipe);

    return Recipe.create(newRecipe);
  })
  .then(() => {
    console.log(`Adding recipes`);
    return Recipe.insertMany(data);
  })
  .then(addedRecipes => {
    addedRecipes.forEach(recipe => {
      console.log(`${recipe.title}`);
    });
  })
  .then(()=> {
    return Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100},
      {new: true, runValidators: true }
    );
  })
  .then((updatedRecipe)=>{
    console.log(`Success! recipe was founded and updated!!! ${updatedRecipe.title} with new duration ${updatedRecipe.duration}`);
  })
  .then(()=>{
    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  .then(()=>{
    console.log(`Success, we deleted one recipe`);
  })
  .then(()=> {
    return mongoose.connection.close();
  })
  .catch (error => {
  console.error('Error connecting to the database', error);
});