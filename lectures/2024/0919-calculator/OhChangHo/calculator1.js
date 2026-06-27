
let ex = "";
const inputArray = document.getElementsByTagName(`input`)
for ( inputEach of inputArray) {
    inputEach.addEventListener("click", function (event) {
        ex = ex + event.target.value;
        console.log(ex);
    })
}