'use strict';

const cards = document.getElementById('card-holder');

const list = document.querySelector('#crafts');

const cardCreator = function(imgUrl, nameUrl) {
  let img = document.createElement('IMG');
  let listEl = document.createElement('LI');
  let toolTip = document.createElement('SPAN');
  let addDiv = document.createElement('DIV');
  let addButton = document.createElement('BUTTON');
  img.setAttribute('src', `https://shadowverse-portal.com/image/card/en/C_${imgUrl}.png`);
  img.setAttribute('class', 'card-picture');
  listEl.setAttribute('id', `${nameUrl}`);
  listEl.setAttribute('class', 'card-display');
  toolTip.setAttribute('id', `${imgUrl}`);
  toolTip.setAttribute('class', 'tooltip');
  addDiv.setAttribute('class', 'action');
  addButton.innerHTML = 'Add';
  addDiv.appendChild(addButton);
  cards.appendChild(listEl);
  listEl.appendChild(img);
  listEl.appendChild(toolTip);
  listEl.appendChild(addDiv);
};

const cardDeletor = function() {
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
};

const renderList = function(vari, list) {
  const jsonObj = vari.data.cards;
  jsonObj.forEach(el => {
    list.push(el);
  });
};

const renderListItemClick = function(vari, list) {
  renderList(vari, list);
  list.forEach(el => {
    let stats;
    cardCreator(el.card_id, el.card_name);
    if (el.evo_atk > 0 || el.evo_life > 0) {
      stats = `${el.evo_atk} / ${el.evo_life}`;
    } else {
      stats = '';
    }
    document.getElementById(el.card_id).innerHTML = 
      `${el.skill_disc}<br>${stats}<br>${el.evo_skill_disc}`;
  });
};

const renderListItemKey = function(list) {
  list.forEach(el => {
    let stats;
    cardCreator(el.card_id, el.card_name);
    if (el.evo_atk > 0 || el.evo_life > 0) {
      stats = `${el.evo_atk} / ${el.evo_life}`;
    } else {
      stats = '';
    }
    document.getElementById(el.card_id).innerHTML = 
      `${el.skill_disc}<br>${stats}<br>${el.evo_skill_disc}`;
  });
};

let cardArray = [];

list.addEventListener('click', function(e) {
  e.preventDefault();
  cardDeletor();
  cardArray = [];
  if (e.target.tagName.toLowerCase() === 'img') { 
    const cardClass = e.target.parentNode.getAttribute('data-class');
    const URL = `https://shadowverse-portal.com/api/v1/cards?format=json&clan=${cardClass}`;
    fetch(URL) // , {mode: 'no-cors'}
      .then((resp) => resp.json())
      .then(function(myJson) {
        renderListItemClick(myJson, cardArray);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

cards.addEventListener('click', function(e) {
  e.preventDefault();

});

document.querySelector('.card-form').addEventListener('keyup', function(e) {
  e.preventDefault();
  cardDeletor();
  const inputVal = e.target.value.toLowerCase().trim();
  const regexp = new RegExp(inputVal, 'i');
  let array = cardArray.filter(item => regexp.test(item.card_name));
  renderListItemKey(array);
});

document.querySelector('.card-form').addEventListener('submit', function(e) {
  e.preventDefault();
});
