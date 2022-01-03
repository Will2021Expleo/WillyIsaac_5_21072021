/* eslint-disable no-undef */
createRecipesObject(); //on rappelle la fonction createRecipeObject pour affihcer son contenu dans le tableau des recettes, après avoir déclaré la nouvelle valeur de "allRecipes"
//==> createAllRecipes

//on appelle tout les filtres
getFilters(); //==> creatéFilters

getInputEvent(); //==> principaSearch permet de faire une recherche depuis le champ de recherche principale

//displayRecipes(); //à supprimer pour le chargement de la page

// pour gérer les recherches depuis les ingrédients, les ustensiles et les appareils

//==>searchInfilters
getInputAppliancesEvent();
getInputUstensilsEvent();
getInputIngredientsEvent();
//searchInfilters();
