import Player from '@vimeo/player/src/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const LOCAL_KEY = 'videoplayer-current-time';
const player = new Player(iframe);

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime(evt) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(evt.seconds));
}

const getCurrentTime = JSON.parse(localStorage.getItem(LOCAL_KEY));

player.setCurrentTime(getCurrentTime);
