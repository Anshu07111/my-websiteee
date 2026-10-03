/* =========================
   CHARACTER DATABASE
========================= */

const characters = {

    leon: {
        name: "LEON S. KENNEDY",
        role: "GOVERNMENT AGENT",
        image: "images/leon.webp",
        quote: "Rookie cop turned government operative.",
        first: "Resident Evil 2",
        affiliation: "U.S. Government",
        known: "Raccoon City Incident",
        bio: "Leon arrived in Raccoon City on his first day as a police officer and immediately became trapped inside the outbreak. Years later, he became a highly trained government agent involved in international bioterrorism cases.",
        games: ["RE2", "RE4", "RE6", "RE4 REMAKE"]
    },

    jill: {
        name: "JILL VALENTINE",
        role: "S.T.A.R.S. MEMBER",
        image: "images/jill.webp",
        quote: "Survivor of the mansion and Raccoon City disasters.",
        first: "Resident Evil",
        affiliation: "S.T.A.R.S.",
        known: "Nemesis Incident",
        bio: "Jill Valentine is one of the original S.T.A.R.S. members. She survived the Spencer Mansion incident and later fought to escape Raccoon City while being relentlessly pursued by Nemesis.",
        games: ["RE1", "RE3", "RE5", "RE3 REMAKE"]
    },

    chris: {
        name: "CHRIS REDFIELD",
        role: "BIOHAZARD OPERATIVE",
        image: "images/chris.webp",
        quote: "Soldier who spent decades fighting bioterrorism.",
        first: "Resident Evil",
        affiliation: "S.T.A.R.S. / BSAA",
        known: "Umbrella Investigation",
        bio: "Chris began investigating Umbrella after the Spencer Mansion incident. His career eventually evolved into a global fight against biological weapons and terrorist organizations.",
        games: ["RE1", "RE5", "RE6", "RE8"]
    },

    claire: {
        name: "CLAIRE REDFIELD",
        role: "SURVIVOR / ACTIVIST",
        image: "images/claire.webp",
        quote: "Determined survivor searching for her brother.",
        first: "Resident Evil 2",
        affiliation: "TerraSave",
        known: "Raccoon City Survivor",
        bio: "Claire entered Raccoon City looking for Chris Redfield and became one of the outbreak's survivors. She later devoted herself to helping victims of biological incidents around the world.",
        games: ["RE2", "CODE VERONICA", "RE REVELATIONS 2"]
    },

    ada: {
        name: "ADA WONG",
        role: "MYSTERIOUS OPERATIVE",
        image: "images/ada.webp",
        quote: "An enigmatic spy whose loyalties remain complicated.",
        first: "Resident Evil 2",
        affiliation: "Various Organizations",
        known: "Espionage",
        bio: "Ada operates in the shadows, frequently becoming involved in conflicts surrounding powerful biological weapons. Her missions repeatedly intersect with Leon Kennedy's.",
        games: ["RE2", "RE4", "RE6", "RE4 REMAKE"]
    },

    wesker: {
        name: "ALBERT WESKER",
        role: "UMBRELLA OPERATIVE",
        image: "images/wesker.webp",
        quote: "A central figure in the series' biological conspiracy.",
        first: "Resident Evil",
        affiliation: "Umbrella / Various",
        known: "Bioweapons Research",
        bio: "Wesker began as a S.T.A.R.S. captain while secretly working toward his own objectives. His involvement with Umbrella and experimental viruses made him one of the major antagonistic forces in the series.",
        games: ["RE1", "CODE VERONICA", "RE5"]
    },

    ethan: {
        name: "ETHAN WINTERS",
        role: "SURVIVOR",
        image: "images/ethan.webp",
        quote: "An ordinary man pulled into extraordinary horrors.",
        first: "Resident Evil 7",
        affiliation: "Unaffiliated",
        known: "Baker Incident",
        bio: "Ethan's search for his missing wife takes him to a remote Louisiana estate, where he becomes entangled in another biological nightmare. His story continues into Resident Evil Village.",
        games: ["RE7", "RE8"]
    },

    carlos: {
        name: "CARLOS OLIVEIRA",
        role: "U.B.C.S. MERCENARY",
        image: "images/carlos.webp",
        quote: "Mercenary caught inside Raccoon City's final hours.",
        first: "Resident Evil 3",
        affiliation: "U.B.C.S.",
        known: "Raccoon City Evacuation",
        bio: "Carlos is a member of the Umbrella Biohazard Countermeasure Service who encounters Jill during the Raccoon City outbreak. Despite working for Umbrella's mercenary force, he helps survivors escape the collapsing city.",
        games: ["RE3", "RE3 REMAKE"]
    }

};


/* =========================
   OPEN CHARACTER
========================= */

function openCharacter(id) {

    const character = characters[id];

    if (!character) {
        return;
    }

    document.getElementById("modalImage").src = character.image;

    document.getElementById("modalRole").textContent =
        character.role;

    document.getElementById("modalName").textContent =
        character.name;

    document.getElementById("modalQuote").textContent =
        character.quote;

    document.getElementById("modalFirst").textContent =
        character.first;

    document.getElementById("modalAffiliation").textContent =
        character.affiliation;

    document.getElementById("modalKnown").textContent =
        character.known;

    document.getElementById("modalBio").textContent =
        character.bio;


    const gamesContainer =
        document.getElementById("modalGames");

    gamesContainer.innerHTML = "";

    character.games.forEach(function(game) {

        const span = document.createElement("span");

        span.textContent = game;

        gamesContainer.appendChild(span);

    });


    document.getElementById("characterModal")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================
   CLOSE CHARACTER
========================= */

function closeCharacter() {

    document.getElementById("characterModal")
        .classList.remove("active");

    document.body.style.overflow = "";
}


/* Close when clicking outside popup */

document.getElementById("characterModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeCharacter();
        }

    });


/* Close with ESC */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeCharacter();
    }

});


/* =========================
   DRAGGABLE INVENTORY
========================= */

let draggedItem = null;

const inventoryItems =
    document.querySelectorAll(".inventory-item");

const inventorySlots =
    document.querySelectorAll(".inventory-slot");


inventoryItems.forEach(function(item) {

    item.addEventListener("dragstart", function() {

        draggedItem = this;

        setTimeout(() => {
            this.style.opacity = "0.4";
        }, 0);

    });


    item.addEventListener("dragend", function() {

        this.style.opacity = "1";

        draggedItem = null;

    });

});


inventorySlots.forEach(function(slot) {

    slot.addEventListener("dragover", function(event) {

        event.preventDefault();

        this.classList.add("drag-over");

    });


    slot.addEventListener("dragleave", function() {

        this.classList.remove("drag-over");

    });


    slot.addEventListener("drop", function(event) {

        event.preventDefault();

        this.classList.remove("drag-over");

        if (!draggedItem) {
            return;
        }


        const existingItem =
            this.querySelector(".inventory-item");


        if (existingItem && existingItem !== draggedItem) {

            const oldParent =
                draggedItem.parentElement;

            oldParent.appendChild(existingItem);

        }


        this.appendChild(draggedItem);

    });

});