//import {Howl, Howler} from 'node_modules/howler';

let songs = {
  song1: new Howl({
    src: ["assets/songs/Heeriye-Heeriye-Aa(PaglaSongs).mp3"],
  }),

  song2: new Howl({
    src: ["assets/songs/Zinda-Banda(PaglaSongs).mp3"],
    name: "kiran",
  }),
};

let songArr = [
  {
    id: 0,
    track: songs.song2,
    name: "Zinda Banda",
  },
  {
    id: 1,
    track: songs.song1,
    name: "Heeriye",
  },
  
];


// Set card to rotate card during song play

let rotateCard = document.querySelector(".card-1 .card-content img");

// Get the music card attributes
let trackName = document.querySelectorAll(".track-name");
let trackIndex = document.querySelector(".index");
let sliderName = document.querySelector(".name")



let btn = document.querySelector(".play");
let minArr = document.querySelectorAll(".min");
let secArr = document.querySelectorAll(".sec");
let min = minArr[0];
let sec = secArr[0]

let sliderMin = minArr[1];
let sliderSec = secArr[1];

let slider = document.querySelector(".seek_slider");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

let minCount = 0;
let secCount = 0;

let currSeek = 0;
let currTrack = songArr[0];
let duration;

let timer;

// Default music card details
trackName[0].textContent = currTrack.name;
trackName[1].textContent = currTrack.name;
sliderName.textContent =currTrack.name;
trackIndex.textContent = "#" + (currTrack.id + 1);





// Button event lisnter to PAUSE/RESUME song
btn.addEventListener("click", () => {
  currTrack.track.playing()
    ? currTrack.track.pause()
    : playMusic(currTrack, currSeek);
});

//event to move to next song
next.addEventListener("click", () => {
  nextSong();
});

//event to move to prev song

prev.addEventListener("click", () => {
  prevSong();
});

function playMusic(music) {
  //Load Song
  loadSong();

  // Update the music card with the song details
  trackName[0].textContent = currTrack.name;
  trackName[1].textContent = currTrack.name;
  sliderName.textContent =currTrack.name;
  trackIndex.textContent = "#" + (currTrack.id+1);

  // Add animation
  rotateCard.classList.add("rotate-image");

  // Trigger when a song is played
  music.track.on("play", (e) => {
    // Start music from the seeked or prefferd position using track.seek() gives the currTime in sec
    music.track.seek(currSeek, e);

    //Duration gives the overall duration of song in sec
    duration = music.track.duration(e);

    // if there is any previous timer remove it
    clearInterval(timer);

    //minCount gives the currMin with the help of seek function
    let seeks = music.track.seek(e);
    minCount = Math.floor(seeks / 60);
    //secCount gives the currSec
    secCount = Math.floor(seeks - minCount * 60);

    //Updating dom
    min.innerHTML = minCount;
    sec.innerHTML = secCount;

    if (minCount <= 9) min.innerHTML = "0" + minCount;
    if (secCount <= 9) sec.innerHTML = "0" + secCount;

    //Runs a timer in each sec and calculate the percentage
    timer = setInterval(updateTimer, 1000);
  });

  //triggered when a song is paused

  music.track.on("pause", () => {
    rotateCard.classList.remove("rotate-image");
    clearInterval(timer);
  });

  music.track.play();

  console.log(music.name);
}

// __________________________________Common Functions________________
// Slider event listner
slider.addEventListener("change", () => {
  loadSong();
  currTrack.track.stop();
  console.log("Chnageed");
  currSeek = (slider.value / 100) * duration;
  console.log(currSeek);

  playMusic(currTrack, currSeek);
});

// Function to load the songs
function loadSong() {
  currTrack.track.load();
  duration = currTrack.track.duration();
}

// Main timer to update the time and slider
function updateTimer() {
  //Calculate the percentage using seek and duration ie currTime / totalTime
  let percentage = Math.floor((currTrack.track.seek() / duration) * 100);

  //update the slider value to calculated percentage
  slider.value = percentage;

  //If we reach 99% percentage stop the timer
  if (percentage >= 99) {
    clearInterval(timer);

    currSeek = 0;
    secCount = 0;
    minCount = 0;
    if (minCount <= 9) min.innerHTML = "0" + minCount;
    if (secCount <= 9) sec.innerHTML = "0" + secCount;
    if (minCount <= 9) sliderMin.innerHTML = "0" + minCount;
    if (secCount <= 9) sliderSec.innerHTML = "0" + secCount;

    // Remove animation
    rotateCard.classList.remove("rotate-image");
    return;
  }

  // update the secCounter in every sec
  secCount++;

  //check if the sec is greater than 60 or not
  // if greater than 60 then update minCount by 1 and  make secCount as 0;
  if (secCount > 60) {
    minCount++;
    secCount = 0;
  }

  //Update the values of min and sec in the dom
  min.innerHTML = minCount;
  sec.innerHTML = secCount;

  // Update sec and min slider time
  sliderMin.innerHTML = minCount;
  sliderSec.innerHTML = secCount;

  if (minCount <= 9) min.innerHTML = "0" + minCount;
  if (secCount <= 9) sec.innerHTML = "0" + secCount;
  if (minCount <= 9) sliderMin.innerHTML = "0" + minCount;
  if (secCount <= 9) sliderSec.innerHTML = "0" + secCount;
  currSeek = currTrack.track.seek();
}

// Function to play next song
function nextSong() {
  // Stop the current track
  currTrack.track.stop();

  // Remove Animation
  rotateCard.classList.remove("rotate-image");

  let index = currTrack.id;
  console.log("currIndex" + index);
  index++;
  index = index % songArr.length;

  console.log("newIndex" + index);
  currTrack = songArr[index];
  currSeek = 0;
  playMusic(currTrack);
}

// Function to play prev song
function prevSong() {
  // Stop the current Track
  currTrack.track.stop();
  // Stop Animation
  rotateCard.classList.remove("rotate-image");

  let index = currTrack.id;
  console.log("currIndex" + index);
  index--;
  if (index < 0) index = songArr.length - 1;

  index = index % songArr.length;

  console.log("newIndex" + index);

  currTrack = songArr[index];
  currSeek = 0;
  playMusic(currTrack);
}




// card-1 animation

let card1 = document.querySelector(".card-1");
let newCard;

card1.addEventListener("animationend", () => {
  card1.remove();
});

card1.addEventListener("click", () => {
  card1.classList.add("next-song");
  newCard = createCard();

  newCard.classList.add("new-card-next-song");
});

function createCard() {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `<div class="card-content">
              <img src="assets/images/track-1.png" alt="sound track" class="">
              <p class="song-name-heading primary-heading">${currTrack.name}</p>
              <div class="album">
                  <p class="secondary-heading">#${currTrack.id}</p>
                  <p class="secondary-heading">${currTrack.name}</p>
              </div>
              <div class="timer secondary-heading">
                  <span class="min">${minCount}</span> : <span class="sec">${secCount}</span>
              </div>
            </div>`;
            
  return div;
}


// Side bar menu icon functionality
let menuBtn = document.querySelector(".side-bar-menu");
let menuCloseBtn = document.querySelector(".brand-header .icon");

menuBtn.addEventListener("click",()=>{
  document.querySelector(".main-side-bar").classList.add("target")
})

menuCloseBtn.addEventListener("click",()=>{
  document.querySelector(".main-side-bar").classList.remove("target")
})
