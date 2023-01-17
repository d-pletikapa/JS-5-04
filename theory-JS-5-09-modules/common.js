// 'use strict'; - не нужен при использовании экспорта и импорта ES6
import moduleOne from './modules/moduleOne.js';
import {names, postfix as end} from './modules/moduleTwo.js';

names.forEach(name => {
  console.log(moduleOne(name, end));
});

// Импорт через дефолт с деструктуризацией
// import moduleTwo from './modules/moduleTwo.js';
// const {names, postfix} = moduleTwo;
// names.forEach(name => {
//   console.log(moduleOne(name, postfix));
// });


// Экспортировать все сразу:
import * as data from './modules/moduleTwo.js';

data.names.forEach(name => {
  console.log(moduleOne(name, data.postfix));
});

// Common JS:

// const moduleOne = require('./modules/moduleOne');
// const {
//   names,
//   postfix,
// } = require('./modules/moduleTwo');
//

