const hoursInput = document.querySelector('#hours-input');
const minutesInput = document.querySelector('#minutes-input');
const secondsInput = document.querySelector('#seconds-input');
const startButton = document.querySelector('#start-btn');
const resetButton = document.querySelector('#reset-btn');
const timerDisplay = document.querySelector('#timer-display');

let countdown;

function timer(seconds) {
    const endTime = Date.now() + seconds * 1000;

    localStorage.setItem('endTime', endTime);

    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            countdown = null;
            alert('Timer Finished!');
            localStorage.removeItem('endTime');
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
    if (countdown) {
      return;
    }
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (hours >= 0 && minutes >= 0 && seconds >= 0) {
        localStorage.setItem('hours', hours);
        localStorage.setItem('minutes', minutes);
        localStorage.setItem('seconds', seconds);
        timer((hours * 3600) + (minutes * 60) + seconds);
    } else {
        alert('Please enter valid time!');
    }
});

resetButton.addEventListener('click', () => {
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    timerDisplay.textContent = '00:00:00';
    clearInterval(countdown);
    countdown = null;
    localStorage.removeItem('endTime');
    localStorage.removeItem('hours');
    localStorage.removeItem('minutes');
    localStorage.removeItem('seconds');
});

window.addEventListener('load', () => {
    const savedHours = parseInt(localStorage.getItem('hours')) || 0;
    const savedMinutes = parseInt(localStorage.getItem('minutes')) || 0;
    const savedSeconds = parseInt(localStorage.getItem('seconds')) || 0;
    const savedEndTime = parseInt(localStorage.getItem('endTime'));

    if (savedEndTime) {
        const timeLeft = Math.round((savedEndTime - Date.now()) / 1000);
        if (timeLeft >= 0) {
            hoursInput.value = savedHours;
            minutesInput.value = savedMinutes;
            secondsInput.value = savedSeconds;
            timer(timeLeft);
        } else {
            localStorage.removeItem('endTime');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var themeSelector = document.getElementById('theme-selector');
  
    themeSelector.addEventListener('change', function() {
  
      // Remove the existing theme class from the body
      document.body.classList.remove('theme-default', 'theme-dark');
  
      // Add the selected theme class to the body
      document.body.classList.add(this.value);
  
      // Save the selected theme in local storage
      localStorage.setItem('selectedTheme', this.value);
    });
  
    // Load the saved theme from local storage (if any)
    var savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      // Remove the current theme from the body
      document.body.classList.remove('theme-default', 'theme-dark');
  
      // Add the saved theme class to the body
      document.body.classList.add(savedTheme);
  
      // Set the dropdown menu's value to the saved theme
      themeSelector.value = savedTheme;
    }
  });
