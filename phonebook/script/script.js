'use strict';
// import {data} from "/data.js";

{
  // JS-5-08 Необходимо добавлять контакты в localStorage, из js удалить их
// Для работы с localStorage написать три функции
// 1) getStorage которая получает в виде аргумента
// ключ и по нему =>запрашивает данные из localStorage и возвращает их,
// если их нет то возвращает пустой массив
  const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
  // const getStorage = (key) => {
  //   let data;
  //   if (localStorage.getItem(key) !== null) {
  //     data = JSON.parse(localStorage.getItem(`${key}`));
  //   } else {
  //     data = [];
  //   }
  //   return data;
  // };

  // 2) setStorage получает ключ и объект в виде аргументов и дописывает
  // данные в localStorage
  // для этого с помощью getStorage необходимо данные получить,
  // дописать объект в массив и отправить после этого данные в localStorage
  const setStorage = (key, obj) => {
    const data = getStorage(key);
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
  };

  // 3) removeStorage получает в виде аргумента номер телефона,
  // и удаляет контакт из localStorage,
  // с логикой необходимо разобраться самостоятельно!
  const removeStorage = (phone) => {
    let data = getStorage('contacts');
    // удаляет все совпадения
    data = data.filter((item) => item.phone !== phone);
    // for (let item of data) {
    //   if (item.phone === phone) {
    //     data.splice(data.indexOf(item), 1);
    //   }
    // }

    // for (let key in data) {
    //   if (data[key].phone === phone) {
    //     data.splice(key, 1);
    //   }
    // }

    localStorage.removeItem('contacts');
    localStorage.setItem('contacts', JSON.stringify(data));
  };

  // Применить функции там где это необходимо
  // Проверить весь функционал, после перезагрузки страницы,
  // данные должны оставаться в таблице
  //  +1 балл
  // Если делали доп задание в уроке “События — Делегирование” с сортировкой,
  // то необходимо запомнить по какому полю была выполнена сортировка
  // и после перезагрузки страницы она должна сохранятся

  // const addContactData = (contact) => {
  //   data.push(contact);
  // };
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };
  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };
  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;
    return h1;
  };
  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };
  const createButtonsGroup = paramsArray => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');
    const buttons = paramsArray.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.className = className;
      button.type = type;
      button.textContent = text;
      return button;
    });
    btnWrapper.append(...buttons);
    // return btnWrapper;  Передаем в качестве объекта,
    // чтобы можно было вернуть несколько значений. =>
    return {
      btnWrapper,
      buttons,
    };
  };
  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `<tr>
             <th class="delete">Удалить</th>
             <th>Имя</th>
             <th>Фамилия</th>
             <th>Телефон</th>
            </tr>`);
    const tbody = document.createElement('tbody');
    table.tbody = tbody;
    table.append(thead, tbody);
    return table;
  };
  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
    <button class="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>
    <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input class="form-input" id="name"
        name="name" type="text" required>
     </div>
     <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" id="surname"
        name="surname" type="text" required>
     </div>
     <div class="form-group">
      <label class="form-label"        for="phone">Телефон:</label>
      <input class="form-input" id="phone"
        name="phone" type="number" required>
     </div>
    `);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);
    form.append(...buttonGroup.buttons);
    overlay.append(form);
    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footerContainer.textContent = `разработчик: Дэнис ©`;
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {overlay, form} = createForm();
    const btnClose = form.querySelector('.close');

    header.headerContainer.append(logo);
    // main.mainContainer.append(buttonGroup);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

    const footer = createFooter();

    app.append(header, main, footer);
    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.buttons[0],
      btnDel: buttonGroup.buttons[1],
      formOverlay: overlay,
      form,
      btnClose,
      thead: table.firstChild, // table.thead
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');

    // Добавить в каждую строку кнопку редактировать
    // (на кнопке текст или иконка на ваше усмотрение)
    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'Редактировать';
    buttonEdit.classList.add('edit', 'btn', 'btn-primary');
    tdEdit.append(buttonEdit);
    // Не обязательное: +1 балл

    phoneLink.href = `tel:${phone} `;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    return tr;
  };

  const renderContacts = (elem, data) => {
    try {
      const allRow = data?.map(createRow);
      elem.append(...allRow);
      return allRow;
    } catch {
      console.log('no data saved to render');
    }
  };

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
    const data = getStorage('contacts');
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
      // target.classList.contains('close')
      // btnClose
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
        removeStorage(delPhone);
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

      setStorage('contacts', newContact);
      // addContactData(newContact); больше не нужен

      form.reset(); // метод формы по умолчанию для очистки,
      // также можно навесить на кнопку в форме type='reset'
      closeModal();
    });
  };
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

