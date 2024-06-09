import React, { useState } from 'react';
import SkillSelector from './components/SkillSelector';
import SubTopicSelector from './components/SubTopicSelector';
import ScenarioQuiz from './components/ScenarioQuiz';
import ProgressBar from './components/ProgressBar';
import Feedback from './components/Feedback';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const App = () => {
    const [selectedSkill, setSelectedSkill] = useState('');
    const [subTopics, setSubTopics] = useState([]);
    const [selectedSubTopics, setSelectedSubTopics] = useState([]);
    const [scenarios, setScenarios] = useState([]);
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSkillSelect = async (skill) => {
        setSelectedSkill(skill);
        setSelectedSubTopics([]);
        setScenarios([]);
        setCurrentScenarioIndex(0);
        setFeedback(null);
        setProgress(0);

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8199/ask/getSubTopics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: skill }),
            });
            const data = await response.json();
            setSubTopics(data.subTopics || []);
        } catch (error) {
            console.error('Error fetching subtopics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubTopicSelect = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8199/ask/getScenarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: selectedSubTopics.join(', ') }),
            });
            const data = await response.json();

            const allScenarios = data.flatMap(topic => topic.scenarios.map(sc => ({
                ...sc,
                technicaltopic: topic.technicaltopic
            })));

            setScenarios(allScenarios);
        } catch (error) {
            console.error('Error fetching scenarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScenarioSubmit = async (answer) => {
        const currentScenario = scenarios[currentScenarioIndex];
        const scenarioNo = currentScenarioIndex + 1;

        try {
            await fetch('http://localhost:8199/ask/saveScenario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: currentScenario.scenario,
                    answer: answer,
                    index: scenarioNo,
                }),
            });
        } catch (error) {
            console.error('Error saving scenario:', error);
        }

        const nextIndex = currentScenarioIndex + 1;
        if (nextIndex < scenarios.length) {
            setCurrentScenarioIndex(nextIndex);
            setProgress(Math.round(((nextIndex) / scenarios.length) * 100));
        } else {
            setCurrentScenarioIndex(-1);
            setProgress(100);
        }
    };

    const handleSubmitInterview = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8199/ask/getFeedback', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setFeedback(data);
        } catch (error) {
            console.error('Error submitting interview:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Upskill Yourself</h1>
            <SkillSelector skills={['Java', 'React', 'Node', 'DSA', 'Microservice', 'SQL', 'Devops', 'Cloud', 'LLM', 'Python']} onSkillSelect={handleSkillSelect} />
            {selectedSkill && !scenarios.length && (
                <SubTopicSelector
                    subTopics={subTopics}
                    selectedSubTopics={selectedSubTopics}
                    setSelectedSubTopics={setSelectedSubTopics}
                    onConfirm={handleSubTopicSelect}
                />
            )}
            {scenarios.length > 0 && currentScenarioIndex >= 0 && (
                <ScenarioQuiz
                    scenario={scenarios[currentScenarioIndex]}
                    scenarioIndex={currentScenarioIndex}
                    totalScenarios={scenarios.length}
                    onSubmit={handleScenarioSubmit}
                />
            )}
            {currentScenarioIndex === -1 && !feedback && (
                <div className="completion-message">
                    <h3>All scenarios completed!</h3>
                    <button className="btn btn-primary" onClick={handleSubmitInterview}>Submit Interview</button>
                </div>
            )}
            {progress > 0 && <ProgressBar progress={progress} />}
            {feedback && <Feedback feedback={feedback} />}
            {loading && <LoadingSpinner />}
        </div>
    );
};

export default App;
