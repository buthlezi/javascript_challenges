// Challenge 1: Your Age in Days

function ageInDays() {
  let birthYear = prompt('What year were you born... My friend ?');
  let ageToday = (2021 - birthYear) * 365;
  let h1 = document.createElement('h1');
  let textAnswer = document.createTextNode('You are ' + ageToday + ' days old');
  h1.setAttribute('id', 'ageToday');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageToday').remove();
}

// Challenge 2: Cat Generator
function generateCat() {
  let image = document.createElement("img");
  let div = document.getElementById("flex-cat-gen");
  image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small" 
  div.appendChild(image);
}

// Challenge 3 :Rock, Paper, Scissors
function rpsGame(yourChoice) {
  console.log(yourChoice);
  // Note the dot notation
  // console.log(yourChoice.src);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id; // note the dot notation -- OOP ---

  botChoice = numberToChoice(randToRpsInt());
  console.log('Computer choice: ', botChoice);

  results = decideWinner(humanChoice, botChoice); // [0, 1] human lost bot won
  console.log(results);

  message = finalMessage(results); // {'message': You won!', 'color': 'green'}
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  let rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
    // Note: {object 'key': {object}} database structure
  };

  let yourScore = rpsDatabase[yourChoice][computerChoice];
  let computerScore = rpsDatabase[computerChoice][yourChoice];

  return[yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {  // Note '====' avoids confusion when comparing strings and integers
    return {'message': 'You lost !!', 'color': 'red'};
  } else if (yourScore === 0.5) {
    return {'message': 'You tied !!', 'color': 'yellow'};
  } else {
    return {'message': 'You won !!', 'color': 'green'};
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  let imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src,
  }

  // lets remove all images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  let humanDiv = document.createElement('div');
  let botDiv = document.createElement('div');
  let messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
  // e.g. <h1 style='color: green; font-size: 60px; padding: 30px;'> You won !! </h1>
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height = 150 width = 150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
}
  // Challenge 4: Change the Color of All Buttons
  let all_buttons = document.getElementsByTagName('button');

  let copyAllButtons = [];
  for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
  }

  // console.log(copyAllButtons); // to display button list - order is immutable


  // this is the main function - it calls all the others
  
  function buttonColorChange(buttonAttribute) {
    // console.log(buttonAttribute.value); // to check attributes in console
    if (buttonAttribute.value === 'red') {
      buttonsRed();
    } else if (buttonAttribute.value === 'green') {
      buttonsGreen();
    } else if (buttonAttribute.value === 'reset') {
      buttonsColorReset();
    }  else if (buttonAttribute.value === 'random') {
      buttonsColorRandom();
    }
  }

  function buttonsRed() {
    for (let i=0; i < all_buttons.length; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add('btn-danger');
    }
  }

  function buttonsGreen() {
    for (let i=0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

  function buttonsColorReset() {
    for (let i=0; i< all_buttons.length; i++) {
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add(copyAllButtons[i]);
    }
  }

  function buttonsColorRandom() {
    let buttonsChoices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];

    for (let i = 0; i < all_buttons.length; i++) {
      let randomNum = Math.floor(Math.random() * 4);
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add(buttonsChoices[randomNum]);
    }
  }

  // Challenge 5: Blackjack
  // Creating blackjackGame object ?
  let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'],
    'cardsMap':{'A': [1, 11], '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10},
    // note: card is the key and the corresponding number is the value
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
  };

  const YOU = blackjackGame['you'];
  const DEALER = blackjackGame['dealer'];

  const gameSound = new Audio('static/sounds/swish.m4a');
  const winSound = new Audio('static/sounds/cash.mp3');
  const loseSound = new Audio('static/sounds/aww.mp3');

  document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
  
  document.querySelector('#blackjack-stand-button').addEventListener('click', dealerStandLogic);

  document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

  function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
      let card = randomCard();
      showCard(card, YOU);
      updateScore(card, YOU);
      showScore(YOU);
    }
  }

  function randomCard() {
    let randomSelect = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomSelect];
  }

  function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
      let cardImage = document.createElement('img');
      cardImage.src = `static/images/${card}.png`;
      document.querySelector(activePlayer['div']).appendChild(cardImage);
      gameSound.play();
    }
  }

  function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

      blackjackGame['isStand'] = false;
      let yourImages = document.querySelector('#your-box').querySelectorAll('img');
      let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

      
      for (let i=0; i < yourImages.length; i++) {
        yourImages[i].remove();
      }

      for (let i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-statement').textContent = "Let's Play !!!";
    document.querySelector('#blackjack-statement').style.color = 'black';

    blackjackGame['turnsOver'] = false;
  }
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
  // If adding 11 takes me below 21 add 11, otherwise add 1
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
  // note: the 'A' list has 2 elements at index 0 amd 1 - pointing to 1 and 11
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  
  // if card was not an 'A'
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST !!!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    // note the use of CSS in JScript
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerStandLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(2000);
  }
  
 

  // if (DEALER['score'] > 15) {
  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);
  // }
}

// compute winner - return who won
// update the wins, draws and losses
function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {
   // condition 1: higher score than dealer 
   // or dealer busts but you are under 21

   if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      blackjackGame['wins']++;
      winner = YOU;

    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++;
      winner = DEALER;

    } else if  (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;
    }
  
  //  condition 2: player busts but dealer doesnt
  
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
      blackjackGame['losses']++;
      winner = DEALER;
    
   
    // condition 3: player and dealer bust
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }

  console.log(blackjackGame);
  return winner;
}
  
function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] = true) {

    if (winner === YOU) {
    document.querySelector('#wins').textContent = blackjackGame['wins'];
    message = 'You won !!!';
    messageColor = 'green';
    winSound.play();

    } else if (winner === DEALER) {
    document.querySelector('#losses').textContent = blackjackGame['losses'];
    message = 'You lost !!';
    messageColor = 'red';
    loseSound.play();
  
    }

    else {
    document.querySelector('#draws').textContent = blackjackGame['draws'];
    message = 'Its a draw !!';
    messageColor = 'black';
    }


  document.querySelector('#blackjack-statement').textContent = message;
  document.querySelector('#blackjack-statement').style.color = messageColor;
  }

}


