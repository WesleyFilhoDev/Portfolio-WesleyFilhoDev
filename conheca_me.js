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
const healnet = document.getElementById('healnet');
const formulario = document.getElementById('formulario');
const jogo_senha = document.getElementById('jogo_senha');
const contato = document.getElementById('contato');
const btn_abrir_menu = document.getElementById('btn_abrir_menu');
const menu_mobile = document.getElementById('menu_mobile');
const overlay_menu = document.getElementById('overlay_menu');

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
    healnet.classList.toggle('dark')
    formulario.classList.toggle('dark');
    jogo_senha.classList.toggle('dark');
    contato.classList.toggle('dark');
});

btn_abrir_menu.addEventListener('click', () =>{
    menu_mobile.classList.add('abrir_menu')
});

menu_mobile.addEventListener('click', () =>{
    menu_mobile.classList.remove('abrir_menu')
});

overlay_menu.addEventListener('click', () =>{
    menu_mobile.classList.remove('abrir_menu')
});

