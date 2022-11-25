const bugs = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
};
const ids = Object.keys(bugs);
const cards = [...ids, ...ids];
const shuffledCards = cards
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
const board = document.getElementById('board');
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
      board.innerHTML = '<h1 class="YouWin">You<br>win!</h1>';
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
shuffledCards.forEach(id => {
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
  cardBack.innerText = bugs[id];
  board.appendChild(li);
  li.onclick = onCardClick;
  li.dataset.id = id;
});

