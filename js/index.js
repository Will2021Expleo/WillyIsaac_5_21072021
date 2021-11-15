/* eslint-disable no-undef */
createRecipesObject(); //on rappelle la fonction createRecipeObject pour affihcer son contenu dans le tableau des recettes, après avoir déclaré la nouvelle valeur de "allRecipes"

//on appelle tout les filtres
getFilters();

getInputEvent(); //permet de faire une recherche depuis le champ de recherche principale

//displayRecipes(); //à supprimer pour le chargement de la page

// pour gérer les recherches depuis les ingrédients, les ustensiles et les appareils
getInputAppliancesEvent();
getInputUstensilsEvent();
getInputIngredientsEvent();
