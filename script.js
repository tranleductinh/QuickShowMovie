const trailers__thumbnail = document.querySelectorAll(".trailers__thumbnail");
const closeLucide = document.getElementById("closeLucide");
const menuLucide = document.getElementById("menuLucide");
const navMenu = document.getElementById("navMenu");
const moviesList = document.getElementById("moviesList");
const showMore = document.getElementById("showMore");
let data = null;

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

async function getData() {
  try {
    const response = await fetch(
      "https://quickshow-server.vercel.app/api/show/all"
    ); // Gửi yêu cầu GET
    if (!response.ok) throw new Error("Lỗi mạng hoặc API");
    data = await response.json();
    console.log(data.shows.length);
    renderFilm(moviesList, 4);
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}
getData();
showMore.addEventListener("click", () => {
  renderFilm(moviesList, data.shows.length);
  showMore.style.display = "none";
});

function renderFilm(moviesList, j) {
  moviesList.innerHTML = data.shows
    .slice(0, j)
    .map((film) => {
      return `
  <article class="movie-card">
        <img
          src="	https://image.tmdb.org/t/p/original/${film.poster_path}g"
          alt="How to Train Your Dragon poster"
        />
        <p class="movie-card__title">${film.title}</p>
        <p class="movie-card__meta">2025 · ${film.genres
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
            ${film.vote_average}</span
          >
        </div>
      </article>
    `;
    })
    .join("");
}
