document.querySelector('.recommend-button').addEventListener('click', getRandomMovie);

async function getRandomMovie() {
    try {
        const response = await fetch('/api/movie');
        const data = await response.json();
        const movies = data.results;
        if (movies.length > 0) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            displayMovie(movies[randomIndex]);
        } else {
            displayError("No movies found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        displayError("Failed to fetch movie data.");
    }
}

function displayMovie(movie) {
    const resultsContainer = document.querySelector('.displayResults');
    resultsContainer.innerHTML = `
        <div class="movie-box">
            <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
                <h2>${movie.title}</h2>
            </a>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
        </div>
    `;
}

function displayError(message) {
    const resultsContainer = document.querySelector('.displayResults');
    resultsContainer.innerHTML = `
        <div class="error-box">
            <p>${message}</p>
        </div>
    `;
}
