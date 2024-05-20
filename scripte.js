//réinitialiser la formule 
function réinitialiser() {

    let form = document.getElementById("formulaire")

    form.reset()

}
// Valider que l'adresse Email se terminer par @ofppt.ma
function validerEmail() {

    let Email = document.getElementById("Email").value;
    condition = Email.split('@')
    if (condition[1] != "ofppt.ma") {

        document.getElementById("alertEmail").textContent = "L'adresse email doit se terminer par @ofppt.ma."
    }
    else {
        document.getElementById("alertEmail").textContent = ""
    }
}
//changer les groupes selon le choie de filière 
function Changer() {

    let filiere = document.getElementById("Filière").value;
    let groupe = document.getElementById("groupe");

    if (filiere === "Dev Web") {

        groupe.innerHTML = `
            <option value="groupe1">Groupe 1</option>
            <option value="groupe2">Groupe 2</option>
            <option value="groupe3">Groupe 3</option>
            <option value="groupe4">Groupe 4</option>
        `;
    }
    else if (filiere === "Dev Mobile") {
        groupe.innerHTML = `
            <option value="groupe1">Groupe 1</option>
            <option value="groupe2">Groupe 2</option>
        `;
    }

}
//capacité des clubs 
let capaciteClubIA = 2;
let capaciteClubSport = 2;
let capaciteClubHacka = 2;
let capacité = document.getElementById("Capacité")

// fonction Ajouter les lignes au tableau
function Inscrire() {
    // sélectionner les clubs.
    let Club = document.querySelectorAll('[type = "checkbox"]');
    let Clubs = [];
    for (let i = 0; i < Club.length; i++) {
        if (Club[i].checked) {
            Clubs.push(Club[i].value)
        };
    }

    // condition de selectionner au maximum deux club
    if (Clubs.length > 2) {
        document.getElementById("alertFiliere").textContent = "sélectionnez au maximum deux clubs."
    }
    else {
        document.getElementById("alertFiliere").textContent = ""
    }
    // sélectionner le Genre
    let Genre = document.getElementsByName("Genre");
    let selectionner = false;
    let genreSelectionne = ""
    for (i = 0; i < Genre.length; i++) {
        if (Genre[i].checked) {
            genreSelectionne = Genre[i].value;
            selectionner = true; break
        }
    }



    //tous les champs sont obligatoire 

    let Nom = document.getElementById("Nom").value;
    let Prenom = document.getElementById("Prénom").value;
    let Email = document.getElementById("Email").value;

    let filiere = document.getElementById("Filière").value

    if (Nom === "" || Prenom === "" || !selectionner || filiere === "Choisie Filière" || Clubs.length > 2 || Clubs.length === 0) {

        document.getElementById("alertForm").textContent = "Veuillez remplire tous les champs"
    }
    else {
        if ((capaciteClubIA <= 0 && Clubs.includes("Club IA")) ||
            (capaciteClubSport <= 0 && Clubs.includes("Club Sport")) ||
            (capaciteClubHacka <= 0 && Clubs.includes("Club Hackathon"))) {
            document.getElementById("alertForm").textContent = "La capacité d'un club est saturée.";
        }
        else {
            //Ajouter des nouvelles lignes dans un tableau contenant la liste des inscrits.
            let tableau = document.getElementsByTagName('table')[0];
            let ligne = tableau.insertRow(tableau.length)

            let cellule0 = ligne.insertCell(0);
            let cellule1 = ligne.insertCell(1);
            let cellule2 = ligne.insertCell(2);
            let cellule3 = ligne.insertCell(3);
            let cellule4 = ligne.insertCell(4);
            let cellule5 = ligne.insertCell(5);
            let cellule6 = ligne.insertCell(6);

            cellule0.innerHTML = Nom;
            cellule1.innerHTML = Prenom;
            cellule2.innerHTML = Email;
            cellule3.innerHTML = genreSelectionne;
            cellule4.innerHTML = filiere;
            cellule5.innerHTML = groupe.value;
            cellule6.innerHTML = Clubs.join(",");

            document.getElementById("alertForm").textContent = ""
            //les nombres des inscrits : 
            let nbrTotale = document.getElementById("nbretotale");
            nbrTotale.innerHTML = tableau.rows.length - 1
            // repartition par Genre :
            let nbreFemme = document.getElementById("nbreFemme");
            let nbreHomme = document.getElementById("nbreHomme");
            let nbreF = 0;
            let nbreH = 0;
            for (i = 0; i < tableau.rows.length; i++) {
                let cellule3 = tableau.rows[i].cells[3].textContent
                if (cellule3 === "Femme") {
                    nbreF++
                }
                else if (cellule3 === "Homme") {
                    nbreH++
                }
            }
            nbreFemme.innerHTML = nbreF;
            nbreHomme.innerHTML = nbreH;
            // Repartition par filière : 
            let nbreWeb = document.getElementById("nbreWeb");
            let nbreMobile = document.getElementById("nbreMobile");
            let nbreW = 0;
            let nbreM = 0;

            for (i = 0; i < tableau.rows.length; i++) {
                let cellule4 = tableau.rows[i].cells[4].textContent
                if (cellule4 === "Dev Web") {
                    nbreW++;
                }
                if (cellule4 === "Dev Mobile") {
                    nbreM++;
                }
                nbreWeb.innerHTML = nbreW;
                nbreMobile.innerHTML = nbreM;

            }
            //decrementer la capacité des clubs
            let cell1 = cellule6.textContent.split(",")[0];
            let cell2 = cellule6.textContent.split(",")[1];
            let messgCapacité = document.getElementById("Capacité");
            //capacité club IA

            if (cell1 === "Club IA") {
                capaciteClubIA--;

            }
            //capacité club Sport

            if ((cell1 === "Club Sport" || cell2 === "Club Sport")) {
                capaciteClubSport--;
            }
            //capacité club Hackathon


            if ((cell1 === "Club Hackathon" || cell2 === "Club Hackathon") & capaciteClubHacka <= 0) {
                capaciteClubHacka--;
            }
        }
    }

}

