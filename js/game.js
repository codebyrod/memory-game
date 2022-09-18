const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const tableContent = document.querySelector('.table__content');
const headerGame = document.querySelector('.header__game');

//construindo um array com o nome das imagens
const characters = [
    'image01',
    // 'image02',
    /*     'image03',
    'image04',
    'image05',
    'image06',
    'image07',
    'image08',
    'image09',
    'image10', */
]

//função que cria o elemento com a classe
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let rankingPlayer = [];
let arrRank = [];

const addItemRank = () => {

    if(localStorage.ranking){
        arrRank = JSON.parse(localStorage.ranking);
    }
    // const [namePlayer, timerPlayer] = [spanPlayer.innerHTML, timer.innerHTML];
    
    rankingPlayer.push(spanPlayer.innerHTML, timer.innerHTML);
    arrRank.push(rankingPlayer);
    // localStorage.ranking = JSON.stringify(arrRank);
    localStorage.setItem('ranking', JSON.stringify(arrRank));
}

const checkEnd = () => {
    const disabledCard = document.querySelectorAll('.disabled-card');
    
    if (disabledCard.length === 2) {
        clearInterval(this.loop);
        
        setTimeout(() => {
            addItemRank();
            
            alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} `);
            window.location = 'ranking.html';
        }, 1000)

    }
}

let firstCard = '';
let secondCard = '';

const checkCards = () => {
    
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEnd();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 1000);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
    };

    checkCards();
}

//função que cria carta e as insere como filhas em card
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../assets/img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
};

const loadGame = () => {

    const doubleCharacters = [...characters, ...characters]
    const suffleArray = doubleCharacters.sort(() => Math.random() - 0.49);

    //cada elemento de ~characters~ demos o nome no singular -> ~personagem~
    suffleArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000)
};

//vamos executar alguma coisa quando a janela tiver carregada.
window.onload = () => {
    const userName = localStorage.getItem('user');
    spanPlayer.innerHTML = userName;

    startTimer();
    loadGame();
};

createRank = () => {
    arrRank = JSON.parse(localStorage.getItem('ranking')) ;
    arrRank.forEach((line) => {
        const tableLine = createElement('div', 'table__line');
        tableContent.appendChild(tableLine);
        
        line.forEach((text) => {
            const p = createElement('p', '');
            p.innerHTML = text;
            tableLine.appendChild(p);
        });
    }); 

    console.log(tableContent);
    return tableContent;
}


createRank();
