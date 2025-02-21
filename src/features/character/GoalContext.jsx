import React, { createContext, useContext, useState, useEffect } from 'react';

const GoalContext = createContext();

export const useGoal = () => useContext(GoalContext);

export const GoalProvider = ({ children }) => {
    const [goal, setGoal] = useState(localStorage.getItem('goal') || '');

    useEffect(() => {
        localStorage.setItem('goal', goal);
    }, [goal]);

    return (
        <GoalContext.Provider value={{ goal, setGoal }}>
            {children}
        </GoalContext.Provider>
    );
};
