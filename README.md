# liri-node-app

## INTRODUCTION
___

![liriIntroPic](/assets/images/liriNode.png)
___
My liri-node-app is capable to access the Spotify, BandsinTown, and OMDB APIs and return specific information pertaining to what was searched.
___

## INSTALL
___
clone from Github page

in terminal or gitBash, run a git clone in desired location to save app.

Run an npm install to download required packages.

## INQUIRER
___
The app program starts with an inquirer prompt that asks the question "What is it that you are looking for?"

![liriIntroPic](/assets/images/inquirerPrompt.png)

here the choices are "music", "a movie", "concert/event", and "surprise me" and the choice will affect what switch case is ran. 

____
## SPOTIFY
___

If "music" is chosen, the case containing the function to inquirer.prompt song input is ran. 
![liriIntroPic](/assets/images/musicPrompt.png)

This will give the user a specific song to search. What the user enters will be stored as the variable searchInput and be used for the "spotify-api-node". If nothing is entered, it will default to song "the sign" by Ace of Base. Once the user hits enter, the results will show up as shown below.

![liriIntroPic](/assets/images/musicResults.png)


The results are from the spotify-api-node in which helps program search and return data from the Spotify api. Instead of the results showing everything pertaining to the song, the program is given specific instructions to navigate the data returned. This includes:
 * artist/s name
 * song name
 * a link to preview the song
 * album name

___
## MOVIE
___

The movie search is similar to music in that an inquirer.prompt is displayed asking for a specific movie. If nothing is entered, the program will default to searching for "Mr. Nobody".

![liriIntroPic](/assets/images/moviePrompt.png)

This input will be entered into a different api(OMDB) and to access it with ease is with the axios node. axios will help navigate and return the data from OMDB. Just like spotify only specific data will be displayed:

* movie title
* year released
* IMDB rating
* rotten Tomatoes
* country
* language
* plot
* actors

![liriIntroPic](/assets/images/movieResults.png)

___
## EVENT
___

The event case is very similar to movie in that it uses axios to get and return data from an api. The major difference is that it is using the Bandsintown api instead of OMDB. like previous steps, the first step is to execute an inquirer.prompt for a specific event. There is a validate implemented here that will require the user to type something.

![liriIntroPic](/assets/images/eventPrompt.png)

The input is then searched for in the api, bringing back the first result of the specific act (usually their next concert date). 

![liriIntroPic](/assets/images/eventResults.png)

The search results will display:

* venue's name
* where by city, state(if US), and country
* date 

___
## SURPRISE ME
___
The surprise me case accesses the filesystem(fs) reads a text file (random.txt), chooses a random line (example: music,get low), each line split up as two variables by the comma and stored as variables 'action' 'searchInput' respectively (example: action=music, searchInput=get low).
 the action input is placed into a switch case structure that will dictate what search function will be used. if music, then the searchInput will be used as an argument for the spotify search function.

![liriIntroPic](/assets/images/randomResults.png)

as displayed in the image, neither music nor get low were typed in any input prompt.