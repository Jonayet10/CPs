# Game Reviews API Documentation
**Author:** Jonayet Lavin
**Last Updated:** 05/31/24

**Public Link (with example client):** [Game Reviews API](http://localhost:3000)

The Game Reviews API provides functionality to retrieve, search, and post game reviews. Clients can retrieve information for game reviews that have been submitted so far, which includes a rating and description of people's impression of the game. 

Summary of endpoints:
* GET /reviews
* GET /reviews/search
* GET /status
* POST /reviews

In the current release of this API, all error responses are returned as JSON. Errors with a 500 status code indicate a server-side problem and come with a standard error message. Errors in the 400 levels signify a client-side mistake (invalid request by client), and are thorougly documented for endpoints that accept parameters.

Contact the author at jlavin@caltech.edu for any bug reports or feature requests!

## *GET /reviews*
**Request Type:** GET

**Returned Data Format**: JSON

**Description:**
Returns a JSON collection of all game reviews available on the Game Reviews website.

**Supported Parameters**
None

**Example Request:** `/reviews`

**Example Response:**
```json
[
  {
    "gameTitle": "The Legend of Zelda: Breath of the Wild",
    "content": "Amazing open-world game with stunning visuals and gameplay.",
    "rating": 10
  },
  {
    "gameTitle": "Cyberpunk 2077",
    "content": "Has potential but currently full of bugs.",
    "rating": 3
  }
]
```

**Error Handling:**
* 500: Server-side issue while fetching reviews.

**Example Request:** `/reviews`

**Example Response:**
```json
{
  "error": "Failed to load reviews"
}
```

## *GET /reviews/search*
**Request Type:** GET

**Returned Data Format**: JSON or Plain Text

**Description:**
Searches reviews by game title and returns results in JSON or plain text format.

**Supported Parameters**
* `gameTitle` (required) - The title of the game to search reviews for.
* `format` (optional) - The format of the response, either 'json' or 'text'.

**Example Request:** `/reviews/search/Zelda?format=json`

**Example Response:**
```json
[
  {
    "gameTitle": "The Legend of Zelda: Breath of the Wild",
    "content": "Amazing open-world game with stunning visuals and gameplay.",
    "rating": 10
  }
]
```

**Example Request:** `/reviews/search/Zelda?format=text`

**Example Response:**
```
Title: The Legend of Zelda: Breath of the Wild
Review: Amazing open-world game with stunning visuals and gameplay.
Rating: 10
```

**Error Handling:**
* 400: Missing required query parameter `gameTitle`.
* 500: Server-side issue while searching reviews.

**Example Request:** `/reviews/search?format=json`

**Example Response:**
```json
{
  "error": "Missing required query parameter: gameTitle"
}
```

**Example Request:** `/reviews/search?gameTitle=InvalidGame`

**Example Response:**
```json
[]
```

## *GET /status*
**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** 
Returns the server status in plain text format.

**Supported Parameters**
None

**Example Request:** `/status`

**Example Response:**
```
Server is running correctly.
```

## *POST /reviews*
**Request Type:** POST

**Returned Data Format**: JSON

**Description:**
Submits a new game review to the server.

**Supported Parameters**
* POST body parameters:
  * `gameTitle` (required) - The title of the game being reviewed.
  * `content` (required) - The review content.
  * `rating` (required) - The rating given to the game.

**Example Request:** `/reviews`
* POST body:
  ```json
  {
    "gameTitle": "Hades",
    "content": "An excellent roguelike with engaging story and gameplay.",
    "rating": 8
  }
  ```

**Example Response:**
```json
{
  "gameTitle": "Hades",
  "content": "An excellent roguelike with engaging story and gameplay.",
  "rating": 8
}
```

**Error Handling:**
* 400: Missing required fields `gameTitle`, `content`, or `rating`.
* 500: Server-side issue while saving the review.

**Example Request:** `/reviews`
* POST body:
  ```json
  {
    "content": "Incomplete review.",
    "rating": 4
  }
  ```

**Example Response:**
```json
{
  "error": "Missing required fields: gameTitle, content, or rating"
}
```

## *Handle 404 Error*
**Request Type:** Any

**Returned Data Format**: JSON

**Description:** 
Handles requests to any undefined routes and returns a 404 error.

**Example Request:** `/undefined-route`

**Example Response:**
```json
{
  "error": "Not Found"
}
```
