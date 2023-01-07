'use strict';

const form = document.querySelector('.my-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // обращение к форме первый способ
  console.log(form.name.value);
  console.log(form.elements.surname.value);
  // elements можно опустить
  console.log(form.phone.value);

  // обращение к форме второй способ (через свойство объекта эвента)
  const formData = new FormData(e.target);
  console.log(formData.get('mail'));
  // обращение к форме третий способ entries
  console.log(formData.entries());
  // возвращает объект итератор который нужно перебрать,
  // (for of, .forEach, ... );
  console.log(...formData.entries()); // например спред оператор
  console.log(Object.fromEntries(formData.entries()));
  // или метод объекта .fromEntries
  console.log(Object.fromEntries(formData));
  // Можно опустить энтрис т.к метод .fromEntries
  // все равно будет итерировать formData
});

// события для работы с данными формы
form.name.addEventListener('focus', e => {
  console.log(e.type, e.target.value);
});

form.name.addEventListener('blur', e => {
  console.error(e.type, e.target.value);
});

form.name.addEventListener('change', e => {
  console.warn(e.type, e.target.value);
});

form.name.addEventListener('input', e => {
  console.warn(e.type, e.target.value);
});

form.name.addEventListener('keyup', e => {
  console.warn(e.type, e.target.value);
});

form.name.addEventListener('keydown', e => {
  console.warn(e.type, e.target.value);
});

form.name.addEventListener('keypress', e => {
  console.warn(e.type, e.target.value);
});

const {name, surname, phone, radio: [...radio], file, description} = form;

const fieldsetRadio = document.querySelector('.fieldset-radio');
fieldsetRadio.addEventListener('change', e => {
  console.log(e.target, e.target.value);
});
// Очистить форму по нажатию кнопки esc
document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    form.reset();
  }
});

/* -------------------------------------------------------- */
// const form = document.querySelector('.my-form');
const sentData = (data) => {
  console.log('Отправка:', data);
};

form.addEventListener('submit', e => {
  e.preventDefault();
  // Способ 2 проверка типа инпута на чекбокс и создаем массив
  const checkboxes = new Set();
  [...form.elements].forEach(elem => {
    if (elem.type === 'checkbox') {
      checkboxes.add(elem.name);
    }
  });
  const data = {};
  const formData = new FormData(e.target);

  for (const [name, value] of formData) {
    if (checkboxes.has(name)) {
      if (Array.isArray(data[name])) {
        data[name].push(value);
      } else {
        data[name] = [value];
      }
    } else {
      data[name] = value; // собираем объект дата
    }
  }
  sentData(JSON.stringify(data));

  /* -------------------------------------------------------- */
  // Способ 1 - отправляем данные формы с чекбоксами,
  // с одинаковыми неймами но разными value, в формате JSON

  // sentData(formData); как отправить данные в формате formData (работает,
  // если сервер принимает файлы).
  const data = {}; // создаем  объект для отправки в формате json
  const formData = new FormData(e.target);
  // перебираем formData можно через .forEach или for of
  for (const [name, value] of formData) {
    // ищем проверку, если у нас одинаковый нейм в инпутах
    // (например в чекбоксах)
    if (Object.keys(data).includes(name)) {
      if (!Array.isArray(data[name])) {
        data[name] = [data[name]]; // делаем массив из строки
      }
      data[name].push(value); // добавляем новые данные
    } else {
      data[name] = value; // собираем объект дата
    }
  }
  sentData(JSON.stringify(data));
  // тоже самое что и: sentData(JSON.stringify(Object.fromEntries(formData)));
});
