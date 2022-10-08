
const play = `<img src="../images/tabir/video-play.png" alt="Play">`;
const pause = `<img src="../images/tabir/video-pause.png" alt="Play">`;

const playButton = document.querySelector('.tabir-video__play-button');
const video = document.getElementById('tabir-video');
const videoContainer = document.querySelector('.tabir__video');

playButton.addEventListener('click', function () {
    if (video.paused) {
        video.play();
        videoContainer.classList.add('playing');
        playButton.innerHTML = pause;
    } else {
        video.pause();
        videoContainer.classList.remove('playing');
        playButton.innerHTML = play;
    }
})
video.onended = function () {
    playButton.innerHTML = play;
}