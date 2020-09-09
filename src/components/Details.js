import React from 'react';

const Details = ({ details, setDetails }) => {
  const lastPurch = Math.max(...details.purchaseDates);
  let [lastMonth, lastDate, lastYear] = new Date(lastPurch)
    .toLocaleDateString()
    .split('/');
  console.log(new Date(lastPurch));

  return (
    <div className="background">
      <div className="modal">
        <button onClick={() => setDetails({})}>
          This will be a back arrow
        </button>
        <h2>Smart Shopping List</h2>
        <h3>{details.name}</h3>
        <h4>Last Purchased: </h4>
        <h4>Next Purchuse date: </h4>
      </div>
    </div>
  );
};

export default Details;
