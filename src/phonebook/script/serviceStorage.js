export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
// const getStorage = (key) => {
//   let data;
//   if (localStorage.getItem(key) !== null) {
//     data = JSON.parse(localStorage.getItem(`${key}`));
//   } else {
//     data = [];
//   }
//   return data;
// };

export const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = (phone) => {
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

