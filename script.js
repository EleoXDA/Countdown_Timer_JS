const hoursInput = document.querySelector('#hours-input');
const minutesInput = document.querySelector('#minutes-input');
const secondsInput = document.querySelector('#seconds-input');
const startButton = document.querySelector('#start-btn');
const timerDisplay = document.querySelector('#timer-display');

let countdown;

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 0) {
            clearInterval(countdown);
            alert('Timer Finished!');
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;

    const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    if (hours >= 0 && minutes >= 0 && seconds >= 0) {
        timer((hours * 3600) + (minutes * 60) + seconds);
    } else {
        alert('Please enter valid time!');
    }
});
