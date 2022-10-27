# BigLab 2 - Class: 2022 AW1

## Team name: TEAM_NAME

Team members:
* s294628 CHIARO CRISTOPHER
* s303434 GUARNA MATTEO
* s306026 CASTELLANA LUCA 

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but please double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |
| testuser.rossi@polito.it | password | testuser |
| matteo.guarna@studenti.polito.it | password | Matteo  |

## List of APIs offered by the server

## Film APIs
### GET
#### /api/films
* Return an array containing all films.
* Request body: empty.
* Response: `200 OK` (success); body: An array of objects, each describing id, title, weight, name, favorite, watching date, rating of a film and user
```
[
    {
        "id":7,
        "title":"LotR",
        "favorite":0,
        "watchdate":"Invalid Date",
        "rating":2,
        "user":3
    },
    {
        "id":10,
        "title":"Pulp Fiction",
        "favorite":1,
        "watchdate":"2022-06-04",
        "rating":3,
        "user":3
    }
]
```
* Error responses:  `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error).



#### /api/films/:id
* Return an object containing the film with a specified id
* Request body: empty.
* Reuest header: req.params.id.
* Response: `200 OK` (success); body:  An object describing id, title, weight, name, favorite, watching date, rating of a film and user
```
{
    "id":7,
    "title":"LotR",
    "favorite":0,
    "watchdate":"Invalid Date",
    "rating":2,
    "user":3
}
```
* Error responses:  `401 Unauthorized` (not logged in or wrong permissions), `404 Not found` (film with that id not found), `500 Internal Server Error` (generic error).


#### /api/films/favorite
* Return an array containing films with attribute favorite = 1.
* Request body: empty.
* Response: `200 OK` (success); body: An array of objects, each describing id, title, weight, name, favorite, watching date, rating of a film and user
```
[
    {
        "id":10,
        "title":"Pulp Fiction",
        "favorite":1,
        "watchdate":"2022-06-04",
        "rating":3,
        "user":3
    }
]
```
* Error responses:  `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error).
 
 
 
 #### /api/films/bestrated
* Return an array containing all best rated films.
* Request body: empty.
* Response: `200 OK` (success); body: An array of objects, each describing id, title, weight, name, favorite, watching date, rating of a film and user
```
[
    {
        "id":6,
        "title":"Matrix",
        "favorite":0,
        "watchdate":"2022-05-04",
        "rating":5,
        "user":3
    },
    {
        "id":11,
        "title":"21 Guns",
        "favorite":1,
        "watchdate":"2022-01-03",
        "rating":5,
        "user":3
    }
]
```
* Error responses:  `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error).



#### /api/films/seenlastmonth
* Return an array containing films seen within the previous 30 days from the current date.
* Request body: empty.
* Response: `200 OK` (success); body: An array of objects, each describing id, title, weight, name, favorite, watchdate, rating of a film and user 
```
[
    {
        "id":10,
        "title":"Pulp Fiction",
        "favorite":1,
        "watchdate":"2022-06-04",
        "rating":3,
        "user":3
    }
]
```
* Error responses:  `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error).

#### /api/films/unseen
* Return an array containing all films without a watchdate.
* Request body: empty.
* Response: `200 OK` (success); boy:  An array of objects, each describing id, title, weight, name, favorite, watchdate, rating of a film and user
 ```
[
    {
        "id":3,
        "title":"Star Wars",
        "favorite":0,
        "watchdate":"Invalid Date",
        "rating":3,
        "user":1
    }
]
```
* Error responses:  `401 Unauthorized` (not logged in or wrong permissions), `500 Internal Server Error` (generic error).


### POST

#### /api/film
* Creates a new film.
* Request header has a line: `Content-Type: application/json`.
* Request body: a JSON object containing title, favoite, watching date and film rating.
 Example of Request body

    ```
        {
            "title" : "Garfield",
            "favorite" : 1,
            "watchdate" : 2022-01-30,
            "rating" : 4
        }
    ```


* Response header:  `201 Created` (success). 
* Response body: none.
* Error responses: `401 Unauthorized` (not logged in or wrong permissions), `503 Service Unavailable` (generic error).

### PUT

#### /api/film/:id
* Modify a filed of a film with a specific id.
* Request header: req.params.id.
* Request body: 
  ```
        {
            "title" : "Garfield",
            "favorite" : 0,
            "watchdate" : 2022-01-30,
            "rating" : 5
        }
    ```
* Response header:  `200 OK` (success).
* Error responses: `401 Unauthorized` (not logged in or wrong permissions),`404 Not found` (film with id not found), `503 Service Unavailable` (generic error).

### DELETE

#### /api/film/:id
* Delete a film with a specified id.
* Request header : req.params.id.
* Request body: empty
* Response header:  `204 No Content` (success).
* Error responses: `401 Unauthorized` (not logged in or wrong permissions), `503 Service Unavailable` (generic error).


## User APIs
### GET
#### api/sessions/current
  * Returns user informations if logged in.
  * Request body: empty.
  * Response: `200 Ok` (success). 
  * Response body: user info
    ```
        {
        "id":3,
        "username":"testuser@polito.it",
        "name":"testuser"
        }
    ```
  * Error responses: `401 Unauthorized` (not logged in).

### POST

#### api/sessions
* Login of users
* Request header has a line: `Content-Type: application/json`. 
* Request body: username and password. Username must be an email
* Response: `200 Ok` (success)  
* Response body: user info (id, username and name).
```
        {
        "id":3,
        "username":"testuser@polito.it",
        "name":"testuser"
        }
```
* Error responses: `401 Unauthorized` (wrong username and/or password)

### DELETE

#### /api/sessions/current
* Delete current session.
* Request header : none.
* Request body: empty
* Response header:  `200 OK` (success).
* Error responses: none