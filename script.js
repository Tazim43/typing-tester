// utils...

class Pair {
  constructor(first = "", second = "") {
    this.first = first;
    this.second = second;
  }
}

const getRandomNumber = (n) => {
  n = parseInt(n);
  return Math.floor(Math.random() * n);
};

console.log(getRandomNumber(10));

// ...utils

let dictionary =
  "people about dog cat run hop box car pen cup top bed day sun hat egg bug ant bee fox cow rat pie key map ham leg pig nut bus hut bag jug arm bike cake duck goat kite moon nose pear quilt ring sock tree vest whale yarn apple banana clock dance eagle flower glove horse igloo jacket lemon mouse napkin orange pencil rabbit snake turtle umbrella violin wagon xylophone yogurt zebra acorn breeze candy dolphin elephant giraffe hammer iguana jellyfish kettle llama monkey noodle oyster penguin quail robot sandwich tomato unicorn volcano watermelon xylophone yo-yo zucchini astronaut butterfly coconut diamond envelope football giraffe helicopter island jigsaw kangaroo ladder mailbox notebook octopus pineapple question rocket spaceship teapot umbrella van wagon xylophone yoyo zebra helicopter icicle juggernaut keyboard lighthouse meadow nightingale ostrich pencil quasar robot seashell tangerine umbrella vase walrus xerox yam zebra aquarium butterfly cactus dolphin elephant falcon gorilla hedgehog iguana jelly kite lantern monkey narwhal octopus penguin quokka rhino squirrel tulip umbrella vase wolf xylophone yak zebra able add age ago air ask bad big box buy car day dog end far few fun get god guy hot how job key let lot low man mom new not old own pay run see set she six sky son sun ten top try two war win yes yet you zoo act bag bat bed bet bus cap cat cry cup cut dew ear egg elf fly fox fur gap gem hat ice ink jar joy lip map mat mud nut pan pen pig pot rat rug sad say ski spy tap tie toe van wet win";

dictionary = dictionary.split(" ");
const dictionaryLength = dictionary.length;

console.log(dictionary);

// text for typing area...

const getRandomText = (wordCount) => {
  let text = "";
  for (let i = 0; i < wordCount; i++) {
    let idx = getRandomNumber(dictionaryLength - 1);
    let word = dictionary[idx];
    if (i > 0) text += " ";
    text += word;
  }
  return text;
};

// variables
// @params charPos = current typed position
let charPos = 0;
let text = "";
let textArea = document.getElementById("typing-area");

/*
 Fill the text area with length amount of random words
@params _len = text length */

let isManual = 1;

const resetAll = () => {
  charPos = 0;
  text = "";
  textArea.innerHTML = "";
  document.addEventListener("keydown", handleKeyPress);
  document.getElementById("manual").innerHTML = "Press any key to start";
  document.getElementById("speed").innerHTML = "";
  isManual = 1;
};

const paintTypingArea = (_len) => {
  resetAll();

  text = getRandomText(_len);
  let chunk = []; // letters elements

  for (let i = 0; i < text.length; i++) {
    let letter = document.createElement("span");
    if (text[i] === " ") letter.innerHTML = "&nbsp;";
    else letter.innerHTML = text[i];
    chunk.push(letter);
  }

  chunk.forEach((letter) => {
    textArea.appendChild(letter);
  });
};

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("fired");
  paintTypingArea(50);
});

const valid = (keyName) => {
  for (let i = 0; i < keys.length; i++) {
    if (keyName == keys[i]) return 1;
  }
  return 1;
};

let startTime = -1;

const updateSpeed = () => {
  if (startTime !== -1) {
    let curTime = Date.now();
    let gap = parseInt(curTime) - parseInt(startTime);
    console.log(curTime);
    console.log(startTime);
    gap = parseFloat(gap);
    gap /= 1000;
    gap /= 60;
    let words = parseFloat(charPos + 1) / 4;
    let wpm = Math.floor(words / gap);

    document.getElementById("speed").innerHTML = `${wpm} WPM`;
  }
};

let speedInterval;

const handleKeyPress = (e) => {
  if (isManual == 1) {
    document.getElementById("manual").innerHTML = "";
    startTime = Date.now();
    speedInterval = setInterval(updateSpeed, 100);
    isManual = 0;
  }

  if (charPos >= text.length - 1) {
    document.removeEventListener("keydown", handleKeyPress);
    clearInterval(speedInterval);
  }

  if (e.key === text[charPos]) {
    textArea.childNodes[charPos].innerHTML = "*";
    charPos++;
  } else if (e.key != "Backspace") {
    textArea.childNodes[charPos].classList.add("vibrate-once");

    setTimeout(() => {
      textArea.childNodes[charPos].classList.remove("vibrate-once");
    }, 100);
  }

  if (e.key === "Backspace") {
    if (charPos > 0) {
      let preText = "&nbsp;";
      if (text[charPos - 1] != " ") preText = text[charPos - 1];
      textArea.childNodes[charPos - 1].innerHTML = preText;
    }
    charPos = Math.max(charPos - 1, 0);
  }
};

document.addEventListener("keydown", handleKeyPress);
