/* global api */
'use strict';

const cards = document.getElementById('cards');
const high = document.getElementById('high');
const low = document.getElementById('low');
let dbCards = document.getElementById('db-info').innerHTML;

const priorityCreator = function() {
  let jsonArr = JSON.parse(dbCards);
  let obj = {};
  jsonArr.forEach(item => {
    obj[item.id] = item.priority;
  });
  return obj;
};

const cardCreator = function(imgUrl, nameUrl, imgId, dbId, pri) {
  let priority = pri[dbId];
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
  editButton.innerHTML = 'Switch';
  removeButton.innerHTML = 'Delete';
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

const useCardCreator = function(vari, dbId, pri) {
  cardCreator(vari.image, vari.name, vari.id, dbId, pri);
  let descArray = toolTipCreator(vari);
  let desc = descArray.join('<br>');
  document.getElementById(vari.id).innerHTML = `${desc}`;
};

const renderListItemKey = function(vari, dbId, pri) {
  useCardCreator(vari.data.card, dbId, pri);
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
  let priority = priorityCreator();
  Promise.all(objKeyList.map(item => {
    let url = `https://shadowverse-portal.com/api/v1/card?format=json&card_id=${dbIdObj[item]}`;
    fetch(url)
      .then((resp) => resp.json())
      .then(function(myJson) {
        renderListItemKey(myJson, item, priority);
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
  if (e.target.innerHTML === 'Delete') {
    e.target.parentNode.parentNode.remove();
    api.remove('/wishList', removeObj)
      .catch(function(error) {
        console.log(error);
      });
    console.log('removed');
  } 
});


cards.addEventListener('click', function(e) {
  let editObj = {
    dbId: e.target.parentNode.parentNode.id,
    pri: '',
  };
  if (e.target.innerHTML === 'Switch' && e.target.parentNode.parentNode.parentNode.id === 'high') {
    editObj.pri = 'low';
  }
  if (e.target.innerHTML === 'Switch' && e.target.parentNode.parentNode.parentNode.id === 'low') {
    editObj.pri = 'high';
  }
  console.log(editObj);
  if (e.target.innerHTML === 'Switch') {
    api.update('/wishList', editObj)
      .catch(function(error) {
        console.log(error);
      });
    console.log('switched');
  }
});

// cards.addEventListener('change', function(e) {
//   const cardObj = {
//     cardId: e.target.parentNode.parentNode.childNodes[1].id,
//     priority: e.target.value
//   };
//   if (e.target.tagName === 'SELECT') {
//     api.create('/cardSearch', cardObj)
//       .catch(function(error) {
//         console.log(error);
//       });
//     console.log('added');
//   }
// });


cards.addEventListener('click', function(e) {
  e.preventDefault();
});