console.log("Welcome to Spotify");

// Initialize the variables.
let songIndex = 1;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let musicName = document.getElementById('musicname');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let previous = document.getElementById('previousSong');
let next = document.getElementById('nextSong');

 

// let songs = [
//     {songName : "Ajab Si - (Om Shanti Om)", filePath : "song/1.mp3", coverPath : "covers/1.jpg", "duration" : "04:03"},
//     {songName : "Dil Ibaadat - (Tum Mile)", filePath : "song/2.mp3", coverPath : "covers/2.jpg", "duration" : "05:29"},
//     {songName : "Khuda Jaane", filePath : "song/3.mp3", coverPath : "covers/3.jpg", "duration" : "05:33"},
//     {songName : "Kya Mujhe Pyar Hai - (Woh Lamhe)", filePath : "song/4.mp3", coverPath : "covers/4.jpg", "duration" : "04:12"},
//     {songName : "Pyaar-Ke-Pal", filePath : "song/5.mp3", coverPath : "covers/5.jpg", "duration" : "05:58"},
//     {songName : "Sajde", filePath : "song/6.mp3", coverPath : "covers/6.jpg", "duration" : "05:07"},
//     {songName : "Tu Hi Meri Shab Hai", filePath : "song/7.mp3", coverPath : "covers/7.jpg", "duration" : "06:29"},
//     {songName : "Zara Sa - (Jannat)", filePath : "song/8.mp3", coverPath : "covers/8.jpg", "duration" : "05:03"}
// ]
let songs = [
    {songName : "Ajab Si - (Om Shanti Om)", filePath : "1.mp3", coverPath : "1.jpg", "duration" : "04:03"},
    {songName : "Dil Ibaadat - (Tum Mile)", filePath : "2.mp3", coverPath : "2.jpg", "duration" : "05:29"},
    {songName : "Khuda Jaane", filePath : "3.mp3", coverPath : "3.jpg", "duration" : "05:33"},
    {songName : "Kya Mujhe Pyar Hai - (Woh Lamhe)", filePath : "4.mp3", coverPath : "4.jpg", "duration" : "04:12"},
    {songName : "Pyaar-Ke-Pal", filePath : "5.mp3", coverPath : "5.jpg", "duration" : "05:58"},
    {songName : "Sajde", filePath : "6.mp3", coverPath : "6.jpg", "duration" : "05:07"},
    {songName : "Tu Hi Meri Shab Hai", filePath : "7.mp3", coverPath : "7.jpg", "duration" : "06:29"},
    {songName : "Zara Sa - (Jannat)", filePath : "8.mp3", coverPath : "8.jpg", "duration" : "05:03"}
]


// const makeAllPlays = ()=>{
//     songItemPlay.forEach((element)=>{
//         element.classList.add('fa-play');
//         element.target.classList.remove('fa-pause');
//     })
// };

// songItemPlay.forEach((element)=>{
//     element.addEventListener('click', (e) => {
//         console.log(e.target);
//         makeAllPlays();
//         e.target.classList.add('fa-pause');
//         e.target.classList.remove('fa-play');
//     })
// })

const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
    })
}

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            console.log(e.target);
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `song/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
            musicName.style.opacity = 1;
            musicName.innerText = songs[songIndex-1].songName;
        }
        else{
            songIndex = parseInt(e.target.id);
            e.target.classList.add('fa-play');
            e.target.classList.remove('fa-pause');
            gif.style.opacity = 0;
            musicName.style.opacity = 0;
            masterPlay.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            audioElement.pause();
        }
    })
})


songItems.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('timestamp')[0].innerText = songs[i].duration;
});


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        musicName.style.opacity = 1;
        musicName.innerText = songs[songIndex-1].songName;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');
        gif.style.opacity = 0;
        musicName.style.opacity = 0;
        makeAllPlays();
    }
});

//Listen to Events:
audioElement.addEventListener('timeupdate', ()=>{

    // when songs timestamp gets updated we will update the progress bar
    // updating seekbar

    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    console.log(audioElement.currentTime);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// previous and next
next.addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex = 1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    musicName.style.opacity = 1;
    musicName.innerText = songs[songIndex-1].songName;
    makeAllPlays();
});

previous.addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 1;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    musicName.style.opacity = 1;
    musicName.innerText = songs[songIndex-1].songName;
    makeAllPlays();
});