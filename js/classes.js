/* eslint-disable no-unused-vars */
//création d'une classe Recipe pour récupérer toutes les recettes
class Recipe {
  //pour stocker les recettes on crée une classe "Recipe"
  constructor(name, description, time) {
    //on met en paramètre le "nom" la "description" et le "time"
    this.name = name; //on va stocker le nom des recettes renseigné en paramètre
    this.description = description; //on va stocker la description des recettes renseigné en paramètre
    this.time = time; //on va stocker le temps des recettes renseigné en paramètre
    this.ingredients = []; //on stocke les ingrédients dans un tableau vide
    this.appliance = []; //on stocke les appliances dans un tableau vide
    this.ustensils = []; //on stocke les ustensils dans un tableau vide
    this.hasFilters = 0;
  }
  /**
   * Pour affichier le contenu de la classe Recipe:
   * let oneRecipe = new Recipe("choux", 10, "exemple de recette")
   * console.log("voici le contenu de notre recette:", oneRecipe)
   */

  //Méthode qui permet d'ajouter les ingrédients à notre liste d'ingrédients
  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  //Méthode qui permet d'ajouter des plats à notre liste de plats
  addAppliance(appliance) {
    this.appliance.push(appliance);
  }

  //Méthode qui permet d'ajouter des ustensiles à notre liste d'ustensiles
  addUstensil(ustensil) {
    this.ustensils.push(ustensil);
  }
}

/** Test pour vérifier que la classe fonctionne : 
let oneRecipe = new Recipe("chou fleur", "à la provençale", 10);
console.log("voici le contenu de notre recette test :", oneRecipe);
*/

//création d'une classe ingrédient pour récupérer tout les ingrédients dans un tableau
class Ingredient {
  constructor(name, quantity = "", unit = "") {
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
  }
}
class Appliance {
  constructor(name) {
    this.name = name;
  }
}
class Ustensil {
  constructor(name) {
    this.name = name;
  }
}