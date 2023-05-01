import keyEn from './keyBoard.json' assert {type: "json"};
import keyRu from './keyBoard_ru.json' assert {type: "json"};
// import { readFileSync, writeFileSync } from './keyBoard.json' assert {type: "json"};

let keyall;


class MyClass {
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  setCookie(name, value, options = {}) {
    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
}
let kuki = new MyClass;
if (!kuki.getCookie('langauge')) {
  kuki.setCookie('langauge', 'En', {secure: true, 'max-age': 3600});
}
// kuki.getCookie('langauge')
// kuki.setCookie('langauge', 'En', {secure: true, 'max-age': 3600});
console.log(kuki.getCookie('langauge')); 


// setCookie('user', 'John', {secure: true, 'max-age': 3600});

document.querySelector('#virtual-key').insertAdjacentHTML('afterbegin', `<header class="header">
<div class="language">Текущая раскладка: <b class ="get-cookie">${kuki.getCookie('langauge')}</b>   </div>
<div class="change-language">Для изминения роскладки клавиатуры нажмите c левой стороны клавишы <b>Control + Shift</b> </div>
</header>
<section class="textarea">
<textarea class="on-inp" rows="4" cols="50"></textarea>
</section>
<Section class = "keyb">
<div class="keyboard"></div>
</Section>`);

function generateKeyBoard(key) {
  let output = ``;
  key.forEach((element, item) => {
    if (item == 14 || item == 29 || item == 42 || item == 56) {
      output += `<div class="clearfix"></div>`
    }
    output += `<div class = "key${element.code=="Tab"?" w-60":''}${element.code=="ShiftLeft"||element.code=="CapsLock"||element.code=="Backspace"?" w-125":''}${element.code=="Enter"?" w-115":''}${element.code=="ControlLeft"||element.code=="ControlRight"?" w-70":''}${element.code=="Space"?" w-412":''}" data=${element.code} datakey=${element.charCode}>${element.key=="ArrowUp"?"<img src='./img/ArrowUp.png'>":''}${element.key=="ArrowDown"?"<img src='./img/ArrowDown.png'>":''}${element.key=="ArrowRight"?"<img src='./img/ArrowRight.png'>":''}${element.key=="ArrowLeft"?"<img src='./img/ArrowLeft.png'>":''}${element.key=="Meta"?"<img src='./img/win.png'>":''}${element.key!="Meta"&&element.key!="ArrowLeft"&&element.key!="ArrowUp"&&element.key!="ArrowRight"&&element.key!="ArrowDown"?element.key:''}</div>`
  });
  // document.querySelector('.keyboard').insertAdjacentHTML('afterbegin', output)
  document.querySelector('.keyboard').innerHTML = output;
    return document.querySelectorAll(`.keyboard .key`);
}
// ${element.charCode? String.fromCharCode(element.charCode): element.key=="ArrowUp"?"<img src='./img/ArrowUp.png'>":element.key}
keyall = generateKeyBoard(kuki.getCookie('langauge')=='En'?keyEn:keyRu);

document.onkeydown = function(event) {
  document.querySelectorAll(`.keyboard .key[data=${event.code}]`).forEach(function (element) {
    element.classList.add('activ');
  })
}
document.onkeyup = function(event) {
  // console.log(event.code);
  document.querySelectorAll(`.keyboard .key[data=${event.code}]`).forEach(function (element) {
    element.classList.remove('activ');
  })
}

keyall.forEach(function (element) {
  element.onmousedown = function (event) {
    element.classList.add("activ")
    console.log(element.getAttribute('datakey'));
    document.querySelector('.on-inp').value+= element.getAttribute('datakey')!= 0 ?String.fromCharCode(element.getAttribute('datakey')):'';
    // console.log(element.innerHTML);
  }
  element.onmouseup = function (event) {
    element.classList.remove("activ")
  }
})



function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    func();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}

runOnKeys(
  () => {
    console.log('asdasd');
    if (kuki.getCookie('langauge')&&kuki.getCookie('langauge')=="En") {
      kuki.setCookie('langauge', 'Ru', {secure: true, 'max-age': 3600});
      document.querySelector('.get-cookie').innerHTML = 'Ru'
    }else{
      kuki.setCookie('langauge', 'En', {secure: true, 'max-age': 3600});
      document.querySelector('.get-cookie').innerHTML = 'En'
    }
    setTimeout(() => {
      keyall =  generateKeyBoard(kuki.getCookie('langauge')=='En'?keyEn:keyRu);
    }, 50);
   
  },
  "ControlLeft",
  "ShiftLeft"
);