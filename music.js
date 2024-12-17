document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
});

const playlist = [
    { title: "Study Beats", artist: "Lo-Fi Dreamer", src: "https://example.com/study-beats.mp3", cover: "https://example.com/study-beats-cover.jpg" },
    { title: "Focus Flow", artist: "Ambient Minds", src: "https://example.com/focus-flow.mp3", cover: "https://example.com/focus-flow-cover.jpg" },
    { title: "Coding Rhythm", artist: "Synth Coder", src: "https://example.com/coding-rhythm.mp3", cover: "https://example.com/coding-rhythm-cover.jpg" }
];

let currentTrack = 0;
let isPlaying = false;
let audio;

function initMusicPlayer() {
    audio = new Audio(playlist[currentTrack].src);
    updateTrackInfo();
    
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
    document.getElementById('nextBtn').addEventListener('click', playNext);
    document.getElementById('prevBtn').addEventListener('click', playPrevious);
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', playNext);
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        isPlaying = true;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function playNext() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack();
}

function playPrevious() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack();
}

function loadTrack() {
    audio.src = playlist[currentTrack].src;
    updateTrackInfo();
    if (isPlaying) {
        audio.play();
    }
}

function updateTrackInfo() {
    document.getElementById('songTitle').textContent = playlist[currentTrack].title;
    document.getElementById('artistName').textContent = playlist[currentTrack].artist;
    document.getElementById('albumArt').src = playlist[currentTrack].cover;
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}
