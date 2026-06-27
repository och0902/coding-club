let displayClock = document.getElementById('display-clock');

function setTime() {
   let time = new Date();
   let formattedTime = time.toLocaleString();
   displayClock.textContent = formattedTime;
};

setInterval(setTime, 1000);
