//création d'une classe Recipe pour récupérer toutes les recettes
class Recipe {
  constructor(name, description, time) {
    //on met en paramètre le "nom" la "description" et le "time"
    this.name = name; //on va stocker le nom des recettes renseigné en paramètre
    this.description = description; //on va stocker la description des recettes renseigné en paramètre
    this.time = time; //on va stocker le temps des recettes renseigné en paramètre
    this.ingredients = []; //on stocke les ingrédients dans un tableau vide
    this.appliance = []; //on stocke les appliances dans un tableau vide
    this.ustensils = []; //on stocke les ustensils dans un tableau vide
    this.hasFilters = 0; // isSelected
    this.hasInput = false;
    this.toDisplay = true;
  }

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
