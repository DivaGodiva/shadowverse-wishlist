'use strict';

const cards = document.getElementById('card-holder');

const list = document.querySelector('#crafts');

const cardCreator = function(imgUrl, nameUrl) {
  let img = document.createElement('IMG');
  let listEl = document.createElement('LI');
  let toolTip = document.createElement('SPAN');
  img.setAttribute('src', `https://shadowverse-portal.com/image/card/en/C_${imgUrl}.png`);
  img.setAttribute('class', 'card-picture');
  listEl.setAttribute('id', `${nameUrl}`);
  listEl.setAttribute('class', 'card-display');
  toolTip.setAttribute('id', `${imgUrl}`);
  toolTip.setAttribute('class', 'tooltip');
  cards.appendChild(listEl);
  listEl.appendChild(img);
  listEl.appendChild(toolTip);
};

const cardDeletor = function() {
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
};

list.addEventListener('click', function(e) {
  e.preventDefault();
  cardDeletor();
  if (e.target.tagName.toLowerCase() === 'img') { 
    const cardClass = e.target.parentNode.getAttribute('data-class');
    const URL = `https://shadowverse-portal.com/api/v1/cards?format=json&clan=${cardClass}`;
    fetch(URL)
    // , {mode: 'no-cors'}
      .then((resp) => resp.json())
      .then(function(myJson) {
        const jsonObj = myJson.data.cards;
        jsonObj.forEach(el => {
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
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

document.querySelector('.card-form').addEventListener('keyup', function(e) {
  e.preventDefault();
  const inputVal = e.target.value.toLowerCase();
  let test = document.querySelectorAll('.card-display');
  test.forEach(el => {
    if (!el.id.toLowerCase().includes(`${inputVal}`)) {
      document.getElementById('card-holder').removeChild(document.getElementById(`${el.id}`));
    }
  });
});

document.querySelector('.card-form').addEventListener('submit', function(e) {
  e.preventDefault();
});
