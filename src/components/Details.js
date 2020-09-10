import React from 'react';

const Details = ({ details, setDetails }) => {
  const lastPurch = Math.max(...details.purchaseDates);

  let futurePurch = lastPurch + details.frequency;
  let numOfPurch = details.purchaseDates.length;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getTime = date => {
    if (numOfPurch) {
      const fullDate = new Date(date);
      const dateArray = [
        fullDate.getFullYear() /*year*/,
        months[fullDate.getMonth()] /*month string*/,
        fullDate.getDate() /*date*/,
      ];
      return `${dateArray[1]} ${dateArray[2]}, ${dateArray[0]}`;
    } else {
      return 'This item has no purtchase history';
    }
  };

  console.log(getTime(futurePurch));

  return (
    <div className="background">
      <div className="modal">
        <div className="details-header">
          <button className="back-button" onClick={() => setDetails({})}>
            <span role="img" aria-label="carrot">
              &#60;
            </span>
          </button>
          <h2>Smart Shopping List</h2>
        </div>
        <h3>{details.name}</h3>
        <h4>Last Purchased: {getTime(lastPurch)} </h4>
        <h4>Next Purchuse date: {getTime(futurePurch)} </h4>
        <h4>
          You have purchused this item {numOfPurch} time
          {numOfPurch === 1 ? null : 's'}{' '}
        </h4>
      </div>
    </div>
  );
};

export default Details;
