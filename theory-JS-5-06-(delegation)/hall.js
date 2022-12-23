'use strict';
{
  const app = document.querySelector('#app');
  let countArea = 0;
  const createSeat = i => {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.dataset.seatNumber = i;
    return seat;
  };
  const createLine = (countLine, seatsInRow) => {
    const row = document.createElement('div');
    row.classList.add('row');
    row.dataset.rowNumber = countLine;

    for (let i = 1; i <= seatsInRow; i++) {
      row.append(createSeat(i));
    }
    return row;
  };
  const createArea = (x, y) => {
    countArea += 1;
    const area = document.createElement('div');
    area.classList.add('area');
    area.dataset.areaNumber = countArea;
    for (let i = 1; i <= x; i++) {
      area.append(createLine(i, y));
    }

    return area;
  };
  app.append(createArea(5, 6));
  app.append(createArea(8, 6));
  app.append(createArea(6, 6));

  app.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('seat')) {
      const seat = target.dataset.seatNumber;
      const row = target.closest('.row').dataset.rowNumber;
      const area = target.closest('.area').dataset.areaNumber;
      target.style.backgroundColor = 'tomato';

      alert(`Ваш зал №${area}, ряд ${row}, место ${seat}`);
    }
    console.log(e);
  });
}
