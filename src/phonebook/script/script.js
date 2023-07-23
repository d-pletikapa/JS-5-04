// TODO: JS-5-09
// Избавиться от дерективы ‘use strict’
// Применить два способа export:
// export const ‘named’
// export default
//
// Применить три способа import
// import ‘named’ from ‘путь’
// import {‘named’, ‘named’} from ‘путь’
// import * as ‘named’ from ‘путь’

import controls from './modules/control.js';
const {
  hoverRow,
  sort,
  modalControl,
  deleteControl,
  formControl,
} = controls;
import {renderPhoneBook, renderContacts} from './modules/render.js';
import {getStorage} from './modules/serviceStorage.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      // btnClose,
      btnDel,
      thead,
    } = renderPhoneBook(app, title);

    // Функционал
    const allRow = renderContacts(list, getStorage('contacts'));
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    thead.addEventListener('click', e => {
      const target = e.target;
      if (target.textContent === 'Имя') {
        sort('name');
        list.innerHTML = '';
        renderContacts(list, getStorage('contacts'));
      } else if (target.textContent === 'Фамилия') {
        sort('surname');
        list.innerHTML = '';
        renderContacts(list, getStorage('contacts'));
      }
    });
  };
  window.phoneBookInit = init;
}

