// script.js

document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!query) {
    resultsDiv.innerHTML = "<p>Please type a word to search.</p>";
    return;
  }

  try {
   const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const videos = await response.json();

    if (videos.length === 0) {
      resultsDiv.innerHTML = "<p>No videos found.</p>";
      return;
    }

    videos.forEach((video) => {
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const thumbnail = video.snippet.thumbnails.medium.url;

      const videoCard = `
        <div class="video-card">
          <img src="${thumbnail}" alt="${title}" />
          <h3>${title}</h3>
          <iframe width="360" height="215"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0" allowfullscreen></iframe>
        </div>
      `;
      resultsDiv.innerHTML += videoCard;
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    resultsDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
  }
});
