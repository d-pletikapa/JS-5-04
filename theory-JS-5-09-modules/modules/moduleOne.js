// 'use strict'; - не нужен при использовании экспорта и импорта ES6
const moduleOne = (name, end) => name + ' привет' + end;

export default moduleOne;

// Common JS:
// module.exports = moduleOne;
