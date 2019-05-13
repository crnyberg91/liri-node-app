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
		switch (inquirerResponse.apiChoice) {
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
			case "a movie":
				inquirer
					.prompt([
						{
							type: "input",
							message: "name of title:",
							name: "title"
						}
					])
					.then(inquirerResponse => {
						let movie = inquirerResponse.title
                        if (!inquirerResponse.title){
                            movie = "mr nobody";
                        }
						console.log(movie);
						let queryUrl =
							"http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
						console.log(queryUrl);
						axios
							.get(queryUrl)
							.then(response => {
								console.log(`Title: ${response.data.Title}`);
                                console.log(`Year released: ${response.data.Year}`);
                                console.log(`IMDB rating: ${response.data.imdbRating}`);
                                console.log(`Rotten TOmatoes Rating: ${response.data.Ratings[1].Value}`);
                                console.log(`Country: ${response.data.Country}`)
                                console.log(`Language: ${response.data.Language}`);
                                console.log(`Plot: ${response.data.Plot}`);
                                console.log(`Actors: ${response.data.Actors}`);
							})
							.catch(err => {
								console.log(err.message);
							});
					});
				//omdb axios get request prompt here
				break;
			case "a concert/event":
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
