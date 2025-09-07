
const songs = [
  { title: "Hey Shivanandan", artist: "Sonu Nigam", src: "songs/Hey_shivnandan.mp3" },
  { title: "Krishna Krishna", artist: "Antara Nandy, Ankita Nandy", src: "songs/Krishna_Krishna.mp3" },
  { title: "Madhurashtakam", artist: "Jubian Nautiyal", src: "songs/Madhurashtakam.mp3" }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playlist = document.getElementById("playlist");

// Load songs into playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title + " - " + song.artist;
  li.addEventListener("click", () => {
    currentSong = index;
    loadSong();
    playSong();
  });
  playlist.appendChild(li);
});

// Load current song
function loadSong() {
  console.log("Loading:",songs[currentSong].src);
  audio.src = songs[currentSong].src;
  title.textContent = songs[currentSong].title;
  artist.textContent = songs[currentSong].artist;
  updatePlaylistUI();
}

// Play song
function playSong() {
  audio.play();
  playBtn.textContent = "⏸ Pause";
}

// Pause song
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶ Play";
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Prev song
prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong();
  playSong();
});

// Next song
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong();
  playSong();
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek in song
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto play next
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Update active playlist item
function updatePlaylistUI() {
  [...playlist.children].forEach((li, index) => {
    li.classList.toggle("active", index === currentSong);
  });
}

// Initial load
loadSong();
