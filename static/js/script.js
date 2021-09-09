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

  console.log(copyAllButtons); // to display button list - order is immutable


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