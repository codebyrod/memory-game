const grid = document.querySelector('.grid');

const criaElemento = (tag, className) => {
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
};

const criaCarta = () => {
    const card = criaElemento('div', 'card');
    const front = criaElemento('div', 'face front');
    const back = criaElemento('div', 'face back');

    card.appendChild(front);
    card.appendChild(back);

    return card;
}

criaCarta();




