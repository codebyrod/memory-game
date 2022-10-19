const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const tableContent = document.querySelector('.table__content');
const headerGame = document.querySelector('.header__game');
const minute = document.querySelector('.minute');
const seconds = document.querySelector('.seconds');
const decimo = document.querySelector('.decimo');

const characters = [
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

let timerCount;

//função que cria o elemento com a classe
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let rankingPlayer;
let arrRank = [];

const addItemRank = () => {
    const data = new Date();
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const year = data.getFullYear();
    
    const currentDate = `${day}/${month}/${year}`

    const fullTimer = `${minute.innerHTML}:${seconds.innerHTML}:${decimo.innerHTML}`;
    
    if(localStorage.ranking){
        arrRank = JSON.parse(localStorage.ranking);
    }

    rankingPlayer = {medal: 'medal', player: spanPlayer.innerHTML, data: currentDate, timeRank: fullTimer};
    // rankingPlayer.push({medal: 'medal', player: spanPlayer.innerHTML, time: fullTimer});
    arrRank.push(rankingPlayer);
    localStorage.setItem('ranking', JSON.stringify(arrRank));
}


const checkEnd = () => {
    const disabledCard = document.querySelectorAll('.disabled-card');

        if (disabledCard.length === 20) {
            clearInterval(timerCount);

            setTimeout(() => {
                addItemRank();
                alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi de ${minute.innerHTML}:${seconds.innerHTML}:${decimo.innerHTML} `);
                window.location = 'ranking.html';
            }, 700);
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

const createCounter = () => {

    let min = 0;
    let sec = 0;
    let dec = 0;

    setInterval(() => {
        minute.innerHTML = min < 10 ? '0' + min : min;
        seconds.innerHTML = sec < 10 ? '0' + sec : sec;
        decimo.innerHTML = dec < 10 ? '0' + dec : dec;

        if(dec < 9) dec++;
        else if (sec < 59) {dec = 0; sec++}
        else if (min < 59) {dec = 0; sec = 0; min++}       
    }, 100);
}

//vamos executar alguma coisa quando a janela tiver carregada.
window.onload = () => {
    const userName = localStorage.getItem('user');
    spanPlayer.innerHTML = userName;

    createCounter();
    loadGame();
};

/* createRankItem = (tag, element) => {
    const item = createElement(tag, element);
    item.innerHTML = `${line}.${element}`;
    // `${tableLine}`.appendChild(item);
    return item;
} */

createRank = () => {
    const arrRankEnd = JSON.parse(localStorage.getItem('ranking'));
    const arrOrder = arrRankEnd.sort((a, b) => {
        return a.timeRank.localeCompare(b.timeRank);
    });
    
    arrOrder.forEach((line) => {
        const tableLine = createElement('div', 'table__line');
        tableContent.appendChild(tableLine);

        const medal = createElement('p', 'medal');
        medal.innerHTML = arrOrder.indexOf(line) + 1;
        tableLine.appendChild(medal);

        const player = createElement('p', 'player');
        player.innerHTML = line.player;
        tableLine.appendChild(player);

        const data = createElement('p', 'data');
        data.innerHTML = line.data;
        tableLine.appendChild(data);

        const timeRank = createElement('p', 'time__rank');
        timeRank.innerHTML = line.timeRank;
        tableLine.appendChild(timeRank);

        /* const timeRank = createRankItem('p', 'timeRank');
        tableLine.appendChild(timeRank); */
        
    });
}

createRank();

