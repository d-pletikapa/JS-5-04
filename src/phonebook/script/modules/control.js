import {createRow} from './createElements.js';
import * as serviceStorage from './serviceStorage.js';

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow?.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const sort = (sortBy) => {
  const data = serviceStorage.getStorage('contacts');
  data.sort((a, b) => {
    if (`a.${sortBy}` < `b.${sortBy}`) {
      return -1;
    }
    if (`a.${sortBy}` > `b.${sortBy}`) {
      return 1;
    }
    return 0;
  });
  localStorage.removeItem('contacts');
  localStorage.setItem('contacts', JSON.stringify(data));
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
    // добавил скрытие кнопок удалить при открытии модального окна
    document.querySelectorAll('.delete').forEach(del => {
      if (del.classList.contains('is-visible')) {
        del.classList.remove('is-visible');
      }
    });
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal,
  );

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target === target.closest('.close')
    // или target.classList.contains('close')
    // или btnClose
    ) {
      closeModal();
    }
  });
  return {
    closeModal,
  };
};
const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
      // удаляем контакт из localStorage по номеру телефона
      const delPhone = target.closest('.contact')
          .children[3].innerText;
      serviceStorage.removeStorage(delPhone);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};
const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    serviceStorage.setStorage('contacts', newContact);
    form.reset(); // метод формы по умолчанию для очистки,
    // также можно навесить на кнопку в форме type='reset'
    closeModal();
  });
};
export default {
  hoverRow,
  sort,
  modalControl,
  deleteControl,
  formControl,
};
