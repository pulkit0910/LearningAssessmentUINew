import React, { useState } from 'react';
import './Feedback.css';

const FeedbackCard = ({ feedback }) => {
    return (
        <div className="feedback-card">
            <h3>{feedback.question}</h3>
            <p><strong>Answer:</strong> {feedback.answer}</p>
            <p><strong>Positive Comments:</strong> {feedback.positiveComment}</p>
            <p><strong>Improvement Areas:</strong> {feedback.improvementAreas}</p>
            <p><strong>Accuracy:</strong> {feedback.accuracy}%</p>
            {feedback.references && <p><strong>References:</strong> {feedback.references}</p>}
        </div>
    );
};

const Feedback = ({ feedback }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { individualFeedbackSummary, overallAccuracy } = feedback;

    const handleNextCard = () => {
        setCurrentCardIndex(currentCardIndex === individualFeedbackSummary.length - 1 ? 0 : currentCardIndex + 1);
    };

    const handlePrevCard = () => {
        setCurrentCardIndex(currentCardIndex === 0 ? individualFeedbackSummary.length - 1 : currentCardIndex - 1);
    };

    return (
        <div className="feedback-container">
            <h2>Feedback Summary</h2>
            <div className="feedback-card-container">
                {individualFeedbackSummary.length > 0 && (
                    <>
                        <div className="navigation-arrow left-arrow" onClick={handlePrevCard}></div>
                        <FeedbackCard feedback={individualFeedbackSummary[currentCardIndex]} />
                        <div className="navigation-arrow right-arrow" onClick={handleNextCard}></div>
                    </>
                )}
            </div>
            <div className="overall-accuracy">
                <h3>Overall Accuracy: {overallAccuracy}%</h3>
            </div>
        </div>
    );
};

export default Feedback;
