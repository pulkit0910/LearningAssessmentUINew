import React, { useState } from 'react';
import SkillSelector from './components/SkillSelector';
import SubTopicSelector from './components/SubTopicSelector';
import ScenarioQuiz from './components/ScenarioQuiz';
import ProgressBar from './components/ProgressBar';
import Feedback from './components/Feedback';
import CompletionScreen from './components/CompletionScreen';
import CustomLoading from './components/CustomLoading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [selectedSkill, setSelectedSkill] = useState('');
    const [subTopics, setSubTopics] = useState([]);
    const [selectedSubTopics, setSelectedSubTopics] = useState([]);
    const [scenarios, setScenarios] = useState([]);
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSkillSelect = async (skill) => {
        setSelectedSkill(skill);
        setSelectedSubTopics([]);
        setScenarios([]);
        setCurrentScenarioIndex(0);
        setFeedback('');
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

        setLoading(true);
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
        } finally {
            setLoading(false);
        }

        const nextIndex = currentScenarioIndex + 1;
        if (nextIndex < scenarios.length) {
            setCurrentScenarioIndex(nextIndex);
            setProgress(Math.round((nextIndex / scenarios.length) * 100));
        } else {
            setCurrentScenarioIndex(-1);
            setProgress(100);
        }
    };

    const handleSubmitInterview = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8199/ask/getFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setFeedback(data.feedback || 'Interview submitted successfully!');
        } catch (error) {
            console.error('Error submitting interview:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Upskill Yourself</h1>
            <SkillSelector 
                skills={['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Data Structures & Algorithms', 'Microservices', 'SQL', 'DevOps', 'Cloud Computing', 'LLM', 'CSS', 'HTML']} 
                onSkillSelect={handleSkillSelect} 
            />
            {selectedSkill && !scenarios.length && (
                <SubTopicSelector
                    subTopics={subTopics}
                    selectedSubTopics={selectedSubTopics}
                    setSelectedSubTopics={setSelectedSubTopics}
                    onConfirm={handleSubTopicSelect}
                />
            )}
            {loading && <CustomLoading />}
            {!loading && scenarios.length > 0 && currentScenarioIndex >= 0 && (
                <ScenarioQuiz
                    scenario={scenarios[currentScenarioIndex]}
                    scenarioIndex={currentScenarioIndex}
                    totalScenarios={scenarios.length}
                    onSubmit={handleScenarioSubmit}
                />
            )}
            {!loading && currentScenarioIndex === -1 && (
                <CompletionScreen onSubmitInterview={handleSubmitInterview} />
            )}
            {!loading && progress > 0 && <ProgressBar progress={progress} />}
            {!loading && feedback && <Feedback feedback={feedback} />}
        </div>
    );
};

export default App;
