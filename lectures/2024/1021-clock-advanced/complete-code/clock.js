
// Clock

document.addEventListener('DOMContentLoaded', setTime);

const clock = document.getElementById('display-clock');

function setTime() {
   const date = new Date();
   const formattedDate = date.toLocaleString();
   clock.textContent = formattedDate;
   // if (date.toLocaleTimeString() === '오전 11:37:01') {
   //    alert("It's time to get up !");
   // };
};

setInterval(setTime,1000);



//  Stop watch

document.addEventListener('DOMContentLoaded', stopwatchReset);

const stopwatchHour = document.getElementById('stopwatch-hour');
const stopwatchMinute = document.getElementById('stopwatch-minute');
const stopwatchSecond = document.getElementById('stopwatch-second');
const stopwatchTenms = document.getElementById('stopwatch-tenms');

let swHour, swMinute, swSecond, swTenms;
let swInterval;

function stopwatch() {
   if (swHour < 10) {
      stopwatchHour.textContent = '0'+swHour;
   } else {
      stopwatchHour.textContent = swHour;
   };

   if (swMinute < 10) {
      stopwatchMinute.textContent = '0'+swMinute;
   } else {
      stopwatchMinute.textContent = swMinute;
   };

   if (swSecond < 10) {
      stopwatchSecond.textContent = '0'+swSecond;
   } else {
      stopwatchSecond.textContent = swSecond;
   };

   if (swTenms < 10) {
      stopwatchTenms.textContent = '0'+swTenms;
   } else {
      stopwatchTenms.textContent = swTenms;
   };

   swTenms = swTenms + 1;
   if (swTenms >= 100) {
      swSecond = swSecond + 1;
      if (swSecond >= 60) {
         swMinute = swMinute + 1;
         if (swMinute >= 60) {
            swHour = swHour + 1;
            swMinute = 0;
         };
         swSecond = 0;
      };
      swTenms = 0;
   };
};

function stopwatchStart() {
   swInterval = setInterval(stopwatch, 10);
};

function stopwatchStop() {
   clearInterval(swInterval);
};

function stopwatchReset() {
   swHour = 0; swMinute = 0; swSecond = 0; swTenms = 0;
   clearInterval(swInterval);

   stopwatchHour.textContent = '0'+swHour;
   stopwatchMinute.textContent = '0'+swMinute;
   stopwatchSecond.textContent = '0'+swSecond;
   stopwatchTenms.textContent = '0'+swTenms;
};




// Timer

document.addEventListener('DOMContentLoaded', timerReset);

const timerHour = document.getElementById('timer-hour');
const timerMinute = document.getElementById('timer-minute');
const timerSecond = document.getElementById('timer-second');
const timerTenms = document.getElementById('timer-tenms');

let tmrHour, tmrMinute, tmrSecond, tmrTenms;

function timerSet() {
   // event.preventDefault();
   
   tmrHour = document.getElementById('tmr-hour').value || 0;
   tmrMinute = document.getElementById('tmr-minute').value || 0;
   tmrSecond = document.getElementById('tmr-second').value || 0;
   tmrTenms = 99;

   if (tmrHour < 10) {
      timerHour.textContent = "0"+tmrHour;
   } else {
      timerHour.textContent = tmrHour;
   };

   if (tmrMinute < 10) {
      timerMinute.textContent = "0"+tmrMinute;
   } else {
      timerMinute.textContent = tmrMinute;
   };

   if (tmrSecond < 10) {
      timerSecond.textContent = "0"+tmrSecond;
   } else {
      timerSecond.textContent = tmrSecond;
   };

};

function timer() {

   if (tmrHour < 10) {
      timerHour.textContent = "0"+tmrHour;
   } else {
      timerHour.textContent = tmrHour;
   };

   if (tmrMinute < 10) {
      timerMinute.textContent = "0"+tmrMinute;
   } else {
      timerMinute.textContent = tmrMinute;
   };

   if (tmrSecond < 10) {
      timerSecond.textContent = "0"+tmrSecond;
   } else {
      timerSecond.textContent = tmrSecond;
   };
   
   if (tmrTenms < 10) {
      timerTenms.textContent = "0"+tmrTenms;
   } else {
      timerTenms.textContent = tmrTenms;
   };

   tmrTenms = tmrTenms - 1; 
   if (tmrTenms < 0) {
      if (tmrSecond <= 0) {
         if (tmrMinute <= 0) {
            if (tmrHour <= 0) {
               alert ('The time set on the timer has expired !!');
               timerStop();
               timerReset();
            };
            tmrHour = tmrHour - 1;
            tmrMinute = 60;
         };
         tmrMinute = tmrMinute - 1;
         tmrSecond = 60;
      };
      tmrSecond = tmrSecond - 1;
      tmrTenms = 99;
   };      

};

function timerStart() {
   if (!tmrHour && !tmrMinute && !tmrSecond) {
      alert ("Enter the setting value of the timer");
      return;
   };
   tmrInterval = setInterval(timer, 10);
};

function timerStop() {
   clearInterval(tmrInterval);
};

function timerReset() {
   timerHour.textContent = '00';
   timerMinute.textContent = '00';
   timerSecond.textContent = '00';
   timerTenms.textContent = '00';
};
