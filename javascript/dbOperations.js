
let songArr = [
  {
      id: 0,
      track: new Howl({
        src: 
        ["assets/songs/Zinda-Banda(PaglaSongs).mp3"],
      }),
      name: "Zinda Banda",
  },

  {
      id: 1,
      track: new Howl({
        src: ["assets/songs/Heeriye-Heeriye-Aa(PaglaSongs).mp3"],
        
      }),
      name: "Heeriye",
  },
  
];

let db ;
let initArr;

function initalDB(){

      // DB Operations

    const indexedDb = window.indexedDB||window.weblotIndexedDB||window.msIndexedDB||window.shimIndexedDB;

    console.log(indexedDb);

    // Create a database
    const request = indexedDb.open("Audio Database",1);

    // check for error

    request.onerror = function(e){
      console.log("Error Happened");
      console.log(e);
    }




    // On success event
    request.onsuccess =  function(e){
        db = e.target.result;
        console.log(db);
    }

    // Create Schema
    request.onupgradeneeded = function(e){
      console.log("Entered upgrade stage");
      const db = e.target.result;

      const objectStore = db.createObjectStore("Songs", {keyPath: "id", autoIncrement: true});

      // objectStore.createIndex("id", "id", { unique: true });

      // objectStore.transaction.oncomplete = (event) => {
      //   // Store values in the newly created objectStore.
      //   const customerObjectStore = db
      //     .transaction("Songs", "readwrite")
      //     .objectStore("Songs");
      //     customerObjectStore.add({name:"Zinda Banda",file :"Some file"});
      // };
    }


}







function saveSong(songDetails){

  console.log("Enetered Success");
  // db = request.result;

 const transaction = db.transaction("Songs","readwrite");

 const store = transaction.objectStore("Songs");
 
 console.log("Saved");

  let addReq = store.put(songDetails)
  
  addReq.onsuccess = (e)=>{
    console.log("new entry added for the object",songDetails);
  }
  addReq.onerror = ()=>{
    console.log("Error while adding entry");
  }
  
 
}

function getSong(id){
  const transaction = db.transaction("Songs","readwrite");

 const store = transaction.objectStore("Songs");
 console.log("read");

  let addReq = store.getAll()
  
  addReq.onsuccess = (e)=>{
    initArr = e.target.result;
    // console.log(initArr);
    initArr.forEach(obj=>{
      const base64Str = obj.file;
      const contentType = "audio/mp3";
      const sound = new Howl({
        src: [`data:${contentType};base64,${base64Str}`]
      });
    
      songArr.push({id:songArr[songArr.length-1].id+1,track:sound,name:obj.name})
    
    })
  }
  addReq.onerror = ()=>{
    console.log("Error while adding entry");
  }
}

initalDB();

setTimeout(getSong,1000);






















