import {useGoal} from "./GoalContext.jsx";
import React from "react";
import HomeForm from "../../ui/HomeForm.jsx";

const GoalForm = () => {
    const { goal, setGoal } = useGoal();

    const handleChange = (e) => {
        setGoal(e.target.value);
    };
    const handleSubmit = e => {
        localStorage.setItem('height', e.height);
        localStorage.setItem('weight', e.weight)
    }
    return (
        <>
            <h2 className="text-xl font-bold mb-4">Ввести цель тренировки</h2>
            <input
                type="text"
                value={goal}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                placeholder="Введите цель"
            />
            <HomeForm onSubmit={handleSubmit}/>

        </>
    );
};

export default GoalForm;
