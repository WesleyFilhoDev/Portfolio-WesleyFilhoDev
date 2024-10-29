const buttom = document.getElementById('buttom');
const buttom_mode = document.getElementById('buttom_mode');
const body = document.querySelector('body');
const h1 =  document.querySelector('h1');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');
const p4 = document.getElementById('p4');
const p5 = document.getElementById('p5');
const p6 = document.getElementById('p6');
const title_trabalho = document.getElementById('title_trabalho');
const contato = document.getElementById('contato');

buttom_mode.addEventListener('click', () =>{
    buttom_mode.classList.toggle('dark');
    body.classList.toggle('dark');
    h1.classList.toggle('dark');
    p1.classList.toggle('dark');
    p2.classList.toggle('dark');
    p3.classList.toggle('dark');
    p4.classList.toggle('dark');
    p5.classList.toggle('dark');
    p6.classList.toggle('dark');
    title_trabalho.classList.toggle('dark');
    contato.classList.toggle('dark');
});

