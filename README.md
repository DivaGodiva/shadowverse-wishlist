# Shadowverse Wishlist

This is a wishlist application for the card-game Shadowverse. Signup for an account and browse through all the cards
available in the game. Cards are split up by classes. Click a class and see the card-set for that particular class. 
If you would like to add a card to your wishlist, simply mouse over the card you want and hit the add button. You 
can add a card as a high priority card, or a low priority card. After adding the card you can check your wishlist!
All of your added cards will be displayed, split by high and low priority. Card priorities can also be swapped or 
dropped(deleted) from your list. 

To run locally, pull files. Start 'mongod'. Then run 'npm start' in project directory. 

# Screenshots

### Landing page:

Users will first land here. If you have an account, login. If not, signup.

![image](https://user-images.githubusercontent.com/33299951/47969737-04011800-e031-11e8-8783-0d0ed1ec8d9d.png)

### Login: 

Enter username and password to begin using the site.

![image](https://user-images.githubusercontent.com/33299951/47969754-3d398800-e031-11e8-8d55-4abf6abdf2ac.png)

### Card-Search:

Initial landing page after successful login or signup.

![image](https://user-images.githubusercontent.com/33299951/47969770-56dacf80-e031-11e8-958d-0464df6c34a5.png)

### Card-Search (class clicked + card hover): 

Click a class bauble to see the card set for that particular class. Hover over cards to see their effects,
and add cards. Before adding a card, you will be prompted to choose "high" or "low". You can also use the 
searchbar to filter cards by name.

![image](https://user-images.githubusercontent.com/33299951/47969781-6fe38080-e031-11e8-8adb-6a11bc7fe6a8.png)

### Wish-List:

Click on the Card-List in the navigation bar to land at your wish-list. Your added cards will be displayed 
here. They will be split by either "high" or "low" priority, which you chose when adding the card.

![image](https://user-images.githubusercontent.com/33299951/47969793-88539b00-e031-11e8-97da-50a2a31df103.png)

### Wish-List (card hover):

Hover over the cards to see their effects. You can also swap card priorities, or drop(delete) cards from your
list. 

![image](https://user-images.githubusercontent.com/33299951/47969807-b76a0c80-e031-11e8-91bc-81cf606d0bf0.png)

# API Documentation

### POST "/cardSearch"

Creates new card entry.

Request body:
```
{
  userId: '5bc0c6ea8cd903c2d2306381',
  cardId: '900144020',
  priority: 'low' 
}
```
Response body:
```
{ 
  _id: 5bdf8a5b5146680e5b1928e7,
  userId: 5bc0c6ea8cd903c2d2306381,
  cardId: '900144020',
  priority: 'low',
  createdAt: 1541376603895,
  __v: 0 
}
```
### GET "/wishList"

Display cards in wish-list:

Request body:
```
{
  userId: '5bc0c6ea8cd903c2d2306381',
}
```
Response body:
```
[ 
  { 
    cardId: '110141020',
    id: 5bca4141d67e5ae0dd4d2726,
    createdAt: 1539981633115,
    priority: 'high'
  }
]
```
### DELETE "/wishList"

Deletes a card in the wish-list:

Request body:
```
{
  _id: 5bdf8a5b5146680e5b1928e7,
}
```
### PUT "/wishList"

Changes priority of a card in the wish-list:

Request body:
```
{
  _id: 5bdf8a5b5146680e5b1928e7,
  priority: 'low' 
}
```
Response body:
```
{ 
  _id: 5bdf8a5b5146680e5b1928e7,
  userId: 5bc0c6ea8cd903c2d2306381,
  cardId: '110141020',
  priority: 'low',
  createdAt: 1539981633115,
  __v: 0 
}
```

# Stack

- Client
  * EJS
  * Vanilla Javascript
  * HTML/CSS

- Server
  * Express
  * Node
  * MongoDB
  * Bcrypt
  * Passport
  * Mocha/Chai
  
