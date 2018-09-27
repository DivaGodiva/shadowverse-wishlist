/* global api */
'use strict';

// const cards = document.getElementById('card-holder');

// const cardCreator = function(imgUrl, nameUrl) {
//   let img = document.createElement('IMG');
//   let listEl = document.createElement('LI');
//   let toolTip = document.createElement('SPAN');
//   let addDiv = document.createElement('DIV');
//   let addButton = document.createElement('BUTTON');
//   img.setAttribute('src', `https://shadowverse-portal.com/image/card/en/C_${imgUrl}.png`);
//   img.setAttribute('class', 'card-picture');
//   listEl.setAttribute('id', `${nameUrl}`);
//   listEl.setAttribute('class', 'card-display');
//   toolTip.setAttribute('id', `${imgUrl}`);
//   toolTip.setAttribute('class', 'tooltip');
//   addDiv.setAttribute('class', 'actions');
//   addButton.innerHTML = 'Add';
//   addDiv.appendChild(addButton);
//   cards.appendChild(listEl);
//   listEl.appendChild(img);
//   listEl.appendChild(toolTip);
//   listEl.appendChild(addDiv);
// };

// const cardDeletor = function() {
//   while (cards.firstChild) {
//     cards.removeChild(cards.firstChild);
//   }
// };

// const renderList = function(vari, list) {
//   const jsonObj = vari.data.cards;
//   jsonObj.forEach(el => {
//     list.push(el);
//   });
// };

// const toolTipCreator = function(json) {
//   let stats;
//   if (json.evo_atk > 0 || json.evo_life > 0) {
//     stats = `${json.evo_atk} / ${json.evo_life}`;
//   } else {
//     stats = '';
//   }
//   let array = [json.skill_disc, stats, json.evo_skill_disc];
//   let array2 = [];
//   array.forEach(el => {
//     if (el) {
//       array2.push(el);
//     } 
//   });
//   return array2;
// };

// const useCardCreator = function(vari) {
//   vari.forEach(el => {
//     cardCreator(el.card_id, el.card_name);
//     let descArray = toolTipCreator(el);
//     let desc = descArray.join('<br>');
//     document.getElementById(el.card_id).innerHTML = `${desc}`;
//   });
// };

// const renderListItemClick = function(vari, list) {
//   renderList(vari, list);
//   useCardCreator(list);
// };

// const renderListItemKey = function(list) {
//   useCardCreator(list);
// };

// let cardArray = [];

// list.addEventListener('click', function(e) {
//   e.preventDefault();
//   document.querySelector('.js-search-form').classList.add('hidden-search');
//   cardDeletor();
//   cardArray = [];
//   if (e.target.tagName.toLowerCase() === 'img') { 
//     const cardClass = e.target.parentNode.getAttribute('data-class');
//     const URL = `https://shadowverse-portal.com/api/v1/cards?format=json&clan=${cardClass}`;
//     fetch(URL) // , {mode: 'no-cors'}
//       .then((resp) => resp.json())
//       .then(function(myJson) {
//         renderListItemClick(myJson, cardArray);
//         document.querySelector('.js-search-form').classList.remove('hidden-search');
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }
// });

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

// cards.addEventListener('click', function(e) {
//   e.preventDefault();
// });