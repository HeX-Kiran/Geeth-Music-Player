// import {Howl, Howler} from 'node_modules/howler';

let songs = {
     song1 : new Howl({
        
        src: ["assets/Heeriye-Heeriye-Aa(PaglaSongs).mp3"],
        
      }),

      song2: new Howl({
        src : ["assets/Zinda-Banda(PaglaSongs).mp3"],
        name:"kiran",
      })

      
};

let songArr = [
  {
  id :0,
  track : songs.song1,
  name:"Heeriye"

  },
  {
    id:1,
    track:songs.song2,
    name:"Zinda"
  }
]




let btn = document.querySelector("button");
let min  = document.querySelector(".min");
let sec  = document.querySelector(".sec");
let slider = document.querySelector(".seek_slider");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

let minCount = 0;
let secCount = 0;

let currSeek =0;
let currTrack = songArr[0]
let duration ;

let timer ;



// Button event lisnter to PAUSE/RESUME song
btn.addEventListener("click",()=>{
    
  currTrack.track.playing() ? currTrack.track.pause() : playMusic(currTrack,currSeek);
    
})

//event to move to next song
next.addEventListener("click",()=>{
  nextSong()
})

//event to move to prev song

prev.addEventListener("click",()=>{
  prevSong()
})


function playMusic(music){
  
  //Load Song
  loadSong();

  // Trigger when a song is played
  music.track.on("play",(e)=>{

        // Start music from the seeked or prefferd position using track.seek() gives the currTime in sec
        music.track.seek(currSeek,e);

        //Duration gives the overall duration of song in sec
        duration = music.track.duration(e);

        // if there is any previous timer remove it
        clearInterval(timer);
        

        //minCount gives the currMin with the help of seek function
        let seeks = music.track.seek(e);
        minCount =Math.floor(seeks/60);
        //secCount gives the currSec
        secCount = Math.floor(seeks-(minCount *60));
        
        //Updating dom
          min.innerHTML = minCount;
          sec.innerHTML =secCount;

          if(minCount<=9) min.innerHTML = '0' +minCount;
          if(secCount <= 9) sec.innerHTML = '0' +secCount;
        


        //Runs a timer in each sec and calculate the percentage
        timer = setInterval(updateTimer,1000)
  })

  //triggered when a song is paused

  music.track.on("pause",()=>{
    clearInterval(timer);
  })


  music.track.play();

  console.log(music.name);
 
  
}





// __________________________________Common Functions________________
// Slider event listner
slider.addEventListener("change",()=>{
  loadSong();
  currTrack.track.stop();
  console.log("Chnageed")
  currSeek = (slider.value /100) * duration; 
  console.log(currSeek);

  
  playMusic(currTrack,currSeek)
})

// Function to load the songs
function loadSong(){
  currTrack.track.load();
  duration = currTrack.track.duration();
}


// Main timer to update the time and slider
function updateTimer(){
  

  //Calculate the percentage using seek and duration ie currTime / totalTime
  let percentage = Math.floor((currTrack.track.seek()/duration)* 100) ;

  //update the slider value to calculated percentage
  slider.value = percentage
  

  //If we reach 99% percentage stop the timer
  if(percentage >= 99){
    
    clearInterval(timer);

    currSeek = 0;
    secCount = 0;
    minCount = 0;
      if(minCount<=9) min.innerHTML = '0' +minCount;
      if(secCount <= 9) sec.innerHTML = '0' +secCount;
  return ;

  } 

  // update the secCounter in every sec
  secCount++;

  //check if the sec is greater than 60 or not
  // if greater than 60 then update minCount by 1 and  make secCount as 0;
  if(secCount >60){
    minCount++;;
    secCount = 0;
  } 

  //Update the values of min and sec in the dom
  min.innerHTML = minCount;
  sec.innerHTML =secCount;

  if(minCount<=9) min.innerHTML = '0' +minCount;
  if(secCount <= 9) sec.innerHTML = '0' +secCount;
  currSeek = currTrack.track.seek();
}



// Function to play next song
function nextSong(){
  currTrack.track.stop();
  let index = currTrack.id;
  console.log("currIndex"+ index);
  index++;
  index = index % songArr.length;

  console.log("newIndex" + index);
  currTrack = songArr[index];
  currSeek = 0;
  playMusic(currTrack);
}


// Function to play prev song
function prevSong(){
  currTrack.track.stop();
  let index = currTrack.id;
  console.log("currIndex"+ index);
  index--;
  if(index < 0) index = songArr.length-1;
    
  index = index % songArr.length;

  console.log("newIndex" + index);

  currTrack = songArr[index];
  currSeek = 0;
  playMusic(currTrack);
}











