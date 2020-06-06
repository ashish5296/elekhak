window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 7,
  medium: 5,
  hard: 3
}

//Numbers in Preeti
const numNepali = [')','!','@','#','$','%','^','&','*'];

//Convert Number to Nepali preeti
function convertToNepaliDigit(number){
    var number = number.toString();
    var sliced = [];
      for(i=0; i< number.length; i++){
        sliced.push(numNepali[number.substr(number.length - 1)]);
        number = number.slice(0,-1);
      }
    return sliced.reverse().join('').toString();
}

//To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'xfd|f]',
    'egfO',
    'k/Dk/f',
    ';+:s[lt',
    ';fdflhs',
    ';Dkbf',
    'nf]stGq',
    'd"No',
    ';Fu',
    'kl/lrt',
    'b]z',
    'cfly{s',
    'ljsf;',
    'of]ubfg',
    ';Sg',
    'bIf',
    ':j:y',
    'gful/s]',
    'pTkfbg',
    'ug]{',
    'p2]Zo',
    'ljBfno',
    'tx',
    "kf7\\oj|md",
    'ljsf;',
    'kl/dfh{g',
    'k|lj|mof',
    "b]z",
    "ax';f+:s[lt",
    'd"No',
    'dfGotf',
    'k|lt',
    'uj{',
    '/rgf',
    '1fg',
    'l;k]',
    "r'gf}tL]",
    ';fdgf',
    ';Sg]',
    ':jtGq',
    ';dfnf]rg',
    ';f]rfO',
    'ljZn]if0f',
    'k|lt:kwf',
    'Ifdtf',
    "cfjZos\\'",
    'lzIff',
    "d'Vo",
    'ljZjf;]',
    ';+/If0f',
    ';+jw{g',
    'clwsf/',
    'st{Josf]',
    ':jtGq]',
    ';Ddfg',
    ';fdflhs',
    'k|fs[lts',
    'jftfj/0f',
    ';r]t',
    'dfgj',
    'dfGotf',
    'Jojxf/',
    'eflifs',
    'tfls{s',
    'tyf',
    'Jofjxfl/s',
    'ul0ft',
    ';"rgf',
    'k|ljlw',
    'k|of]u',
    'vf]h',
    "cg';Gwfg",
    'pkof]u',
    'g}lts',
    'c;n',
    'snf',
    ';+:s[lt',
    ';+/If0f',
    'hf]lvd',
    'Go"gLs/0f',
    ';Ifd',
    'hgzlSt',
    'dfWolds',
    'lzIff',
    'cfwf/e"t',
    'kIf',
    'ljBfno',
    'kf7\\oj|md',
    ';Gbe{',
    "cg';f/",
    'd"n',
    'dd{{',
    'b[li6',
    'k|fWofks',
    'lzIfs',
    'ljBfyL',
    'cleefjs',
    ';+:yf',
    ';/f]sf/jfnf',
    ";'emfj",
    ';d]6L',
    'ljifo',
    'If]q',
    ';dfof]hg',
    ';d;fldlos',
    'kl/dfh{g',
    ';lxt',
    'sIff',
    "5'6\\6f5'6\\6}",
    "kf7\\oj|md",
    'tof/',
    '5',
    'sfo',
    'plNnlvt',
    's]Gb|',
    'ljz]if1',
    'ljz]if',
    'e"ldsf',
    ";'wf/",
    'sfo{',
    'lg/Gt/',
    'rNg]',
    'k|lj|mof',
    'cfufdL',
    ';do',
    'cem',
    'a9L',
    'k|efj',
    'agfpg',
    "a'l4hLjL]",
    'cxd\\',
    'e"ldsf',
    ";'emfj",
    "ck]Iff",
    'g]kfn',
    ';/sf/',
    'lj1fg',
    'tyf',
    'k|ljlw',
    'dGqfno',
    ';fgf]l7dL',
    "eStk'/",
    'Oltxf;',
    'e"uf]n',
    'gful/szf:q',
    'gful/s',
    'zf:q',
    'cy{zf:q',
    'cy',
    ';dfhzf:q',
    'jftfj/0f',
    'cltl/St',
    'ul0ft',
    's[lif',
    'lzIff',
    "sDKo'6/",
    'k/LIf0f',
    'kmf]6f]u|fkmL',
    '5ljsnf',
    ':jf:Yo',
    'zf/Ll/s',
    'lzIff',
    'u|fdL0f',
    'lj1fg',
    'p2]Zo'
  ];

//Initilize Game
function init(){
  //show number of seconds in UI
  seconds.innerHTML = numNepali[currentLevel];
  // Load word form array
  showWord(words);
  //matching word with wordInput
  wordInput.addEventListener('input',startMatch);
  //Call countdown everysecond
  setInterval(countdown, 1000);
  //Check game checkStatus
  setInterval(checkStatus, 50);
}

//Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  // If score is -1, display 0
  if(score === -1) {
    scoreDisplay.innerHTML = ')';
  } else {
    scoreDisplay.innerHTML = convertToNepaliDigit(score);
  }
}

//Match currentWord to wordInput
function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = '';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick and show random words
function showWord(words) {
  //Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  //Output a random words
  currentWord.innerHTML = words[randIndex];
}

//Countdown timer
function countdown() {
  //make sure time is not run Out
  if(time>0) {
    //Decrement
    time--;
  } else if(time === 0) {
    //Game Over
    isPlaying = false;
  }
  //Show time
  timeDisplay.innerHTML = numNepali[time];
}

//Check game Status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = ';do ;dfKt ...';
    score = -1;
  }
}
