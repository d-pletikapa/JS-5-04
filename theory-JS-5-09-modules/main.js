(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          const c = 'function' === typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); const a = new Error('Cannot find module \'' + i + '\''); throw a.code = 'MODULE_NOT_FOUND', a;
        } const p = n[i] = {exports: {}}; e[i][0].call(p.exports, (r) => {
          const n = e[i][1][r]; return o(n || r);
        }, p, p.exports, r, e, n, t);
      } return n[i].exports;
    } for (var u = 'function' === typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o;
  } return r;
})()({1: [function(require, module, exports) {
  'use strict';
  const moduleOne = require('./modules/moduleOne');
  const {
    names,
    postfix,
  } = require('./modules/moduleTwo');

  names.forEach(name => {
    console.log(moduleOne(name, postfix));
  });
}, {'./modules/moduleOne': 2, './modules/moduleTwo': 3}], 2: [function(require, module, exports) {
  'use strict';
  const moduleOne = (name, end) => name + ' привет' + end;

  module.exports = moduleOne;
}, {}], 3: [function(require, module, exports) {
  'use strict';

  const names = ['Сергей', 'Максим', 'Алексей', 'Евгений'];
  const postfix = '!';

  module.exports = {
    names,
    postfix,
  };
}, {}]}, {}, [1]);
