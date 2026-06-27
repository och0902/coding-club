

// Clock

let displayClock = document.getElementById('display-clock');

function setTime() {
   let time = new Date();
   let formattedTime = time.toLocaleString();
   displayClock.textContent = formattedTime;
};

setInterval(setTime, 1000);



//  Stop watch

// Timer

let setHour = 0;
let setMinute = 0;
let setSecond = 0;
let setTenms = 0;

let timerHour = document.getElementById("timer-hour");
let timerMinute = document.getElementById("timer-minute");
let timerSecond = document.getElementById("timer-second");
let timerTenms = document.getElementById("timer-tenms");

function timerSet() {
   setHour = document.getElementById("tmr-hour").value;
   setMinute = document.getElementById("tmr-minute").value;
   setSecond = document.getElementById("tmr-second").value;
   setTenms = 99; 

   timerHour.textContent = setHour;
   timerMinute.textContent = setMinute;
   timerSecond.textContent = setSecond;
};

function timer() {
   setTenms = setTenms - 1;
   if (setTenms < 0) {
      setSecond = setSecond - 1;
      timerSecond.textContent = setSecond;
      setTenms = 99;
   };
   if (setTenms < 10) {
      timerTenms.textContent = '0'+setTenms;
   } else {
      timerTenms.textContent = setTenms;
   };
};

function timerStart() {
   setInterval(timer, 10);
};