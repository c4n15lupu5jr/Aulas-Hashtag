const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');

const AbsoluteTerritory = {
    songName : 'Absolute Territory',
    artist : 'Ken Ashcorp',
    file: 'AbsoluteTerritory'
};

const Musica2 = {
    songName : 'blank',
    artist : 'blank',
    file: 'blank'
};

const Musica3 = {
    songName : 'blank',
    artist : 'blank',
    file: 'blank'
};
let isPlaying = false;
const playList = [AbsoluteTerritory, Musica2, Musica3];
let index = 0; 

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong(){
    cover.scr = `images/${playList[index].file}.png`;
    song.scr = `songs/${playList[index].file}.mp3`;
    songName.innerText = playList[index].songName;
    bandName.innerText = playList[index].artist;
}

function previousSong(){
    if(index === 0){ 
        index = playList.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === playList.length - 1){ 
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar(){
    song.currentTime
    song.duration
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

initializeSong();

play.addEventListener('click' , playPauseDecider);
previous.addEventListener('click' , previousSong);
next.addEventListener('click' , nextSong);
song.addEventListener('timeupdate' , updateProgressBar);
progressContainer.addEventListener('click' , jumpTo)