const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');

const displayValue = document.getElementById('count');

let count = 0;


incrementBtn.addEventListener("click", () => {
    count++;
    displayValue.textContent = count;
})

decrementBtn.addEventListener("click", () => {
    count--;
    displayValue.textContent = count;
})