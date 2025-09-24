const apiKey = "YOUR_API_KEY"; // Replace with your OMDB API key
let currentMovie = "";

// Search movie from API
async function searchMovie() {
  const movieName = document.getElementById("movieInput").value;
  if (!movieName) return alert("Enter a movie name!");

  const res = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
  const data = await res.json();

  if (data.Response === "False") {
    document.getElementById("movieDetails").innerHTML = "<p>Movie not found!</p>";
    document.getElementById("reviewsSection").style.display = "none";
    return;
  }

  currentMovie = data.Title;
  document.getElementById("movieDetails").innerHTML = `
    <img src="${data.Poster}" width="150">
    <h2>${data.Title} (${data.Year})</h2>
    <p><b>Genre:</b> ${data.Genre}</p>
    <p><b>Plot:</b> ${data.Plot}</p>
    <p><b>IMDB Rating:</b> ${data.imdbRating}</p>
  `;

  document.getElementById("reviewsSection").style.display = "block";
  loadReviews();
}

// Add review and save to local storage
function addReview() {
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  if (!rating || !comment) return alert("Please enter rating and review!");

  let reviews = JSON.parse(localStorage.getItem(currentMovie)) || [];
  reviews.push({ rating, comment });
  localStorage.setItem(currentMovie, JSON.stringify(reviews));

  document.getElementById("rating").value = "";
  document.getElementById("comment").value = "";

  loadReviews();
}

// Load reviews from local storage
function loadReviews() {
  let reviews = JSON.parse(localStorage.getItem(currentMovie)) || [];
  let html = "";
  reviews.forEach((r, index) => {
    html += `
      <div class="review">
        <p><b>Rating:</b> ${r.rating}/5</p>
        <p>${r.comment}</p>
      </div>
    `;
  });
  document.getElementById("reviewsList").innerHTML = html;
}
