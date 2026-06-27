let result = '';
const inputs = document.getElementsByTagName('input');
const display = document.getElementById('display');

for (a of inputs) (
   a.addEventListener('click', function (event) {
      if ( event.target.value === 'AC' ) {
         result = '';
         display.value = '0';
         return;
      };
      
      if ( event.target.value === 'CE' ) {
         result = result.slice(0, -1);
         if ( result === '' ) {
            display.value = '0';
            return;
         };
         display.value = result;
         return;
      };
      
      if ( event.target.value === '=' ) {
         result = eval(result);
         display.value = result;
         result = '';
         return;
      };
      
      result += event.target.value;
      display.value = result;
   })
);
