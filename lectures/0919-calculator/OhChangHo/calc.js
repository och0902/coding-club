let ex = '';
const inputArray = document.getElementsByTagName('input');
const dsp = document.getElementById('display');

for ( inputEach of inputArray ) {
   inputEach.addEventListener("click", function (event) {
      if (event.target.value === '=') {
         const result = eval(ex);
         dsp.value = result;
         return;
      };
      ex = ex + event.target.value;
      dsp.value = ex;
   })
}
