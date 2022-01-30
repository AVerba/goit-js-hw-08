import throttle from 'lodash.throttle';
const iframeRef = document.querySelector('#vimeo-player');
const localPlayer = new Vimeo.Player(iframeRef);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const saveTimeHandler=(ev)=>{
    const commonTime=ev.seconds;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(commonTime));
 
    if (commonTime === ev.duration) {
      localPlayer.off('timeupdate');
      localStorage.removeItem(LOCALSTORAGE_KEY);
    }    
}
const playOnTimeHandler=()=>{
    localPlayer.on('timeupdate', throttle(saveTimeHandler, 1000));
}

localPlayer.on('play', playOnTimeHandler);
localPlayer.on('timeupdate', throttle(saveTimeHandler, 1000));

const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
const playTime = JSON.parse(savedTime);
localPlayer.setCurrentTime(playTime);
