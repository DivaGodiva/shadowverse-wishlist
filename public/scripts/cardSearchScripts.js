/* global api */
'use strict';

const cards = document.getElementById('card-holder');
const list = document.querySelector('#crafts');

const cardCreator = function(imgUrl, nameUrl) {
  let img = document.createElement('IMG');
  let listEl = document.createElement('LI');
  let toolTip = document.createElement('SPAN');
  let addDiv = document.createElement('DIV');
  let addButton = document.createElement('SELECT');
  let optionUno = document.createElement('OPTION');
  let optionDos = document.createElement('OPTION');
  let optionTres = document.createElement('OPTION');
  img.setAttribute('src', `https://shadowverse-portal.com/image/card/en/C_${imgUrl}.png`);
  img.setAttribute('class', 'card-picture');
  listEl.setAttribute('id', `${nameUrl}`);
  listEl.setAttribute('class', 'card-display');
  toolTip.setAttribute('id', `${imgUrl}`);
  toolTip.setAttribute('class', 'tooltip');
  addDiv.setAttribute('class', 'actions');
  addButton.setAttribute('id', 'scroll-select');
  optionUno.setAttribute('value', '');
  optionUno.setAttribute('disabled', 'disabled');
  optionUno.setAttribute('selected', 'selected');
  optionUno.setAttribute('hidden', 'hidden');
  optionUno.innerHTML = 'Add!';
  optionDos.setAttribute('value', 'high');
  optionDos.innerHTML = 'High';
  optionTres.setAttribute('value', 'low');
  optionTres.innerHTML = 'Low';
  addButton.appendChild(optionUno);
  addButton.appendChild(optionDos);
  addButton.appendChild(optionTres);
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
  const jsonObj = JSON.parse(vari).data.cards;
  jsonObj.forEach(el => {
    list.push(el);
  });
};

const toolTipCreator = function(json) {
  let stats;
  if (json.evo_atk > 0 || json.evo_life > 0) {
    stats = `${json.evo_atk} / ${json.evo_life}`;
  } else {
    stats = '';
  }
  let array = [json.skill_disc, stats, json.evo_skill_disc];
  let array2 = [];
  array.forEach(el => {
    if (el) {
      array2.push(el);
    } 
  });
  return array2;
};

const useCardCreator = function(vari) {
  vari.forEach(el => {
    cardCreator(el.card_id, el.card_name);
    let descArray = toolTipCreator(el);
    let desc = descArray.join('<br>');
    document.getElementById(el.card_id).innerHTML = `${desc}`;
  });
};

const renderListItemClick = function(vari, list) {
  renderList(vari, list);
  useCardCreator(list);
};

const renderListItemKey = function(list) {
  useCardCreator(list);
};

let cardArray = [];

list.addEventListener('click', function(e) {
  e.preventDefault();
  cardDeletor();
  cardArray = [];
  if (e.target.tagName.toLowerCase() === 'img') { 
    const cardClass = e.target.parentNode.getAttribute('data-class');
    const URL = `/api/cards/${cardClass}`;
    fetch(URL)
      .then((resp) => resp.json())
      .then(function(myJson) {
        renderListItemClick(myJson, cardArray);
        document.getElementById('disable-search').disabled = false;
        document.getElementById('disable-search').classList.remove('grey-search');
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    document.getElementById('disable-search').disabled = true;
    document.getElementById('disable-search').classList.add('grey-search');
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

cards.addEventListener('change', function(e) {
  const cardObj = {
    cardId: e.target.parentNode.parentNode.childNodes[1].id,
    priority: e.target.value
  };
  if (e.target.tagName === 'SELECT') {
    api.create('/cardSearch', cardObj)
      .catch(function(error) {
        console.log(error);
      });
    console.log('added');
  }
});
