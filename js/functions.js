/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let allRecipes = []; //pour stocker toutes les recettes (fonction utilisée : createRecipesObject)
let allRecipesObjects = [];
let allFilters = [];

let totalFiltersClicked = 0;

/**************************************************************** */
/*Gestion des ingredients
/**************************************************************** */
let ingredientContainer = document.getElementById("allIngredients");
let boxIngredientExtended = document.getElementById("displayIngredients");
let chevronDownIngredient = document.getElementById("chevronDownIngredient");
let chevronUpIngredient = document.getElementById("chevronUpIngredient");
chevronDownIngredient.addEventListener("click", downIngredient);
chevronUpIngredient.addEventListener("click", upIngredient);

/**************************************************************** */
/*Gestion des appareils
/**************************************************************** */
let applianceContainer = document.getElementById("allAppliances");
let boxApplianceExtended = document.getElementById("displayAppliances");
let chevronDownAppliance = document.getElementById("chevronDownAppliance");
let chevronUpAppliance = document.getElementById("chevronUpAppliance");
chevronDownAppliance.addEventListener("click", downAppliance);
chevronUpAppliance.addEventListener("click", upAppliance);

/**************************************************************** */
/*Gestion des ustensiles
/**************************************************************** */
let ustensilsContainer = document.getElementById("allUstensils");
let boxUstensilsExtended = document.getElementById("displayUstensils");
let chevronDownUstensils = document.getElementById("chevronDownUstensils");
let chevronUpUstensils = document.getElementById("chevronUpUstensils");
chevronDownUstensils.addEventListener("click", downUstensil);
chevronUpUstensils.addEventListener("click", upUstensil);

//------------------------------------------------------------------
// début fonction permettant de gérer l'ensemble des recettes
//------------------------------------------------------------------
function createRecipesObject() {
  //on crée la fonction "createRecipesObject" : création des recettes sous forme d'objet
  //on boucle sur l'ensemble des recettes du fichier recipes.js
  recipes.forEach(function (oneRecipe) {
    //console.log(oneRecipe); permet d'afficher les recettes une par une
    //recipes : nom de la variable déclaré dans le fichiers des recettes

    //on crée un objet permettant de récupérer le nom, la description et la durée de chaque recette
    let oneNewRecipeObject = new Recipe( //variable qui va être remplie à chaque boucle de recette
      oneRecipe.name, //pour récupérer le nom de la recette
      oneRecipe.description, //pour récupérer la description de la recette
      oneRecipe.time //pour récupérer le temps de la recette
    );

    //on boucle sur chaque ingredients de oneRecipe
    oneRecipe.ingredients.forEach(function (oneIngredient) {
      //permet de récupérer et d'afficher le nom des ingrédients, la quantité et l'unité pour chaque recette
      let oneIngredientObject = new Ingredient(
        oneIngredient.ingredient,
        oneIngredient.quantity,
        oneIngredient.unit
      );
      //console.log(oneRecipe.ingredients); //permet d'afficher tout les ingredients sous forme de tableau
      oneNewRecipeObject.addIngredient(oneIngredientObject);
      //console.log(allIngredients);
    });

    //permet de récupérer et d'ajouter les appareils à la recette
    let oneApplianceObject = new Appliance(oneRecipe.appliance);
    oneNewRecipeObject.addAppliance(oneApplianceObject);

    //permet de récupérer et d'ajouter les ustensiles à la recette
    oneRecipe.ustensils.forEach(function (oneUstensil) {
      let oneUstensilObject = new Ustensil(oneUstensil);
      oneNewRecipeObject.addUstensil(oneUstensilObject);
    });

    allRecipesObjects.push(oneNewRecipeObject); // permet de stocker toutes les recettes
  });
}

//------------------------------------------------------------------
//fonction permettant de gérer les filtres sur les recettes
//------------------------------------------------------------------
function getFilters() {
  //document.querySelectorAll(".card").forEach((showCards) => showCards.remove());
  let allIngredientsFilters = []; //tableau pour récupérer l'ensemble des ingredients
  let allAppliancesFilters = [];
  let allUstensilsFilters = [];

  allRecipesObjects.forEach(function (oneRecipe) {
    if (oneRecipe.toDisplay === true) {
      oneRecipe.ingredients.forEach(function (oneIngredient) {
        if (allIngredientsFilters.includes(oneIngredient.name) === false) {
          allIngredientsFilters.push(oneIngredient.name);
          allIngredientsFilters.sort(); //permet de trier par ordre alphabétique la liste des ingredients
        }
      });
      oneRecipe.appliance.forEach(function (oneAppliance) {
        if (allAppliancesFilters.includes(oneAppliance.name) === false) {
          allAppliancesFilters.push(oneAppliance.name);
          allAppliancesFilters.sort(); //permet de trier par ordre alphabétique la liste des appliance
        }
      });
      oneRecipe.ustensils.forEach(function (oneUstensil) {
        if (allUstensilsFilters.includes(oneUstensil.name) === false) {
          allUstensilsFilters.push(oneUstensil.name);
          allUstensilsFilters.sort(); //permet de trier par ordre alphabétique la liste des ustensiles
        }
      });
    }
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
function displayFilters(allFiltersCopy = []) {
  //console.log("ActiveFilters :", activeFilters);
  //permet de lier allFilters[0], allFilters[1], allFilters[2] à leur contenus respectifs
  let arrayConfig = ["allIngredients", "allAppliances", "allUstensils"];
  let filterTabActive = allFilters;
  if (allFiltersCopy.length > 0) {
    filterTabActive = allFiltersCopy;
  }
  arrayConfig.forEach(function (containerName, index) {
    //on récupère le conteneur du filtre courant
    let container = document.getElementById(containerName);
    //on vide le conteneur de ses anciens filtres
    container.textContent = "";
    //boucle sur l'ensemble des filtres
    filterTabActive[index].forEach(function (oneElement) {
      //on crée la <div> pour ajouter tout les éléments : ingrédients, appliances et ustensils.
      let elementToAdd = document.createElement("p");

      elementToAdd.textContent = oneElement;
      if (activeFilters.includes(oneElement) === false) {
        elementToAdd.classList.add("element");
        //on vérifie si c'est un élément sur lequel on a déjà cliqué
        elementToAdd.addEventListener("click", function () {
          //si ce n'est pas le cas on écoute le clic
          activeFilters.push(oneElement); //l'élément sur lequel j'ai déjà cliqué je l'ajoute à la liste
          addFilter(oneElement, index); //j'ajoute le filtre
        });
        //console.log("je clique sur un élément");
        //console.log(oneElement);
      } else {
        elementToAdd.classList.add("element-hide");
      }
      //pour exécuter une action sur les filtres
      container.appendChild(elementToAdd);
    });
  });
}

//---------------------------------------------------
//fonction permettant d'ajouter les filtres
//---------------------------------------------------
function addFilter(filteredElement, typeOfElement) {
  totalFiltersClicked += 1;
  //on incrémente le nombre total de filtre cliqué de 1 à chaque fois
  let type = ["ingredients", "appliances", "ustensils"];
  let mainSearch = document.getElementById("search").value;

  //on boucle sur chaque element et en fonction du type d'élément on incrément le filtre de 1
  allRecipesObjects.forEach(function (oneRecipe) {
    if (type[typeOfElement] === "ingredients") {
      oneRecipe.ingredients.forEach(function (oneIngredient) {
        if (filteredElement === oneIngredient.name) {
          oneRecipe.hasFilters += 1;
        }
      });
    }
    if (type[typeOfElement] === "appliances") {
      oneRecipe.appliance.forEach(function (oneAppliance) {
        if (filteredElement === oneAppliance.name) {
          oneRecipe.hasFilters += 1;
        }
      });
    }
    if (type[typeOfElement] === "ustensils") {
      oneRecipe.ustensils.forEach(function (oneUstensil) {
        if (filteredElement === oneUstensil.name) {
          oneRecipe.hasFilters += 1;
        }
      });
    }
  });
  //conditions pour affiner la recherche soit par tag soit par saisie
  addTagsFilter(filteredElement, typeOfElement);
  //getValidRecipes();
  if (mainSearch === "") {
    getValidRecipes();
  } else {
    mainSearch = mainSearch.toUpperCase();
    getValidRecipes(mainSearch);
  }
}

//---------------------------------------------------
//fonction permettant de supprimer les filtres
//---------------------------------------------------
function removeFilter(filteredElement, typeOfElement) {
  totalFiltersClicked -= 1;
  //console.log("c'est le nom :", name, "de type", type);
  let mainSearch = document.getElementById("search").value;
  let type = ["ingredients", "appliances", "ustensils"];

  allRecipesObjects.forEach(function (oneRecipe) {
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
  //console.log("Nombre de filtres cliqués:", totalFiltersClicked);
  if (mainSearch === "") {
    getValidRecipes();
  } else {
    mainSearch = mainSearch.toUpperCase();
    getValidRecipes(mainSearch);
  }
  //getValidRecipes();
}
//-----------------------------------------------------------------------
// fonction permettant d'afficher les recettes valides à partir de la barre de recherche principale
//-----------------------------------------------------------------------
function getValidRecipes(input = false) {
  let counter = 0;
  if (input !== false) {
    input = input.toUpperCase();
  }
  for (let i = 0; i < allRecipesObjects.length; i++) {
    counter = counter + 1;
    let oneRecipe = allRecipesObjects[i];
    if (input !== false) {
      oneRecipe.hasInput = false; //par défaut l'input est à false et s'il est renseigné il passe à true
      //on recherche dans le nom des recettes
      let recipeName = oneRecipe.name.toUpperCase();
      let descriptionUpper = oneRecipe.description.toUpperCase();
      if (recipeName.includes(input)) {
        //on récupère le "name" renseigner en paramètre dans les classes
        oneRecipe.hasInput = true;
        // validRecipes.push(oneRecipe);
      }
      //on recherche dans les descriptions des recettes
      else if (descriptionUpper.includes(input)) {
        oneRecipe.hasInput = true;
        // validRecipes.push(oneRecipe);
      } else if (
        oneRecipe.ingredients
          .map((oneIngredient) => oneIngredient.name.toUpperCase())
          .join()
          .includes(input)
      ) {
        oneRecipe.hasInput = true;
        // validRecipes.push(oneRecipe);
      }
    }
  }
  let totalRecipes = 0;
  for (let i = 0; i < allRecipesObjects.length; i++) {
    counter = counter + 1;
    let oneRecipe = allRecipesObjects[i];
    oneRecipe.toDisplay = false; //par défaut
    if (
      oneRecipe.hasFilters === totalFiltersClicked &&
      (input === false || (input !== false && oneRecipe.hasInput === true))
      // si on a le bon nombre de filtre ET l'input est faux OU (l'input est vrai et que la recette à un input true )
    ) {
      //on affiche la recette
      oneRecipe.toDisplay = true;
      totalRecipes += 1;
    }
  }
  console.log("Il y a eu ", counter, "tours de boucle");

  // /**------------------------------------------------------------------
  //   //affichage message en fonction des résultats
  //   --------------------------------------------------------------------*/
  let colorsMessageBox = [
    //variable pour gérer la couleur le message de l'input
    "#7FFF00", //validRecipes(vert)
    "#ff3300", //noValidRecipes
  ];

  if (input.length < 3 && activeFilters.length === 0) {
    //   //si le nb de caractères rentrés est < 3 je n'affiche rien
    document.getElementById("messageBox").style.display = "none";
  } else {
    //   //sinon le nb de d'éléments trouvés dans le tableau est différent de 0
    if (totalRecipes !== 0) {
      document.getElementById("showMessage").innerText =
        totalRecipes + " recette(s) correspond(ent) à votre recherche";
      document.getElementById("messageBox").style.display = "block";
      document.getElementById("messageBox").style.background =
        colorsMessageBox[0];
    } else if (totalRecipes === 0) {
      document.getElementById("showMessage").innerText =
        "Aucune recette ne correspond à votre critère... vous pouvez chercher: " +
        "« tarte aux pommes », " +
        "«poisson», " +
        "etc.";
      document.getElementById("messageBox").style.display = "block";
      document.getElementById("messageBox").style.background =
        colorsMessageBox[1];
    }
  }
  // /**------------------------------------------------------------------
  //   //fin affichage message en fonction des résultats
  //   --------------------------------------------------------------------*/
  displayRecipes();
  getFilters();
}

/**------------------------------------------------------------------ 
/**------------------------------------------------------------------ 
    //fermeture de la boite de message 
    --------------------------------------------------------------------*/
let closeMessageBox = document.getElementById("close__messageBox");
closeMessageBox.addEventListener("click", () => {
  document.getElementById("messageBox").style.display = "none";
});

//--------------------------------------------------------------------------
//Affichage des cartes sur la page html
//--------------------------------------------------------------------------
function displayRecipes() {
  let container = document.getElementById("cardsMenu");
  container.innerText = "";

  allRecipesObjects.forEach(function (oneRecipe) {
    if (oneRecipe.toDisplay === true) {
      let template = `<div class="card">
    <img class="header-card" src="img/image.jfif"/>
      <!--image-->
      <div class="footer-card" id="footerCard">
        <div class="title-duration">
          <div class="name">${oneRecipe.name}</div>
          <div class="duration">
            <img class="clock" src="img/clock.svg" /> ${oneRecipe.time} min
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
      //container.insertAdjacentHTML("beforeend", template);
    }
  });
}

//----------------------------------------------------------------
//function pour gérer les tags sélectionnés dans les différents éléments
//-----------------------------------------------------------------------------
function addTagsFilter(name, type) {
  let colors = ["#3282f7", "#68D9A4", "#ED6454"];

  let container = document.getElementById("box-select");
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
  // console.log("on crée l'event");
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

/**----------------------------------------------------------------------------
downIngredient pour afficher la liste et upIngredient pour masquer la liste
-----------------------------------------------------------------------------*/
function downIngredient() {
  ingredientContainer.classList.remove("hidden"); //on enlève la class "hidden"
  boxIngredientExtended.classList.add("box-extend"); //pour agrandir le box des ingredients
  chevronUpIngredient.classList.remove("hidden"); //on enlève la class "hidden"
  chevronDownIngredient.classList.add("hidden"); //on affiche le chevron Up
  document.getElementsByName("ingredients")[0].placeholder =
    "Rechercher un ingrédient"; //on écrit dans le input : "rechercher un ingrédient"
  upAppliance();
  upUstensil();
}

function upIngredient() {
  ingredientContainer.classList.add("hidden");
  boxIngredientExtended.classList.remove("box-extend");
  chevronUpIngredient.classList.add("hidden");
  chevronDownIngredient.classList.remove("hidden");
  document.getElementsByName("ingredients")[0].placeholder = "Ingredients";
  allIngredientsList = [];
}
/**----------------------------------------------------------------------------
downIngredient pour afficher la liste et upIngredient pour masquer la liste
-----------------------------------------------------------------------------*/
function downAppliance() {
  applianceContainer.classList.remove("hidden");
  boxApplianceExtended.classList.add("box-extend");
  chevronUpAppliance.classList.remove("hidden");
  chevronDownAppliance.classList.add("hidden");
  document.getElementsByName("appliances")[0].placeholder =
    "Rechercher un appareil";
  upIngredient();
  upUstensil();
}

function upAppliance() {
  applianceContainer.classList.add("hidden");
  boxApplianceExtended.classList.remove("box-extend");
  chevronUpAppliance.classList.add("hidden");
  chevronDownAppliance.classList.remove("hidden");
  document.getElementsByName("appliances")[0].placeholder = "Appareils";
  allAppliancesList = [];
}
/**----------------------------------------------------------------------------
downIngredient pour afficher la liste et upIngredient pour masquer la liste
-----------------------------------------------------------------------------*/
function downUstensil() {
  ustensilsContainer.classList.remove("hidden");
  boxUstensilsExtended.classList.add("box-extend");
  chevronUpUstensils.classList.remove("hidden");
  chevronDownUstensils.classList.add("hidden");
  document.getElementsByName("ustensils")[0].placeholder =
    "Rechercher un ustensile";
  upIngredient();
  upAppliance();
}
//------------------------------------------------------------
//Action sur le chevron Up pour fermer la liste des appareils
//------------------------------------------------------------
function upUstensil() {
  ustensilsContainer.classList.add("hidden");
  boxUstensilsExtended.classList.remove("box-extend");
  chevronUpUstensils.classList.add("hidden");
  chevronDownUstensils.classList.remove("hidden");
  document.getElementsByName("ustensils")[0].placeholder = "Ustensiles";
  allUstensilsList = [];
}

//------------------------------------------------------------
//Recherche dans la barre de recherche principale
//------------------------------------------------------------
function getInputEvent() {
  document.getElementById("search").addEventListener("keyup", function () {
    //console.log(this.value); //pour tester l'input
    getValidRecipes(this.value); //je recherche dans l'ensemble des recettes
  });
}

function getAllElements(input, index) {
  //allelements = ingredients, appareils, ustensiles
  let arrayAllElements = [];
  input = input.toUpperCase(); //pour gérér la saisie en majuscules
  allFilters[index].forEach(function (oneElement) {
    let elementUpper = oneElement.toUpperCase();
    if (elementUpper.includes(input)) {
      arrayAllElements.push(oneElement);
    }
  });
  if (input === "") {
    arrayAllElements = allFilters[index];
  }
  allFiltersCopy = allFilters;
  allFiltersCopy[index] = arrayAllElements;
  displayFilters(allFiltersCopy);
}

//------------------------------------------------------------
//Recherche dans la barre de recherche ingredients
//------------------------------------------------------------
function getInputIngredientsEvent() {
  document
    .getElementById("ingredient-search")
    .addEventListener("keyup", function () {
      getFilters();
      getAllElements(this.value, 0);
    });
}
//------------------------------------------------------------
//Recherche dans la barre de recherche appareils
//------------------------------------------------------------
function getInputAppliancesEvent() {
  document
    .getElementById("appliance-search") //on cible l'élement qu'on veut écouter
    .addEventListener("keyup", function () {
      //on veut une réaction quand une touche est activée
      getFilters();
      getAllElements(this.value, 1);
    });
}
//------------------------------------------------------------
//Recherche dans la barre de recherche ustensiles
//------------------------------------------------------------
function getInputUstensilsEvent() {
  document
    .getElementById("ustensil-search")
    .addEventListener("keyup", function () {
      getFilters();
      getAllElements(this.value, 2);
    });
}
