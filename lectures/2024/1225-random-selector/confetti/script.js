const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
   confetti({ particleCount: 1000, spread: 360, origin: { y: 0.35 }, decay: 0.93, });
});