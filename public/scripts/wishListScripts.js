/* global api */
'use strict';

const cards = document.getElementById('card-holder');

const cardCreator = function(imgUrl, nameUrl, imgId) {
  let img = document.createElement('IMG');
  let listEl = document.createElement('LI');
  let toolTip = document.createElement('SPAN');
  let addDiv = document.createElement('DIV');
  let editButton = document.createElement('BUTTON');
  let removeButton = document.createElement('BUTTON');
  img.setAttribute('src', `${imgUrl}`);
  img.setAttribute('class', 'card-picture');
  listEl.setAttribute('id', `${nameUrl}`);
  listEl.setAttribute('class', 'card-display');
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

const useCardCreator = function(vari) {
  cardCreator(vari.image, vari.name, vari.id);
  let descArray = toolTipCreator(vari);
  let desc = descArray.join('<br>');
  document.getElementById(vari.id).innerHTML = `${desc}`;
};

const renderListItemKey = function(vari) {
  useCardCreator(vari.data.card);
};

let dbCards = document.getElementById('db-info').innerHTML;

window.onload = function() {
  let data = ('<%= data %>');
  api.details('/wishList')
    .then((response) => {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

window.onload = function() {
  let jsonArr = JSON.parse(dbCards);
  let arr = [];
  jsonArr.forEach(item => arr.push(item.cardId));
  arr.forEach(num => {
    let url = `https://shadowverse-portal.com/api/v1/card?format=json&card_id=${num}`;
    fetch(url)
      .then((resp) => resp.json())
      .then(function(myJson) {
        renderListItemKey(myJson);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  console.log(arr);
};

cards.addEventListener('click', function(e) {
  e.preventDefault();
});