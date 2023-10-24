//// Objet

// Déclaration/instanciation (simple) d'un objet :
let monContact = {
    firstname : "Pierre",
    lastName : "Dupont"
}

// Si l'attribut et la variable ont le même nom :
let firstName = "Marie";
let lastName = "Dubois";

let monAutreContact = {
    firstName,
    lastName
}

// Affichage de l'objet :
console.log(monContact);
console.log(monAutreContact);

// Affichage d'un attribut de l'objet :
console.log(monContact.firstname);
console.log(monContact["firstname"]);

// Création de classe :
class Person {
    // La déclaration des attributs est automatique via l'utilisation du constructeur

    // Constructeur
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Méthode
    direBonjour() {
        // string interpollée avec les backticks (= f-string python) :
        console.log(`Bonjour, je m'appelle ${this.firstName} ${this.lastName}`);
    }
}

// Pas de vérification du nombre de paramètres passés à une fonction :
// si pas assez de paramètres, les autres seront undefined
// si trop de paramètres, les autres seront ignorés
let unePersonne = new Person("John");

// On peut ajouter des attributs par la suite :
unePersonne.age = 45;

console.log(unePersonne);

unePersonne.direBonjour();