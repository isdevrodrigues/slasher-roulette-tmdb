document.getElementById('recommendButton').addEventListener('click', getRandomMovie);

async function getRandomMovie() {
    try {
        const response = await fetch('/api/movie');
        const data = await response.json();
        const movie = data.results;
        if (movie.length > 0) {
            const randomIndex = Math.floor(Math.random() * movie.length);
            displayMovie(movie[randomIndex]);
        } else {
            displayError("No movies found.")
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        displayError("Failed to fetch movie data.");
    }
}

function displayMovie(movie) {
    const movieContainer = document.getElementById('movieContainer');
    movieContainer.innerHTML = `
        <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank"><h2>${movie.title}</h2></a>
        <p>${movie.overview}</p>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    `;
}

function displayError(message) {
    const movieContainer = document.getElementById('movieContainer');
    movieContainer.innerHTML = `<p>${message}</p>`;
}
