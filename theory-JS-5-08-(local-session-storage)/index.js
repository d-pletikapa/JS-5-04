'use strict';

// записываем
localStorage.setItem('test00', '00');
sessionStorage.setItem('test01', '01');

localStorage.setItem('test1', true);
localStorage.setItem('test2', false);
localStorage.setItem('test3', 123);
localStorage.setItem('test4', JSON.stringify([1, 2, 3]));
localStorage.setItem('test5', JSON.stringify({a: 1, b: 2}));
// обычное приведение к строке (не подходит);
console.log(([1, 2, 3]).toString());

// получаем
const ls = localStorage.getItem('test00');
console.log('-> ls', ls);
const ss = sessionStorage.getItem('test01');
console.log('-> ss', ss);

const test4 = JSON.parse(localStorage.getItem('test4'));
const test5 = JSON.parse(localStorage.getItem('test5'));


// удаляем
localStorage.removeItem('test00');
sessionStorage.removeItem('test01');

localStorage.clear();
sessionStorage.clear();

// обращение
console.log('-> localStorage.test2', localStorage.test2);
console.log('-> sessionStorage.test', sessionStorage.test);

console.log('==> localStorage.length', localStorage.length);

// практика
// практика
// практика

const container = document.querySelector('.container');

const session = document.querySelector('.session-storage');
const local = document.querySelector('.local-storage');
const resetSession = document.querySelector('.reset-session');
const resetLocal = document.querySelector('.reset-local');
container.addEventListener('change', (e) => {
  const target = e.target;
  const parent = target.closest('.storage');
  const style = {
    backgroundColor: parent.color.value,
    fontSize: parent['font-size'].value,
  };

  parent.style.backgroundColor = style.backgroundColor;
  parent.style.fontSize = style.fontSize + 'px';
  if (parent === session) {
    console.log('session');
    session.setItem('session-style', JSON.stringify(style));
  }
  if (parent === local) {
    console.log('local');
    local.setItem('local-style', JSON.stringify(style));
  }
});

const init = () => {
  const sessionStyle = JSON.parse(sessionStorage.getItem('session-style'));
  // устанавливаем значение в инпуты
  session['font-size'].value = sessionStyle?.fontSize ||
    session['font-size'].value;
  session.color.value = sessionStyle?.backgroundColor ||
    session['font-size'].value;
  // применяем стили из сторедж к элементам
  session.style.backgroundColor = session.color.value;
  session.style.fontSize = session['font-size'].value + 'px';

  const localStyle = JSON.parse(localStorage.getItem('local-style'));
  // устанавливаем значение в инпуты
  local['font-size'].value = localStyle?.fontSize ||
    local['font-size'].value;
  local.color.value = localStyle?.backgroundColor ||
    local['font-size'].value;
  // применяем стили из сторедж к элементам
  local.style.backgroundColor = local.color.value;
  local.style.fontSize = local['font-size'].value + 'px';
};

resetSession.addEventListener('click', () => {
  sessionStorage.clear();
  session.reset();
  init();
});
resetLocal.addEventListener('click', () => {
  localStorage.clear();
  local.reset();
  init();
});
init();

window.addEventListener('storage', (e) => {
  console.log(e);
  init(); // позволяет запускать функцию (при изменении storage),
  // в любых окнах связанных с этим доменом
});

// перебрать все данные которые есть в localstorage
const getLocalStorageData = () =>
  Object.entries(localStorage).reduce((acc, [key, value]) => {
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch {
      console.log(value); // выводит что не смог распарсить
      newValue = value;
    }
    return {
      ...acc,
      [key]: newValue,
    };
  },
  {});

console.log(getLocalStorageData);
