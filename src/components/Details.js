import React from 'react';

const Details = ({ details, setDetails }) => {
  let numOfPurch = details.purchaseDates.length;
  const lastPurch = numOfPurch
    ? Math.max(...details.purchaseDates)
    : details.addedDate;
  let futurePurch = lastPurch + details.frequency;

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
    const fullDate = new Date(date);
    const dateArray = [
      fullDate.getFullYear() /*year*/,
      months[fullDate.getMonth()] /*month string*/,
      fullDate.getDate() /*date*/,
    ];
    return `${dateArray[1]} ${dateArray[2]}, ${dateArray[0]}`;
  };

  return (
    <div className="background">
      <div className="modal">
        <div className="details-header">
          <button className="back-button" onClick={() => setDetails({})}>
            <span role="img" aria-label="back to list">
              &#60;
            </span>
          </button>
          <h2>Smart Shopping List</h2>
        </div>
        <h3>{details.name}</h3>
        <h4>
          Last Purchase Date:{' '}
          {numOfPurch
            ? getTime(lastPurch)
            : 'This item has no purchase history'}{' '}
        </h4>
        <h4>Next Purchase Date: {getTime(futurePurch)} </h4>
        <h4>
          You have purchased this item {numOfPurch} time
          {numOfPurch === 1 ? null : 's'}.
        </h4>
      </div>
    </div>
  );
};

export default Details;
