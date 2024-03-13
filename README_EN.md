# Holafly Technical Test

## Instructions

_All instructions assume that the candidate has a version of node.js installed on their system._

- Clone this repository and make all the requested changes in the statement on the clone.
- Install external libraries using `npm install` and run the server using `npm run dev`.
- Make commits respecting the following structure: 
    - `Action (context): message`, being: 
        - Action: `feat` for new features, `fix` for error correction, `refactor` for code refactoring tasks, or `chore` for changes unrelated to code.
        - Context: a descriptive string about the task being performed.
        - Message: a concise message about the change to be made.
    - Example: `feat (getPeople): Created database query function`
- Once you consider the test to be concluded, notify us of the cloned repository's address to proceed with its review.

### Notes
- Frequent commits are recommended to keep an adequate track of the work done.
- There is no maximum time to complete the test.
- There is no limitation when consulting any source of documentation.
- Assistance from third parties is prohibited. This includes asking for help in forums or specialized chats.
- The code already has the necessary external libraries to perform all the required functions. However, if you wish to use an additional external library, it must be installable through `npm`, and its inclusion must be justified in a comment in the `README.md` file.

## Test Statement
The present code deploys a node.js/express server on which the following endpoints are to be implemented:

#### /hfswapi/getPeople/:id

> Given a valid ID of a Star Wars franchise character, consult in the provided database (DB) and return an object with the following data:
> - name: Full name of the character corresponding to the given ID.
> - mass: Mass of the character corresponding to the given ID.
> - height: Height of the character corresponding to the given ID.
> - homeworldName: Name of the character's home planet corresponding to the given ID.
> - homeworldId: Identifier of the character's home planet corresponding to the given ID.
>
> If these data are not available in the DB, consult the SWAPI (https://swapi.py4e.com/) on the appropriate endpoint.

#### /hfswapi/getPlanet/:id

> Given a valid ID of a Star Wars franchise planet, consult in the provided database (DB) and return an object with the following data:
> - name: Name of the planet corresponding to the given ID.
> - gravity: Gravity factor of the planet corresponding to the given ID compared to the standard considered.
>
> If these data are not available in the DB, consult the SWAPI (https://swapi.py4e.com/) on the appropriate endpoint.

#### /hfswapi/getWeightOnPlanetRandom

> Randomly taking two identifiers, one for characters and another for planets, obtain from the Database (DB) the weight of the character corresponding to one of the identifiers on the planet corresponding to the other identifier, considering the following relationship:
> 
> \( Weight_{Character} = Gravity_{Planet} \times Mass_{Character} \)
> 
> If the required data are not available in the DB, consult the SWAPI (https://swapi.py4e.com/) on the appropriate endpoint.
>
> > _Extra functionality:_ 
> > _Detect if the weight of a character on their home planet is being calculated and throw an error._

#### /hfswapi/getLogs

> All calls made to the previous endpoints must be returned, for which the following data will have been previously stored in the Database (DB):
> - action: Endpoint accessed.
> - header: Call headers stored as a plain text string.
> - ip: IP address from where the call is made.

In addition to these endpoints, it is required to expand the `People` package with the classes and functions necessary to cover the case where the format of the object returned by the SWAPI is in Wookiee language.
