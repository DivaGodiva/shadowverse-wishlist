/* global api */
'use strict';

const cards = document.getElementById('card-holder');
let dbCards = document.getElementById('db-info').innerHTML;

const cardCreator = function(imgUrl, nameUrl, imgId, dbId) {
  let img = document.createElement('IMG');
  let listEl = document.createElement('LI');
  let toolTip = document.createElement('SPAN');
  let addDiv = document.createElement('DIV');
  let editButton = document.createElement('BUTTON');
  let removeButton = document.createElement('BUTTON');
  img.setAttribute('src', `${imgUrl}`);
  img.setAttribute('class', 'card-picture');
  listEl.setAttribute('id', `${dbId}`);
  listEl.setAttribute('class', `card-display ${nameUrl}`);
  toolTip.setAttribute('id', `${imgId}`);
  toolTip.setAttribute('class', 'tooltip');
  addDiv.setAttribute('class', 'actions');
  editButton.innerHTML = 'Edit';
  removeButton.innerHTML = 'Del';
  addDiv.appendChild(editButton);
  addDiv.appendChild(removeButton);
  cards.appendChild(listEl);
  listEl.appendChild(img);
  listEl.appendChild(toolTip);
  listEl.appendChild(addDiv);
};

const toolTipCreator = function(json) {
  let stats;
  if (json.evoAtk > 0 || json.evoLife > 0) {
    stats = `${json.evoAtk} / ${json.evoLife}`;
  } else {
    stats = '';
  }
  let array = [json.skillDescription, stats, json.evoSkillDescription];
  let array2 = [];
  array.forEach(el => {
    if (el) {
      array2.push(el);
    } 
  });
  return array2;
};

const useCardCreator = function(vari, dbId) {
  cardCreator(vari.image, vari.name, vari.id, dbId);
  let descArray = toolTipCreator(vari);
  let desc = descArray.join('<br>');
  document.getElementById(vari.id).innerHTML = `${desc}`;
};

const renderListItemKey = function(vari, dbId) {
  useCardCreator(vari.data.card, dbId);
};

const getSequence = function() {
  let data = ('<%= data %>');
  api.details('/wishList')
    .then((response) => {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const loadingSequence = function() {
  let jsonArr = JSON.parse(dbCards);
  let dbIdObj = {};
  jsonArr.forEach(item => {
    dbIdObj[item.id] = item.cardId;
  });
  let objKeyList = Object.keys(dbIdObj);
  Promise.all(objKeyList.map(item => {
    let url = `https://shadowverse-portal.com/api/v1/card?format=json&card_id=${dbIdObj[item]}`;
    fetch(url)
      .then((resp) => resp.json())
      .then(function(myJson) {
        renderListItemKey(myJson, item);
      })
      .catch(function(error) {
        console.log(error);
      });
  }));
};

window.onload = function() {
  getSequence();
  loadingSequence();
};

cards.addEventListener('click', function(e) {
  e.preventDefault();
  let removeObj = {
    dbId: e.target.parentNode.parentNode.id
  };
  if (e.target.innerHTML === 'Del') {
    e.target.parentNode.parentNode.remove();
    api.remove('/wishList', removeObj)
      .catch(function(error) {
        console.log(error);
      });
    console.log('removed');
  }
});

cards.addEventListener('click', function(e) {
  e.preventDefault();
});