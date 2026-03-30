const API_KEY = "6b09ffdb";
const API_BASE = "https://www.omdbapi.com/";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieGrid = document.getElementById("movieGrid");
const loadingSpinner = document.getElementById("loadingSpinner");
const noResults = document.getElementById("noResults");


searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch()
    }
})

function handleSearch() {
    const query = searchInput.value.trim() || "movie"
    searchMovies(query)
}

async function searchMovies(query) {
    loadingSpinner.classList.remove("hidden")
    noResults.classList.add("hidden");
    movieGrid.innerHTML = "";

    try {
        const result = await fetch(`${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=1`,)
        const data = await result.json();

        console.log(data);


        if (data.Response === "True" && data.Search.length > 0) {
            data.Search.forEach((movie) => {
                movieGrid.appendChild(createMovieCard(movie))
            })
        } else {
            noResults.classList.remove("hidden");
        }


    } catch (error) {
        noResults.classList.remove("hidden");
    } finally {
        loadingSpinner.classList.add("hidden")
    }
}

function createMovieCard(movie) {
    const card = document.createElement("div")

    card.className =
        "movie-card bg-gray-800 rounded-lg overflow-hidden animate-fade-in";

    const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"

    card.innerHTML = `
     <div class="h-64 overflow-hidden">
            <img src="${poster}" alt="${movie.Title}" class="poster-img" loading="lazy" />
          </div>
          <div class="p-4">
            <h3 class="font-bold text-base mb-1 line-clamp-2">${movie.Title}</h3>
            <p class="text-gray-400 text-sm">${movie.Year}</p>
          </div>
    `

    return card
}

searchMovies("movie")