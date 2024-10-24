const loadingBar = document.getElementById('loadingBar');

document.addEventListener('DOMContentLoaded', () => {
    loadingBar.addEventListener('animationend', () => {
        window.location.href = "conheca_me.html";
    });
});