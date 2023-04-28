import key from './keyBoard.json' assert {type: "json"};
// import { readFileSync, writeFileSync } from './keyBoard.json' assert {type: "json"};

function generateKeyBoard() {
  let output = ``;
  key.forEach((element, item) => {
    if (item == 14 || item == 29 || item == 42 || item == 56) {
      output += `<div class="clearfix"></div>`
    }
    output += `<div class = "key" data=${element.code} >${ element.charCode? String.fromCharCode(element.charCode): element.key}</div>`
  });
  document.querySelector('.keyboard').innerHTML = output
}
generateKeyBoard();

document.onkeydown = function(event) {
  console.log(event.code);
  document.querySelectorAll(`.keyboard .key[data=${event.code}]`).forEach(function (element) {
    element.classList.add('activ');
  })
}
document.onkeyup = function(event) {
  console.log(event.code);
  document.querySelectorAll(`.keyboard .key[data=${event.code}]`).forEach(function (element) {
    element.classList.remove('activ');
  })
}

document.querySelectorAll(`.keyboard .key`).forEach(function (element) {
  element.onmousedown = function (event) {
    element.classList.add("activ")
    document.querySelector('.on-inp').value+=element.innerHTML;
    console.log(element.innerHTML);
  }
  element.onmouseup = function (event) {
    element.classList.remove("activ")
  }
})



// const json1 = readFileSync('keyBoard.json', 'utf8');

// const object = JSON.parse(json1);
// object[0].lang = 'en';

// const json2 = JSON.stringify(object);
// writeFileSync('keyBoard.json', json2);
// console.log(key[0].lang);

// document.onkeypress = function (event) {
//   console.log(event);
// }

// document.querySelector('.on-inp').onkeypress = function (event) {
//   console.log(`charCode: ${event.charCode}` );
//   console.log(event.code);
//   console.log(event.key);
//   console.log(event.keyCode);
//   console.log("====  onkeypress  =====");
// }
// const keyCode = [];

// document.querySelector('.on-inp').onkeydown = function (event) {
//   console.log(`charCode: ${event.charCode}`);
//   console.log(`code: ${event.code}`);
//   console.log(`key: ${event.key}`);
//   console.log(`keyCode: ${event.keyCode}`);
//   let obj = {
//     "charCode": event.charCode,
//     "code" : event.code,
//     "key" : event.key,
//     "keyCode" : event.keyCode,
//   }
//   document.querySelector('.on-inp').onkeypress = function (event) {
//     obj.charCode = event.charCode;
//   }
  
//   keyCode.push(obj);
//   console.log(JSON.stringify(keyCode));
// }