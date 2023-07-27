// Импорт стилей
// import './phonebook/css/normalize.min.css';
// import './phonebook/css/bootstrap.min.css';
// import './phonebook/css/style.css';
import './phonebook/scss/index.scss';

import controls from './phonebook/script/control';
const {
  hoverRow,
  sort,
  modalControl,
  deleteControl,
  formControl,
} = controls;
import {renderPhoneBook, renderContacts} from './phonebook/script/render';
import {getStorage} from './phonebook/script/serviceStorage';

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

