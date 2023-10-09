// import {Howl, Howler} from 'node_modules/howler';

let songs = {
     song1 : new Howl({
        id : 1,
        src: ["assets/Heeriye-Heeriye-Aa(PaglaSongs).mp3"],
        
      }),
};

let flag = false;


let btn = document.querySelector("button");

btn.addEventListener("click",()=>{
    
    
    songs.song1.playing() ? songs.song1.pause() : songs.song1.play();
    
})