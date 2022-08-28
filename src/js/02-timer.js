import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerFace = document.querySelector('#datetime-picker');
const daysFace = document.querySelector('span[data-days]');
const hoursFace = document.querySelector('span[data-hours]');
const minutesFace = document.querySelector('span[data-minutes]');
const secondsFace = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

let finishTime = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    dateFormat: "H:i d-m-Y",
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        finishTime = selectedDates[0];
        if (finishTime < Date.now()) {
            // window.alert("Please choose a date in the future")
            Notify.failure('Please choose a date in the future',
            {
                clickToClose: true,
                timeout: 1500,
                showOnlyTheLastOne: true,
                }
            );
        } else {
            startBtn.disabled = false;
            console.log(selectedDates[0]);
        }
        return finishTime;
    },
  };

flatpickr(timerFace, options);

startBtn.addEventListener('click',() => {
    timer.start();
})

const timer = {
    isActive: false,
    start(){
        startBtn.disabled = true;
        
        if (this.isActive) {
            return;
        }

       this.isActive= true;

       const timertId = setInterval(() => {
            
            const currentTime = Date.now();  
            const deltaTime = (finishTime - currentTime);
            const time = convertMs(deltaTime);

            updateClockFace(time);
            
            if (deltaTime <= 0) {
                clearInterval(timertId);
                timerFace.value = 'The end';
                daysFace.textContent = '00';
                hoursFace.textContent = '00';
                minutesFace.textContent = '00';
                secondsFace.textContent = '00';

              } 
        }, 1000);
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
    return String(value).padStart(2,'0')
}

function updateClockFace({ days, hours, minutes, seconds }) {
    timerFace.value =`${days}:${hours}:${minutes}:${seconds}`;
    daysFace.textContent = `${days}`;
    hoursFace.textContent = `${hours}`;
    minutesFace.textContent = `${minutes}`;
    secondsFace.textContent = `${seconds}`;
}