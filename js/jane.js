const bugs = {
  1: 'img/beetle.jpg',
  2: 'img/caterpillar.jpg',
  3: 'img/cicada.jpg',
  4: 'img/leafbug.jpg',
  5: 'img/mantis-hair.jpg',
  6: 'img/mantis-hand.jpg',
  7: 'img/mantis.jpg',
  8: 'img/moth.jpg',
};
const ids = Object.keys(bugs);
const cards = [...ids, ...ids];
const shuffle = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
};
let shuffledCards = shuffle(cards);
const body = document.body;
const board = document.getElementById('board');
const resetButton = document.getElementById('playagain');
resetButton.onclick = () => {
  body.classList.remove('Winner');
  selectedId = null;
  matched = [];
  shuffledCards = shuffle(cards);
  setupBoard(shuffledCards);
  unflipNonMatches();
};
let selectedId = null;
let matched = [];
const unflipNonMatches = () => {
  Array.from(document.getElementsByClassName('Card')).forEach(el => {
    if (!matched.includes(el.dataset.id)) {
      el.classList.remove('Card--flipped');
    }
  });
};
const checkForWin = () => {
  if(ids.sort().join(',') === matched.sort().join(',')) {
    setTimeout(() => {
      body.classList.add('Winner');
    }, 1000);
  }
};
const onCardClick = (event) => {
  const clickedId = event.currentTarget.dataset.id;
  event.currentTarget.classList.add('Card--flipped');
  if (selectedId) {
    if (selectedId === clickedId) {
      matched.push(selectedId);
      selectedId = null;
      checkForWin();
    } else {
      selectedId = null;
      setTimeout(unflipNonMatches, 1000);
    }
  } else {
    selectedId = clickedId;
  }
};
const setupBoard = (cards) => {
  board.innerHTML = '';
  cards.forEach(id => {
    const li = document.createElement('li');
    li.classList.add('Card');
    const cardInner = document.createElement('div');
    cardInner.classList.add('Card-inner');
    const cardFront = document.createElement('div');
    cardFront.classList.add('Card-front');
    const cardBack = document.createElement('div');
    cardBack.classList.add('Card-back');
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    li.appendChild(cardInner);
    cardBack.innerHTML = `<img src="${bugs[id]}" alt="${id}" />`;
    board.appendChild(li);
    li.onclick = onCardClick;
    li.dataset.id = id;
  });
};
setupBoard(shuffledCards);
