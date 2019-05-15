require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
// var lineReader = require("readline").createInterface({
// 	input: require("fs").createReadStream("../text/random.txt")
// });

inquirer
	.prompt([
		{
			type: "list",
			message: "What is it that you are looking for?",
			choices: ["music", "a movie", "a concert/event", "surprise me"],
			name: "apiChoice"
		}
	])
	.then(inquirerResponse => {
		switch (
			inquirerResponse.apiChoice //the apiChoice goes through a switch case associated to the answer
		) {
			case "music": //case for music choice
				musicCase(); //calls the musicCase function to run
				break;
			case "a movie": //case for movie choice
				movieCase(); //calls the movieCase function to run
				break;
			case "a concert/event": //case for concert choice
				concertCase(); //calls the concertCase function to run
				break;
			case "surprise me":
				randomPick();
				// random selected from the random.txt file
				break;
			default:
				console.log("error");
				break;
		}
	});

const musicCase = () => {
	inquirer //inquirer input for music choice
		.prompt([
			{
				type: "input",
				message: "name of song:",
				name: "song"
			}
		])
		.then(inquirerResponse => {
			let searchInput = inquirerResponse.song; //saving song title as song
			if (!inquirerResponse.song) {
				searchInput = "The Sign ace of base"; //if nothing is inputed, the sign will be default
			}
			spotifySearch(searchInput);
		});
};

const spotifySearch = searchInput => {
	spotify.search({ type: "track", query: searchInput, limit: 1 }, (err, response) => {
		const trackList = response.tracks.items[0]; //returned data path stored as trackList
		if (err) return console.log(err.message); //err first
		//list of specific details out of the data
		console.log(`by: ${trackList.artists[0].name}`);
		console.log(`Song name: ${trackList.name}`);
		console.log(`song preview: ${trackList.preview_url}`);
		console.log(`Album name: ${trackList.album.name}`);
	});
};

const movieCase = () => {
	inquirer //inquirer input to store preferred movie
		.prompt([
			{
				type: "input",
				message: "name of title:",
				name: "title"
			}
		])
		.then(inquirerResponse => {
			let searchInput = inquirerResponse.title; //saving title as movie
			if (!inquirerResponse.title) {
				searchInput = "mr nobody"; //if nothing was typed, it'll default to mr nobody
			}
			omdbSearch(searchInput);
		});
};

const omdbSearch = searchInput => {
	let queryUrl = "http://www.omdbapi.com/?t=" + searchInput + "&y=&plot=short&apikey=trilogy"; //movie added to queryUrl for omdb
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
};

const concertCase = () => {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Name of the act you want to see: ",
				name: "act",
				validate: function validateAct(name) {
					//function ensuring something is entered
					return name !== "";
				}
			}
		])
		.then(inquirerResponse => {
			let searchInput = inquirerResponse.act;
			eventSearch(searchInput);
		});
};

const eventSearch = searchInput => {
	console.log(searchInput);
	let queryUrl = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";

	axios
		.get(queryUrl)
		.then(response => {
			const actDate = response.data[0].datetime
				.substr(0, 10)
				.split("-")
				.reverse()
				.join("/");
			const actVenue = response.data[0].venue; //saving venue path as a variable
			console.log(`name of venue: ${actVenue.name}`); //name of venue
			console.log(`where: ${actVenue.city}, ${actVenue.region} ${actVenue.country}`); //venue location
			console.log(`date: ${actDate}`); //date event
		})
		.catch(err => {
			console.log(err);
		});
};

const randomPick = () => {
	fs.readFile("../text/random.txt", "utf8", (err, data) => {
		if (err) return console.log(err.message);
		const dataArr = data.split("\n");
		const selectedLine = dataArr[Math.floor(Math.random() * dataArr.length)];
		const action = selectedLine.split(",")[0];
		const searchInput = selectedLine.split(",")[1];
		console.log("action: " + action);
		console.log("searchInput: " + searchInput);
console.log("searchInput", searchInput);
		switch (action) {
			case "music":
				spotifySearch(searchInput);
				break;
			case "movie":
				omdbSearch(searchInput);
				break;
			case "event":
				eventSearch(searchInput);
				break;
		}
	});
};
