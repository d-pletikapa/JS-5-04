import createElements from './createElements';
const {
  createImageLogo,
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createRow,
} = createElements;

export const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const imageLogo = createImageLogo();
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

  header.headerContainer.append(imageLogo, logo);
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
    thead: table.firstChild, // это table.thead
  };
};
export const renderContacts = (elem, data) => {
  try {
    const allRow = data?.map(createRow);
    elem.append(...allRow);
    return allRow;
  } catch {
    console.log('no data saved to render');
  }
};

