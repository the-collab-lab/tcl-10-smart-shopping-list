import React from 'react';

const Details = ({ details, setDetails }) => {
  return (
    <div className="background">
      <div className="modal">
        <button onClick={() => setDetails({})}>
          This will be a back arrow
        </button>
        <h4>I am a modal</h4>
      </div>
    </div>
  );
};

export default Details;
