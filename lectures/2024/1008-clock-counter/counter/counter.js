let number = 0;

let display = document.getElementById('display');
display.textContent = number;

function increase () {
   number = number + 1;
   display.textContent = number;
};

function reset () {
   number = 0;
   display.textContent = number;
};

function decrease () {
   if( number > 0) {
      number = number - 1;
      display.textContent = number;
   };      
};