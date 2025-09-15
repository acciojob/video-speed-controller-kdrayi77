// Get elements
const player = document.querySelector('.player');
const video = player ? player.querySelector('.player__video') : null;
const toggle = player ? player.querySelector('.toggle') : null;
const skipButtons = player ? player.querySelectorAll('[data-skip]') : [];
const ranges = player ? player.querySelectorAll('.player__slider') : [];
const progress = player ? player.querySelector('.progress') : null;
const progressBar = player ? player.querySelector('.progress__filled') : null;

// Functions
function togglePlay() {
  if (video && video.paused) {
    video.play();
  } else if (video) {
    video.pause();
  }
}

function updateButton() {
  if (toggle && video) {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
  }
}

function skip() {
  if (video) {
    video.currentTime += parseFloat(this.dataset.skip);
  }
}

function handleRangeUpdate() {
  if (video) {
    video[this.name] = this.value;
  }
}

function handleProgress() {
  if (video && progressBar) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }
}

function scrub(e) {
  if (video && progress) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
}

// Event listeners
if (video) {
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);
}

if (toggle) {
  toggle.addEventListener('click', togglePlay);
}

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mousedown = false;
if (progress) {
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
}
