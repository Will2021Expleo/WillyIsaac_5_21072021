//création d'une classe Recipe pour récupérer toutes les recettes
class Recipe {
  constructor(name, description, time) {
    this.name = name;
    this.description = description;
    this.time = time;
    this.ingredients = [].sort();
    this.appliance = [];
    this.ustensils = [];
    this.hasFilters = 0;
  }

  //Méthode qui permet d'ajouter des ingrédients à notre liste d'ingrédients
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
