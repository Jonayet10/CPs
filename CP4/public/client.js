/**
  Author: Jonayet Lavin
  CS 132 Spring 2024
  Date: May 25th, 2024

  This is the client.js page for my Game Reviews website. It manages the submission of new game
  reviews on the main page, handling form validation and POST requests to the server.
 */

(function() {
    "use strict";

    const BASE_URL = "http://localhost:3000/reviews"; 

    /**
     * Initializes the event listeners for form submission.
     */
    async function init() {
        document.getElementById("review-form").addEventListener("submit", submitReview);
    }

    /**
     * Handles submission of a new review by sending a POST request. It validates form data,
     * constructs the review object, and sends it ot the server. If request is successful,
     * rests the form, otherwise handles the error.
     * @param {Event} event - The event object from the form submission.
     */
    async function submitReview(event) {
        event.preventDefault();
        const form = event.target;

        if (!validateForm(form)) {
            return;
        }

        const formData = new FormData(form);
        const newReview = {
            gameTitle: formData.get("game-title"),
            content: formData.get("content"),
            rating: formData.get("rating")
        };

        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview)
            });
            checkStatus(response);
            form.reset();
        } catch (error) {
            handleError(error);
        }
    }

    /**
     * Validates the form data before submission.
     * Checks that the game title, content, and rating fields meet specific criteria.
     * @param {HTMLFormElement} form - The form element containing the review data.
     * @return {boolean} - Returns true if the form data is valid, false otherwise.
     */
    function validateForm(form) {
        const gameTitle = form.querySelector("#game-title").value.trim();
        const content = form.querySelector("#content").value.trim();
        const rating = form.querySelector("#rating").value;

        if (!gameTitle) {
            handleError(new Error("Game Title is required."));
            return false;
        }
        if (!content) {
            handleError(new Error("Review content is required."));
            return false;
        }
        if (!rating || rating < 1 || rating > 10) {
            handleError(new Error("Rating required (must be between 1 and 10)."));
            return false;
        }
        return true;
    }

    /**
     * Helper function to return the Response data if successful, otherwise
     * returns an Error that needs to be caught.
     * @param {object} response - response with status to check for success/error.
     * @returns {object} - The Response object if successful, otherwise an Error that
     * needs to be caught.
     * (from utils.js of hw3)
     */
    function checkStatus(response) {
        if (!response.ok) {
            throw new Error(`Error in request: ${response.statusText}`);
        }
        return response;
    }

    /**
     * Displays the error message on the page.
     * @param {Error} error - The error object to process/display.
     */
    function handleError(error) {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }

    init();
})();
