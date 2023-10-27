var _a, _b, _c, _d, _e, _f, _g;
import Contact from "./Contact.js";
// Variables du fichier
const firstNameInput = document.querySelector("form input#firstname");
const lastNameInput = document.querySelector("form input#lastname");
const birthdateInput = document.querySelector("form input#birthdate");
const mailInput = document.querySelector("form input#mail");
const phoneInput = document.querySelector("form input#phone");
const countDisplay = document.querySelector("span#count");
const tableBody = document.querySelector("table#contacts tbody");
let contactList = [];
// Fonction pour mettre la première lettre en majuscule
const capitalize = (text) => text.substring(0, 1).toUpperCase() + text.substring(1).toLocaleLowerCase();
// Fonction d'ajout de contact
const addContactToList = () => {
    const firstName = capitalize(firstNameInput.value);
    const lastName = capitalize(lastNameInput.value);
    const birthdate = new Date(birthdateInput.value);
    const mail = mailInput.value;
    const phone = phoneInput.value;
    if (firstName && lastName && mail && phone) {
        const newContact = new Contact(firstName, lastName, birthdate, mail, phone);
        contactList.push(newContact);
    }
};
// Fonction pour mettre à jour l'affichage
const updateView = () => {
    tableBody.textContent = "";
    countDisplay.textContent = contactList.length.toString();
    contactList.map(contact => {
        const newRow = document.createElement("tr");
        const idData = document.createElement("td");
        const firstNameData = document.createElement("td");
        const lastNameData = document.createElement("td");
        const birthdateData = document.createElement("td");
        const mailData = document.createElement("td");
        const phoneData = document.createElement("td");
        const buttonData = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", () => {
            const confirm = window.confirm(`Voulez-vous vraiment supprimer ${contact.firstName} ${contact.lastName} de la liste ?`);
            if (confirm) {
                contactList = contactList.filter(elt => elt !== contact);
                updateView();
            }
        });
        buttonData.appendChild(deleteButton);
        idData.textContent = contact.id.toString();
        firstNameData.textContent = contact.firstName;
        lastNameData.textContent = contact.lastName;
        birthdateData.textContent = contact.birthdate.toLocaleDateString();
        mailData.textContent = contact.mail;
        phoneData.textContent = contact.phone;
        newRow.appendChild(idData);
        newRow.appendChild(lastNameData);
        newRow.appendChild(firstNameData);
        newRow.appendChild(birthdateData);
        newRow.appendChild(mailData);
        newRow.appendChild(phoneData);
        newRow.appendChild(buttonData);
        return newRow;
    }).forEach(element => tableBody.appendChild(element));
};
// Fonction unique pour trier la liste par attribut
function createCompareFn(attributeName) {
    const compareFn = (a, b) => {
        const val1 = a[attributeName];
        const val2 = b[attributeName];
        if (val1 instanceof Date && val2 instanceof Date) {
            return val1.getTime() - val2.getTime();
        }
        else {
            return val1.toString().localeCompare(val2.toString());
        }
    };
    return compareFn;
}
// Main
// Ajout de contact
(_a = document.querySelector("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    addContactToList();
    updateView();
});
// Tris de la liste
(_b = document.querySelector("table button#sort-id")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    contactList.sort(createCompareFn("id"));
    updateView();
});
(_c = document.querySelector("table button#sort-lastname")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    contactList.sort(createCompareFn("lastName"));
    updateView();
});
(_d = document.querySelector("table button#sort-firstname")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    contactList.sort(createCompareFn("firstName"));
    updateView();
});
(_e = document.querySelector("table button#sort-birthdate")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    contactList.sort(createCompareFn("birthdate"));
    updateView();
});
(_f = document.querySelector("table button#sort-mail")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    contactList.sort(createCompareFn("mail"));
    updateView();
});
(_g = document.querySelector("table button#sort-phone")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    contactList.sort(createCompareFn("phone"));
    updateView();
});
