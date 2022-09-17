const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

//construindo um array com o nome das imagens
const personagens =[
    'image01',
    'image02',
    'image03',
    'image04',
    'image05',
    'image06',
    'image07',
    'image08',
    'image09',
    'image10',
]

//função que cria o elemento com a classe
const criaElemento = (tag, className) => {
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
};

let primeiraCarta = '';
let segundaCarta = '';

const verificaFimDoJogo = () => {
    const cartasDesabilitadas = document.querySelectorAll('.disabled-card');

    if (cartasDesabilitadas.length === 20) {
        clearInterval(this.loop);

        setTimeout(() => {
            alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} `);
        }, 1000)
    }
}

const checkCards = () => {
    
    const primeiroPersonagem = primeiraCarta.getAttribute('data-character');
    const segundoPersonagem = segundaCarta.getAttribute('data-character');

    console.log(primeiroPersonagem, segundoPersonagem);

    if (primeiroPersonagem === segundoPersonagem) {
        primeiraCarta.firstChild.classList.add('disabled-card');
        segundaCarta.firstChild.classList.add('disabled-card');

        primeiraCarta = '';
        segundaCarta = '';

        verificaFimDoJogo();

    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('reveal-card');
            segundaCarta.classList.remove('reveal-card');

            primeiraCarta = '';
            segundaCarta = '';

        }, 1000);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(primeiraCarta === '') {
        target.parentNode.classList.add('reveal-card');
        primeiraCarta = target.parentNode;

    } else if (segundaCarta === '') {
        target.parentNode.classList.add('reveal-card');
        segundaCarta = target.parentNode;
    }

    checkCards();
}

//função que cria carta e as insere como filhas em card
const criaCarta = (personagem) => {
    const card = criaElemento('div', 'card');
    const front = criaElemento('div', 'face front');
    const back = criaElemento('div', 'face back');

    front.style.backgroundImage = `url('../assets/img/${personagem}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', personagem)

    return card;
}

const loadGame = () => {

    const duplicarPersonagens = [...personagens, ...personagens]
    const suffleArray = duplicarPersonagens.sort(() => Math.random() - 0.49);

    //cada elemento de ~personagens~ demos o nome no singular -> ~personagem~
    suffleArray.forEach((personagem) => {
        const card = criaCarta(personagem);
        grid.appendChild(card);

    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000)
}

//vamos executar alguma coisa quando a janela tiver carregada.
window.onload = () => {
    const userName = localStorage.getItem('user');
    spanPlayer.innerHTML = userName;
    startTimer();
    loadGame();
}

console.log(this);





