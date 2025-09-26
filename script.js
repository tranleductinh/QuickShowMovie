const trailers__thumbnail = document.querySelectorAll(".trailers__thumbnail");
const closeLucide = document.getElementById("closeLucide");
const menuLucide = document.getElementById("menuLucide");
const navMenu = document.getElementById("navMenu");
const moviesList = document.getElementById("moviesList");
const movieDetails = document.getElementById("movieDetails");
const showMore = document.getElementById("showMore");
const castList = document.getElementById("castList");
const dateList = document.getElementById("dateList");
const chooseDate = document.getElementById("chooseDate");
let data = null;
let movie = null;

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
console.log("movieId", movieId);
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let videoId = null;
trailers__thumbnail.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    videoId = thumbnail.getAttribute("data-id");
    const trailersVdeo = document.querySelector(".trailers__video");
    trailersVdeo.src = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
  });
});

menuLucide.addEventListener("click", (e) => {
  e.preventDefault();
  navMenu.classList.add("on__menu");
});

closeLucide.addEventListener("click", (e) => {
  e.preventDefault();
  navMenu.classList.remove("on__menu");
});
async function getMovie() {
  try {
    const response = await fetch(
      `https://quickshow-server.vercel.app/api/show/${movieId}`
    ); // Gửi yêu cầu GET
    if (!response.ok) throw new Error("Lỗi mạng hoặc API");
    movie = await response.json();
    console.log(movie);
    renderMovie();
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}
getMovie();

async function getData() {
  try {
    const response = await fetch(
      "https://quickshow-server.vercel.app/api/show/all"
    ); // Gửi yêu cầu GET
    if (!response.ok) throw new Error("Lỗi mạng hoặc API");
    data = await response.json();
    console.log(data.shows.length);
    if (moviesList) {
      renderFilm(moviesList, 4);
    }
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}
getData();

if (showMore) {
  showMore.addEventListener("click", () => {
    renderFilm(moviesList, data.shows.length);
  });
}

function renderMovie() {
  movieDetails.innerHTML = `
  <img
      src="https://image.tmdb.org/t/p/original${movie.movie.poster_path}"
      alt="Guardians of the Galaxy"
    />
    <div class="movie-details__info">
      <div class="absolute__red"></div>
      <p class="movie-language">ENGLISH</p>
      <h1 class="movie-details__title">
        ${movie.movie.title}
      </h1>
      <div class="movie-details__rating">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-star w-5 h-5 text-primary fill-primary"
          aria-hidden="true"
        >
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
          ></path>
        </svg>
        ${movie.movie.vote_average} User Rating
      </div>
      <p class="movie-details__description">
        ${movie.movie.overview}
      </p>
      <p>${
        Math.floor(movie.movie.runtime / 60) +
        "h " +
        (movie.movie.runtime % 60) +
        "m"
      } •
      ${movie.movie.genres.map((genre) => genre.name).join(", ")} • 2025</p>
      <div class="movie-details__actions">
        <button class="button__trailer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-circle-play w-5 h-5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
          <span>Watch Trailer</span>
        </button>
        <a href="#chooseDate"><button class="button__buy-tickets">Buy Tickets</button></a>
        <button class="button__love">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-heart w-5 h-5"
            aria-hidden="true"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  `;
  castList.innerHTML = movie.movie.casts
    .map((cast) => {
      return `
      <div class="cast__item">
                <img
                  src="	https://image.tmdb.org/t/p/original${cast.profile_path}"
                  alt="Guardians of the Galaxy"
                />
                <p class="cast__name">${cast.name}</p>
              </div>
    `;
    })
    .join("");

  // console.log(Object.keys(movie.dateTime));
  dateList.innerHTML = Object.keys(movie.dateTime)
    .map((date) => {
      return `
        <button class="choose__date-button">
                    <span>${date.split("-")[2]}</span>
                    <span>${monthsShort[date.split("-")[1] - 1]}</span>
        </button>
      `;
    })
    .join("");
}

function renderFilm(moviesList, j) {
  moviesList.innerHTML = data.shows
    .slice(0, j)
    .map((film) => {
      return `
  <article class="movie-card">
        <a href="./details.html?id=${film._id}">
        <img
          src="	https://image.tmdb.org/t/p/original/${film.poster_path}g"
          alt="How to Train Your Dragon poster"
        />
        </a>
        <p class="movie-card__title">${film.title}</p>
        <p class="movie-card__meta">2025 · ${film.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")} · ${
        Math.floor(film.runtime / 60) + "h " + (film.runtime % 60) + "m"
      }</p>
        <div class="movie-card__footer">
          <button class="movie-card__button">Buy Tickets</button>
          <span class="movie-card__rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-star w-4 h-4 text-primary fill-primary"
              aria-hidden="true"
            >
              <path
                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
              ></path>
            </svg>
            ${film.vote_average.toFixed(1)}</span
          >
        </div>
      </article>
    `;
    })
    .join("");
}
