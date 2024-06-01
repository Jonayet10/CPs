/**
  Author: Jonayet Lavin
  CS 132 Spring 2024
  Date: May 25th, 2024

  This is the reviews.js page for my Game Reviews website. It handles the client-side functionality
  for the reviews page, including loading, searching, and displaying game reviews.
 */

(function() {
    "use strict";
  
    const BASE_URL = "http://localhost:3000/reviews"; 
  
    /**
     * Initializes event listeners and loads all reviews when the page is loaded.
     */
    async function init() {
        document.getElementById("search-form").addEventListener("submit", searchReviews);
        await loadReviews();
    }
  
    /**
     * Fetches all reviews from the server and displays them on the page.
     */
    async function loadReviews() {
        try {
            const response = await fetch(BASE_URL);
            checkStatus(response);
            const reviews = await response.json();
            displayReviews(reviews);
        } catch (error) {
            handleError(error);
        }
    }
  
    /**
     * Searches reviews by the game title and updates the page with search results.
     * @param {Event} event - The event object of the form submission.
     */
    async function searchReviews(event) {
        event.preventDefault();
        const form = event.target;
        const gameTitle = form.querySelector("#search-game-title").value;
    
        try {
            const response = await fetch(`${BASE_URL}/search/${encodeURIComponent(gameTitle)}`);
            checkStatus(response);
            const reviews = await response.json();
            if (reviews.length === 0) {
                handleError(new Error("No reviews found for the specified game title."));
            } else {
                clearError();
                displayReviews(reviews);
            }
        } catch (error) {
            handleError(error);
        }
    }
  
    /**
     * Displays an array of reviews on the website.
     * @param {Array} reviews - An array of review objects to display.
     */
    function displayReviews(reviews) {
        const reviewsContainer = document.getElementById("reviews");
        reviewsContainer.innerHTML = "";
        reviews.forEach(review => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
  
            const titleElement = document.createElement("h3");
            titleElement.textContent = review.gameTitle;
            reviewElement.appendChild(titleElement);
  
            const contentElement = document.createElement("p");
            contentElement.textContent = review.content;
            reviewElement.appendChild(contentElement);
  
            const ratingElement = document.createElement("p");
            ratingElement.innerHTML = `<strong>Rating:</strong> ${review.rating}`;
            reviewElement.appendChild(ratingElement);
  
            reviewsContainer.appendChild(reviewElement);
        });
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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
    }
  
    /**
     * Displays the error message on the page.
     * @param {Error} error - The error object to process/display.
     */
    function handleError(error) {
        clearReviews();
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
  
    /**
     * Clears any displayed error messages.
     */
    function clearError() {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
    }
  
    /**
     * Clears all reviews previously displayed on the page.
     */
    function clearReviews() {
        const reviewsContainer = document.getElementById("reviews");
        reviewsContainer.innerHTML = "";
    }
  
    init();
})();
  