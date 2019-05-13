require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
	.prompt([
		{
			type: "list",
			message: "What is that your are looking for?",
			choices: ["music", "a movie", "a concert/event", "surprise me"],
			name: "apiChoice"
		}
	])
	.then(inquirerResponse => {
		switch (
			inquirerResponse.apiChoice //the apiChoice goes through a switch case associated to the answer
		) {
			case "music":
				inquirer.prompt([
					{
						type: "input",
						message: "name of artist:",
						name: "artist"
					}
				]);
				// .then(inquirerResponse => {});
				//spotify-api-node request prompt code here
				break;
			case "a movie": //case for movie choice
				inquirer
					.prompt([
						{
							type: "input",
							message: "name of title:", //input to store preferred movie
							name: "title"
						}
					])
					.then(inquirerResponse => {
						let movie = inquirerResponse.title; //saving title as movie
						if (!inquirerResponse.title) {
							//if nothing was typed, it'll default to mr nobody
							movie = "mr nobody";
						}
						// console.log(movie);
						let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"; //movie added to queryUrl for omdb
						// console.log(queryUrl);
						axios
							.get(queryUrl)
							.then(response => {
								//displays only specific results about the searched movie in a clean manner on the console
								console.log(`Title: ${response.data.Title}`);
								console.log(`Year released: ${response.data.Year}`);
								console.log(`IMDB rating: ${response.data.imdbRating}`);
								console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
								console.log(`Country: ${response.data.Country}`);
								console.log(`Language: ${response.data.Language}`);
								console.log(`Plot: ${response.data.Plot}`);
								console.log(`Actors: ${response.data.Actors}`);
							})
							.catch(err => {
								//in case of error, the error message will display
								console.log(err.message);
							});
					});
				break;
			case "a concert/event":
				inquirer
					.prompt([
						{
							type: "input",
							message: "Name of the act you want to see: ",
							name: "act",
							validate: function validateAct(name) {
								return name !== "";
							}
						}
					])
					.then(inquirerResponse => {
						let act = inquirerResponse.act;
						let queryUrl = "https://rest.bandsintown.com/artists/" + act + "/events?app_id=codingbootcamp";
						// console.log(queryUrl);
						axios
							.get(queryUrl)
							.then(response => {
								const actDate = response.data[0].datetime.substr(0, 10).split("-").reverse().join("/");
								const actVenue = response.data[0].venue; //saving venue path as a variable
								console.log(`name of venue: ${actVenue.name}`); //name of venue
								console.log(`where: ${(actVenue.city, actVenue.region, actVenue.country)}`); //venue location
								console.log(`date: ${actDate}`); //date event
							})
							.catch(err => {
								console.log(err.message);
							});
					});
				//bandsintown axios get request prompt here
				break;
			case "surprise me":
				//random selected from the random.txt file
				break;
			default:
				console.log("broke");
				break;
		}
	});
