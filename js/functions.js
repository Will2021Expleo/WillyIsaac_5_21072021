let allRecipes = []; //pour stocker toutes les recipes
let allRecipesObjects = [];
let allFilters = [];
let totalFiltersClicked = 0;

//fonction permettant de gérer l'ensemble des recettes
function createRecipesObject() {
  //on boucle sur l'ensemble des recettes du fichier recipes.js
  recipes.forEach(function (oneRecipe) {
    //console.log(oneRecipe); permet d'afficher le contenu de chaque recettes

    //on crée un objet recipe
    let oneNewRecipeObject = new Recipe(
      oneRecipe.name,
      oneRecipe.description,
      oneRecipe.time
    );

    //permet de récupérer et d'afficher les ingrédients
    oneRecipe.ingredients.forEach(function (oneIngredient) {
      let oneIngredientObject = new Ingredient(
        oneIngredient.ingredient,
        oneIngredient.quantity,
        oneIngredient.unit
      );
      console.log(oneRecipe.ingredients);

      oneNewRecipeObject.addIngredient(oneIngredientObject);
    });

    //permet de récupérer et d'afficher les appareils
    let oneApplianceObject = new Appliance(oneRecipe.appliance);
    oneNewRecipeObject.addAppliance(oneApplianceObject);

    //permet de récupérer et d'afficher les ingrédients
    oneRecipe.ustensils.forEach(function (oneUstensil) {
      let oneUstensilObject = new Ustensil(oneUstensil);
      oneNewRecipeObject.addUstensil(oneUstensilObject);
    });

    allRecipes.push(oneNewRecipeObject); // permet de stocker toutes les recettes
  });
  //return allRecipes;
  // allRecipesObjects = allRecipes; //retourne le résultat de la fonction et permet de l'afficher dans le console.log en dehors de la fonction
  allRecipesObjects = allRecipes;
}

//fonction permettant de gérer les filtres sur les recettes
function getFilters() {
  let allIngredientsFilters = []; //tableau pour récupérer l'ensemble des ingredients
  let allAppliancesFilters = [];
  let allUstensilsFilters = [];

  allRecipes.forEach(function (oneRecipe) {
    oneRecipe.ingredients.forEach(function (oneIngredient) {
      if (allIngredientsFilters.includes(oneIngredient.name) === false) {
        allIngredientsFilters.push(oneIngredient.name);
      }
    });
    oneRecipe.appliance.forEach(function (oneAppliance) {
      if (allAppliancesFilters.includes(oneAppliance.name) === false) {
        allAppliancesFilters.push(oneAppliance.name);
      }
    });
    oneRecipe.ustensils.forEach(function (oneUstensil) {
      if (allUstensilsFilters.includes(oneUstensil.name) === false) {
        allUstensilsFilters.push(oneUstensil.name);
      }
    });
  });
  //console.log(allIngredientsFilters, allAppliancesFilters, allUstensilsFilters);

  allFilters = [
    allIngredientsFilters, // <== containerName
    allAppliancesFilters, // <== containerName
    allUstensilsFilters, // <== containerName
  ];
  displayFilters();
}

let activeFilters = [];
//fonction pour afficher les filtre des ingredients, appliances, ustensils
function displayFilters() {
  console.log("ActiveFilters :", activeFilters);
  //permet de lier allFilters[0], allFilters[1], allFilters[2] à leur contenus respectifs
  let arrayConfig = ["allIngredients", "allAppliances", "allUstensils"];

  arrayConfig.forEach(function (containerName, index) {
    //on récupère le conteneur du filtre courant
    let container = document.getElementById(containerName);
    //on vide le conteneur de ses anciens filtres
    container.textContent = "";
    //on ajoute chaque valeur au filtre
    allFilters[index].forEach(function (oneElement) {
      //boucle sur l'ensemble des filtres
      let elementToAdd = document.createElement("div"); //on crée la <div> pour ajouter tout les éléments : ingrédients, appliances et ustensils.

      elementToAdd.textContent = oneElement;
      if (activeFilters.includes(oneElement) === false) {
        elementToAdd.classList.add("pointer");
        //on vérifie si c'est un élément sur lequel on a déjà cliqué
        elementToAdd.addEventListener("click", function () {
          //si ce n'est pas le cas on écoute le clic
          activeFilters.push(oneElement); //l'élément sur lequel j'ai déjà cliqué je l'ajoute à la liste
          addFilter(oneElement, index); //j'ajoute le filtre
        });
        //console.log("je clique sur un élément");
        //console.log(oneElement);
      } else {
        elementToAdd.classList.add("line-through");
      }
      //pour exécuter une action sur les filtres
      container.appendChild(elementToAdd);
    });
  });
}

//
let ingredientsHidden = true;
let appliancesHidden = true;
let ustensilsHidden = true;
//fonction permettant d'afficher ou de masquer la liste de chaque menu
function createEventsForFilters() {
  document
    .getElementById("displayIngredients")
    .addEventListener("click", function () {
      //console.log(displayIngredients);
      ingredientsHidden = !ingredientsHidden;
      //console.log("voici la valeur de ingredientsHidden: ", ingredientsHidden);
      document.getElementById("allIngredients").hidden = ingredientsHidden;
      /**
       * on peut écrire aussi:
       * if (ingredientsHidden ===true){
       * document.getElementById("allIngredients").hidden = false
       * ingredientsHidden = false
       * }else{
       * document.getElementById("allIngredients").hidden = true
       * ingredientsHidden = false
       * }
       */
    });

  document
    .getElementById("displayAppliances")
    .addEventListener("click", function () {
      //console.log(displayAppliances);
      appliancesHidden = !appliancesHidden;
      //console.log("voici la valeur de appliancesHidden: ", appliancesHidden);
      document.getElementById("allAppliances").hidden = appliancesHidden;
    });

  document
    .getElementById("displayUstensils")
    .addEventListener("click", function () {
      //console.log(displayUstensils);
      ustensilsHidden = !ustensilsHidden;
      //console.log("voici la valeur de ustensilsHidden: ", ustensilsHidden);
      document.getElementById("allUstensils").hidden = ustensilsHidden;
    });
}

function addFilter(filteredElement, typeOfElement) {
  totalFiltersClicked += 1; //on icrémente le nombre de filtre cliqué de 1 à chaque fois

  let type = ["ingredients", "appliances", "ustensils"];

  addFilterBox(filteredElement, typeOfElement);

  console.log(
    "L'élément cliqué:",
    filteredElement,
    "et c'est du type:",
    type[typeOfElement]
  );
  //on affiche l'élément sur lequel on a cliqué dans ingrédient, appareil et ustensile

  allRecipesObjects.forEach(function (oneRecipe) {
    if (type[typeOfElement] === "ingredients") {
      oneRecipe.ingredients.forEach(function (oneIngredient) {
        if (filteredElement === oneIngredient.name) {
          oneRecipe.hasFilters += 1;
          // la même chose que : oneRecipe.hasFilters = oneRecipe.hasFilter + 1
          //console.log("La recette", oneRecipe.name," contient", oneIngredient.name);
        }
      });
    }

    if (type[typeOfElement] === "appliances") {
      oneRecipe.appliance.forEach(function (oneAppliance) {
        if (filteredElement === oneAppliance.name) {
          oneRecipe.hasFilters += 1;
          // la même chose que : oneRecipe.hasFilters = oneRecipe.hasFilter + 1
          /**console.log(
            "La recette",
            oneRecipe.name,
            " contient",
            oneAppliance.name
          );*/
        }
      });
    }

    if (type[typeOfElement] === "ustensils") {
      oneRecipe.ustensils.forEach(function (oneUstensil) {
        if (filteredElement === oneUstensil.name) {
          oneRecipe.hasFilters += 1;
          // la même chose que : oneRecipe.hasFilters = oneRecipe.hasFilter + 1
          /**console.log(
            "La recette",
            oneRecipe.name,
            " contient",
            oneUstensil.name
          );*/
        }
      });
    }
  });
  //console.log("Nombre de filtres cliqués:", totalFiltersClicked);
  getValidRecipes();
}

//fonction permettant de supprimer les filtres

function removeFilter(filteredElement, typeOfElement) {
  totalFiltersClicked -= 1;
  //console.log("c'est le nom :", name, "de type", type);

  let type = ["ingredients", "appliances", "ustensils"];

  allRecipes.forEach(function (oneRecipe) {
    if (type[typeOfElement] === "ingredients") {
      oneRecipe.ingredients.forEach(function (oneIngredient) {
        if (filteredElement === oneIngredient.name) {
          oneRecipe.hasFilters -= 1;
        }
      });
    }
    if (type[typeOfElement] === "appliances") {
      oneRecipe.appliance.forEach(function (oneAppliance) {
        if (filteredElement === oneAppliance.name) {
          oneRecipe.hasFilters -= 1;
        }
      });
    }
    if (type[typeOfElement] === "ustensils") {
      oneRecipe.ustensils.forEach(function (oneUstensil) {
        if (filteredElement === oneUstensil.name) {
          oneRecipe.hasFilters -= 1;
        }
      });
    }
  });
  getValidRecipes();
}

// fonction permettant d'afficher les recettes valides

function getValidRecipes(input = false) {
  let validRecipes = [];
  allRecipesObjects.forEach(function (oneRecipe) {
    if (oneRecipe.hasFilters === totalFiltersClicked) {
      if (input !== false) {
        if (oneRecipe.name.includes(input)) {
          validRecipes.push(oneRecipe);
        }
      } else {
        validRecipes.push(oneRecipe);
      }
      // console.log("La recette", oneRecipe.name, " est valide");
    }
  });

  allRecipes = validRecipes;
  displayRecipes();
  getFilters();
}

function displayRecipes() {
  let container = document.getElementById("cardsMenu");
  container.innerText = "";

  allRecipes.forEach(function (oneRecipe) {
    let template = `<div class="card">
    <img class="header-card" src="img/image.jfif"/>
      <!--image-->
      <div class="footer-card" id="footerCard">
        <div class="title-duration">
          <div class="name">${oneRecipe.name}</div>
          <div class="duration">
            <img class="clock" src="img/clock.jpg" /> ${oneRecipe.time} min
          </div>
        </div>
        <div class="ingredient-list">

          <ul class="content">

          ${oneRecipe.ingredients
            .map(
              (oneIngredient) =>
                `<li class="ingredient"><span>${oneIngredient.name} : </span> ${oneIngredient.quantity} ${oneIngredient.unit}</li>`
            )
            .join("")}

          </ul>
          <ul class="recette">
            <p>
              ${oneRecipe.description}
            </p>
          </ul>
        </div>
      </div>
      </div>`;

    container.innerHTML += template;
  });
}

//function pour gérer les tags sélectionnés dans les différents éléments
function addFilterBox(name, type) {
  let colors = ["#3282f7", "#68D9A4", "#ED6454"];

  let container = document.getElementById("activeFilters");
  let template = `<div class="allTagsBox" style="background:${colors[type]}" id="box-${name}">
        <div class="tagsBox">
          <div id="${name}">
            ${name}
          </div>
          <div class="icon removeElement" id="remove-${name}" style="cursor:pointer">
            <i class="fa fa-times-circle-o" aria-hidden="true"  ></i>
          </div>
        </div>
      </div>`;
  container.insertAdjacentHTML("beforeend", template);
  //on cible l'icone de fermeture des tags
  let cross = document.getElementById("remove-" + name);
  console.log("on crée l'event");
  cross.addEventListener("click", function () {
    let box = document.getElementById("box-" + name);
    box.remove();
    activeFilters.forEach(function (oneFilter, index) {
      if (oneFilter === name) {
        activeFilters.splice(index, 1);
      }
    });

    removeFilter(name, type);
    //console.log("Vous souhaitez retirer le filtre :", name); //quand je choisis 2 éléments (ex: 1 ingredient et 1 appliance) il me demande seulement si je veux retirer le 1er élément cliqué
  });
}

function getInputEvent() {
  document.getElementById("search").addEventListener("input", function () {
    //console.log(this.value); //pour tester l'input
    getValidRecipes(this.value);
  });
}
