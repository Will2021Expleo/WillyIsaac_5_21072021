createRecipesObject(); //on rappelle la fonction createRecipeObject pour affihcer son contenu dans le tableau des recettes, après avoir déclaré la nouvelle valeur de "allRecipes"

//on appelle tout les filtres
getFilters();

createEventsForFilters();

getValidRecipes(); //permet d'afficher les recettes contenants les filtres cliqués

getInputEvent(); //permet de faire une recherche depuis le champ de recherche principale
