// 1 Exercise: Make a shallow copy of the movie database
const movies = require('../src/data');
function copyDatabase(movies) {
  const movieCopy = [...movies];
  return movieCopy;
}
//console.log(copyDatabase(movies))
console.log('######################');

// 2: return every title of the movie database

function everyTitle(movies) {
  return movies.map((movie) => movie.title);
}

//console.log(everyTitle(movies))

// 3: sort every Title

function sortEveryTitle(movies) {
  return everyTitle(movies).sort();
}

//console.log(sortEveryTitle(movies))

// 4: return all Movie Titles in lowercase,
// dont change original Database

function everyTitleLowercase(movies) {
  return movies.map((movie) => movie.title.toLowerCase());
}

//console.log(everyTitleLowercase(movies))
console.log('######################');
//console.log(movies)

// 5: Create an Array with directors
// and the average of his/her score - use reduce!
// dont change the old database

function directorsAvgScore(movies) {
  // makes a shallow copy of movies
  const moviesCopy = [...movies];
  // get all Directors
  const allDirectors = moviesCopy.reduce((accu, movie) => {
    accu.push(movie.director);
    return accu;
  }, []);

  // have an Array with unique Directors
  const uniqueDirectors = [...new Set(allDirectors)]
  // gives back all Movies of Director
  const moviesFromDirector = function(director) {
    return moviesCopy.filter(movie => movie.director === director)}
  // gives back the average score of a given movie collection
  const avgOfMovies = function(movies) {
    return movies.reduce((totalScore, currentScore) => {
      totalScore += currentScore.score
      return totalScore
    }, 0)/movies.length
  }
  
  // goes through all unique directors, adds the director as key to the result object,
  // adds the average of directors movies as value to this key
  let result = {}
  for (element of uniqueDirectors) {
    result[element] = avgOfMovies(moviesFromDirector(element))
  }

  return result
}

console.log('######################');
console.log(directorsAvgScore(movies));

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(arrOfMovies) {
  let allDirectorsArray = [];
  let allDirectorsArrayUnique = [];

  // pushes all directors of arrOfMovies into allDirectorsArray
  arrOfMovies.map((movieEntry) => {
    allDirectorsArray.push(movieEntry.director);
  });

  // pushes all directors of allDirectorsArray into allDirectorsArrayUnique if not already included
  allDirectorsArray.map((director) => {
    if (!allDirectorsArrayUnique.includes(director))
      allDirectorsArrayUnique.push(director);
  });

  return allDirectorsArrayUnique;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(arrOfMovies) {
  let countOfStevensDramas = [];

  countOfStevensDramas = arrOfMovies.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  );

  return countOfStevensDramas.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(arrOfMovies) {
  if (!arrOfMovies.length) return 0;

  let sumOfScores = 0;
  let avgScore = 0;

  // sums up all movie.score´s to sumOfScores
  //arrOfMovies.map(movieEntry => sumOfScores+=movieEntry.score)  // if all movies have a score
  arrOfMovies.map((movieEntry) => {
    // if a movie doesnt have a score
    if (movieEntry.score) sumOfScores += movieEntry.score;
    else sumOfScores += 0;
  });

  // calculates avgScore
  avgScore = sumOfScores / arrOfMovies.length;
  // sets the decimal point to 2 after comma | TypeCast to Number, because toFixed returns a String
  avgScore = Number(avgScore.toFixed(2));

  return avgScore;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArr) {
  let avgScoreOfDramas = 0;
  let allDramaMovies = [];

  allDramaMovies = moviesArr.filter((movieEntry) =>
    movieEntry.genre.includes('Drama')
  );
  avgScoreOfDramas = scoresAverage(allDramaMovies);

  return avgScoreOfDramas;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArr) {
  let moviesSortByYear = JSON.parse(JSON.stringify(moviesArr));

  // because a normal sort would just sort through a.year and ignore the title, the normal sort was added again, if the year
  // is the same. It checks now for a/b.title and switches the obj.entry accordingly - looks like a mess though
  moviesSortByYear.sort((a, b) => {
    if (a.year < b.year) return -1; // a.year is less than b.year
    if (a.year > b.year) return 1; // aa.year is greater than b.year
    if (a.year === b.year) {
      if (a.title < b.title) return -1; // a.title is less than b.title
      if (a.title > b.title) return 1; // a.title is greater than b.title
      if (a.title === b.title) return 0; // a.title equals b.title
    }
  });

  return moviesSortByYear;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArr) {
  let resultArr = [];
  let movies = JSON.parse(JSON.stringify(moviesArr));

  movies.map((movie) => resultArr.push(movie.title)); //pushes all sorted movies into the resultArray
  resultArr.sort(); // sorts all movies by title
  resultArr = resultArr.slice(0, 20); // slices Array to max. 20 Items
  return resultArr;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArr) {
  let movies = JSON.parse(JSON.stringify(moviesArr));

  movies.map((movie) => {
    let hoursInMinutes = 0;
    let movieTotalInMinutes = 0;
    minutes = 0;

    let hours = 0; // sums up the hours
    hours = movie.duration;
    hours = hours.match(/[0-9]*h/);
    hours = String(hours);
    hours = hours.slice(0, hours.indexOf('h'));
    hoursInMinutes = hours * 60;

    if (movie.duration.match(/[0-9]*min/) !== null) {
      // sums up the minutes, if there are any
      minutes = movie.duration;
      minutes = minutes.match(/[0-9]*min/);
      minutes = String(minutes);
      minutes = minutes.slice(0, minutes.indexOf('min'));
      minutes = Number(minutes);
    }

    movieTotalInMinutes = Number(minutes) + Number(hoursInMinutes);
    movie.duration = Number(movieTotalInMinutes);
  });

  return movies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg() {}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
