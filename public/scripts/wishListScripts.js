/* global api */
'use strict';

const cards = document.getElementById('cards');
const high = document.getElementById('high');
const low = document.getElementById('low');
let dbCards = document.getElementById('db-info').innerHTML;

const cardCreator = function(vari, imgUrl, nameUrl, imgId, pri, dbId) {
  let descArray = toolTipCreator(vari);
  let desc = descArray.join('<br>');
  let priority = pri;
  let img = document.createElement('IMG');
  let listEl = document.createElement('LI');
  let toolTip = document.createElement('SPAN');
  let addDiv = document.createElement('DIV');
  let editButton = document.createElement('BUTTON');
  let removeButton = document.createElement('BUTTON');
  img.setAttribute('src', `${imgUrl}`);
  img.setAttribute('class', 'card-picture');
  img.setAttribute('alt', `${nameUrl}`);
  listEl.setAttribute('id', `${dbId}`);
  listEl.setAttribute('class', `card-display ${nameUrl}`);
  toolTip.setAttribute('id', `${imgId}`);
  toolTip.setAttribute('class', 'tooltip');
  toolTip.innerHTML = `${desc}`;
  addDiv.setAttribute('class', 'actions');
  editButton.innerHTML = 'SWAP';
  removeButton.innerHTML = 'DROP';
  addDiv.appendChild(editButton);
  addDiv.appendChild(removeButton);
  if (priority === 'high') {
    high.appendChild(listEl);
  }
  if (priority === 'low') {
    low.appendChild(listEl);
  }
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

const useCardCreator = function(vari, pri, dbId) {
  cardCreator(vari, vari.image, vari.name, vari.id, pri, dbId);
};

const getSequence = function() {
  let data = ('<%= data %>');
  api.details('/wishList')
    .catch(function(error) {
      console.log(error);
    });
};

const loadingSequence = function() {
  let jsonArr = JSON.parse(dbCards);
  let dbIdObj = {};
  jsonArr.forEach(item => {
    dbIdObj[item.id] = {
      id: item.cardId,
      priority: item.priority
    };
  });
  const promises = Object.values(dbIdObj).map(item => {
    let url = `/api/card/${item.id}`;
    return fetch(url)
      .then(resp => resp.json());
  });
  return Promise.all(promises)
    .then((resp) => {
      resp.forEach((r, i) => {
        let parsedJson = JSON.parse(r).data.card;
        let priority = dbIdObj[Object.keys(dbIdObj)[i]].priority;
        let dbId = Object.keys(dbIdObj)[i];
        useCardCreator(parsedJson, priority, dbId);
      });
    });
};

const prioritySwapper = function(element) {
  let editObj = {
    dbId: element.target.parentNode.parentNode.id,
    pri: '',
  };
  if (element.target.innerHTML === 'SWAP' && element.target.parentNode.parentNode.parentNode.id === 'high') {
    editObj.pri = 'low';
  }
  if (element.target.innerHTML === 'SWAP' && element.target.parentNode.parentNode.parentNode.id === 'low') {
    editObj.pri = 'high';
  }
  return editObj;
};

const swapAppender = function(element, obj) {
  let switchTarget = element.target.parentNode.parentNode.cloneNode(true);
  if (obj.pri === 'high') {
    high.appendChild(switchTarget);
  }
  if (obj.pri === 'low') {
    low.appendChild(switchTarget);
  }
  element.target.parentNode.parentNode.remove();
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
  if (e.target.innerHTML === 'DROP') {
    e.target.parentNode.parentNode.remove();
    api.remove('/wishList', removeObj)
      .catch(function(error) {
        console.log(error);
      });
    console.log('removed');
  } 
});

cards.addEventListener('click', function(e) {
  let updObj = prioritySwapper(e);
  if (e.target.innerHTML === 'SWAP') {
    api.update('/wishList', updObj)
      .catch(function(error) {
        console.log(error);
      });
    console.log('switched');
    swapAppender(e, updObj);
  }
});

cards.addEventListener('click', function(e) {
  e.preventDefault();
});