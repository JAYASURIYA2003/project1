let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlicon = document.getElementById("ctrlicon");
let start = document.querySelector("p.start")
let end = document.querySelector("p.end")
let title=document.querySelector(".text")
let artist=document.querySelector(".para")
let image=document.querySelector(".music-image")
let interval;
let songDuration;
let currentSongIndex = 0;
let songs=[
    {
        title:"Aathadi",
        artist:"GV prakash Natpe Thunai",
        file:"Aathadi.mp3",
        image:"Natpe-thunai.png"
    },
    {
        title:"Kerala",
        artist:"GV prakash Natpe Thunai",
        file:"Kerala.mp3",
        image:"Natpe-thunai.png"
    },
    {
        title:"Adada",
        artist:"GV prakash Natpe Thunai",
        file:"Adada.mp3",
        image:"Natpe-thunai.png"  
    },
    {
        title:"Music",
        artist:"GV prakash Natpe Thunai",
        file:"music.mp3" ,
        image:"music.png" 
    },
    {
        title:"Anegan",
        artist:"GV prakash Anegan",
        file:"anegan.mp3" ,
        image:"anegan.jpg" 
    },

];
function loadSong(index) {
    let songData = songs[index];
    song.src = songData.file;
    title.textContent = songData.title;
    artist.textContent = songData.artist;
    image.src=songData.image;
    song.load();
    playSong();
}
let formatTime = (time) => {
    // console.log(time);

    let totalseconds = time
    let minutes = Math.floor(totalseconds / 60).toString(10).padStart(2, "0")
    let seconds = (Math.floor(totalseconds) % 60).toString(10).padStart(2, "0")
    return `${minutes}:${seconds}`
}
song.onloadeddata = function () {
    progress.min = 0
    songDuration = song.duration
    progress.max = song.duration;
    progress.value = song.currentTime;
    end.textContent = formatTime(song.duration)
}
function playSong() {
    song.play();
    interval = setInterval(() => {
        progress.value = song.currentTime
        let duration = song.currentTime >= songDuration ? songDuration : song.currentTime
        start.textContent = formatTime(duration)
    }, 500)
}
function pauseSong() {
    song.pause();
    clearInterval(interval)
}
function playPause() {
    if (ctrlicon.classList.contains("fa-pause")) {
        pauseSong()
        ctrlicon.classList.add("fa-play");
        ctrlicon.classList.remove("fa-pause")
    }
    else if (ctrlicon.classList.contains("fa-play")) {
        playSong()
        ctrlicon.classList.add("fa-pause");
        ctrlicon.classList.remove("fa-play")
    }
}
// if (!song.paused) {
//     setInterval(() => {
//         progress.value = song.currentTime;
//     }, 500);
// }
progress.oninput = function () {
    song.currentTime = progress.value;
}
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}
song.onended = function () {
    nextSong();
};
loadSong(currentSongIndex);

