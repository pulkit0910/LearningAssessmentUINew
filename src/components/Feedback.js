import React from 'react';

const Feedback = ({ feedback }) => {
    return (
        <div className="alert alert-success" role="alert">
            {feedback}
        </div>
    );
};

export default Feedback;
