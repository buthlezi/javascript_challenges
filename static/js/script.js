// Challenge 1: Your Age in Days

function ageInDays() {
  let birthYear = prompt('What year were you born... My friend ?')
  let ageToday = (2021 - birthYear) * 365;
  let h1 = document.createElement('h1');
  let textAnswer = document.createTextNode('You are ' + ageToday + ' days old')
  h1.setAttribute('id', 'ageToday');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageToday').remove();
}
