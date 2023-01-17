'use strict';
// способы изолировать код от глобальной области видимости
{
  // здесь код
}

// IIFE модуль
((number) => {
  const app = () => {
    console.log('Приложение');
  };
  app();
})(123);

// третий способ
const $ = (() => {
  const privateVar = 'private data';
  const publicVar = 'open data';
  const app = () => {
    console.log('Приложение');
  };
  const getData = () => privateVar;
  return {
    app,
    publicVar,
    getData,
  };
})();

$.app();
console.log($.publicVar);
console.log($.getData());
