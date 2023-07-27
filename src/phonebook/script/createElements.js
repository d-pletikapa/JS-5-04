import image from '../img/icon.svg';

const createImageLogo = () => {
  const img = document.createElement('img');
  img.src = image;
  return img;
};

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
export const createRow = ({name: firstName, surname, phone}) => {
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

  // Добавить в каждую строку кнопку редактировать Не обязательное: +1 балл
  const tdEdit = document.createElement('td');
  const buttonEdit = document.createElement('button');
  buttonEdit.textContent = 'Редактировать';
  buttonEdit.classList.add('edit', 'btn', 'btn-primary');
  tdEdit.append(buttonEdit);

  phoneLink.href = `tel:${phone} `;
  phoneLink.textContent = phone;
  tr.phoneLink = phoneLink;
  tdPhone.append(phoneLink);
  tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
  return tr;
};
export default {
  createImageLogo,
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
};
