/**
 * Author: Jonayet Lavin 
 * CS 132 Spring 2024
 * Date: April 27th, 2024
 *
 * This is the index.js for my Metal Fusion Beyblade Rating website. It contains logic for dynamic-
 * ally handling user interactions on the website. It initializes UI components and loads Beyblade
 * data into the website.
 * 
 * JavaScript template literals citation:  
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals  
 * localStorage citation: 
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
 */ 
 
(function() {
    "use strict"; 
 
    const beyblades = [
        { id: 2, name: "Lightning L Drago", image: "imgs/lightninl_drago.png", votes: 0 },
        { id: 1, name: "Storm Pegasus", image: "imgs/pegasus.png", votes: 0 },
        { id: 3, name: "Rock Leone", image: "imgs/rock_leone.png", votes: 0 }
    ];
 
    /**
     * Initializes the UI by attaching event listeners to the select and input elements.
     * @param - None
     * @returns {void} - None
     */ 
    function init() {
        const colorSelect = document.getElementById("colorSelect");
        const user = document.getElementById("user");
 
        colorSelect.addEventListener("change", updateTheme);
        user.addEventListener("input", updateGreeting);
 
        loadVotes();
        loadBeyblades();
        attachVoteHandlers();
    }
 
    /**
     * Retrieves the stored voting data from localStorage
     * @param - None
     * @returns {void} - None
     */
    function loadVotes() {
        beyblades.forEach(beyblade => {
            // `votes-${beyblade.id}` allows votes to be stored under a unique key in localStorage
            const savedVotes = localStorage.getItem(`votes-${beyblade.id}`);
            if (savedVotes) {
                beyblade.votes = parseInt(savedVotes, 10);
            }
        });
    }
 
    /**
     * Loads Beyblades into the gallery and sets up voting.
     * @param - None
     * @returns {void} - None
     */
    function loadBeyblades() {
        const beybladesContainer = document.getElementById('beyblades');
        beyblades.forEach(beyblade => {
            // Add image and its components
            const beybladeElement = document.createElement('div');
            beybladeElement.className = 'beyblade';
 
            const image = document.createElement('img');
            image.src = beyblade.image;
            image.alt = beyblade.name;
            image.title = beyblade.name;
            image.classList.add('rounded');
 
            // Add Beyblade name header
            const name = document.createElement('h3');
            name.textContent = beyblade.name;
 
            // Add voting button and its components
            const voteButton = document.createElement('button');
            voteButton.className = 'rounded';
            voteButton.textContent = 'Vote';
            voteButton.addEventListener('click', () => voteForBeyblade(beyblade.id));
            // Rocketship captures the current value of beyblade.id in its surrounding scope
            // Which is important as event handlers only take event objects related ot the click
 
            const voteCount = document.createElement('span');
            voteCount.id = `votes-${beyblade.id}`;
            voteCount.textContent = `${beyblade.votes} votes`;
 
            beybladeElement.appendChild(image);
            beybladeElement.appendChild(name);
            beybladeElement.appendChild(voteButton);
            beybladeElement.appendChild(voteCount);
            beybladesContainer.appendChild(beybladeElement);
        });
    }

    /**
     * Attaches vote handlers to the voting buttons.
     * @param - None
     * @returns {void} - None
     */
    function attachVoteHandlers() {
        beyblades.forEach(beyblade => {
            const voteButton = document.querySelector(`button[data-id="${beyblade.id}"]`);
            if (voteButton) {
                voteButton.addEventListener('click', () => voteForBeyblade(beyblade.id));
            }
        });
    }
 
    /**
     * Handles voting for a Beyblade.
     * @param {number} beybladeId - ID of the Beyblade to vote for.
     * @returns {void} - None
     */
    function voteForBeyblade(beybladeId) {
        const beyblade = beyblades.find(b => b.id === beybladeId);
        beyblade.votes += 1;
        localStorage.setItem(`votes-${beyblade.id}`, beyblade.votes);
        const votesSpan = document.getElementById(`votes-${beyblade.id}`);
        votesSpan.textContent = `${beyblade.votes} votes`;
    }
 
    /**
     * Handles changing the website theme between default (light) and dark mode.
     * @param - None
     * @returns {void} - None
     */ 
    function updateTheme() {
        const theme = document.getElementById("colorSelect").value;
        const body = document.body;
 
        body.classList.remove("dark");
        if (theme !== "default") {
            body.classList.add(theme);
        }
    }
 
    /**
     * Updates the greeting displayed on the website as the user types their name.
     * @param - None
     * @returns {void} - None
     */
    function updateGreeting() {
        const name = document.getElementById("user").value;
        const greetingDiv = document.getElementById("greeting");
    
        while (greetingDiv.firstChild) {
            greetingDiv.removeChild(greetingDiv.firstChild);
        }
    
        if (name) {
            const greetingText = document.createTextNode(`Hello, ${name}!`);
            greetingDiv.appendChild(greetingText);
        }
    }

    init();
})();
