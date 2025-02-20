import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateScore, updateTotalCalories, updateTotalTime, updateTotalWorkouts } from '../builder/builderSlice.js';

const WorkoutSummary = ({ stats }) => {
    const SCORE_MULTIPLIER = 10;
    const dispatch = useDispatch();
    const isFirstRun = React.useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const { caloriesBurned, totalTime, exercisesCompleted } = stats;

        // Retrieve previous values from local storage and parse them to integers
        const prevCalories = Math.round(parseInt(localStorage.getItem('totalCalories'))) || 0;
        const prevTime = parseInt(localStorage.getItem('totalTime')) || 0;
        const prevWorkouts = parseInt(localStorage.getItem('totalWorkouts')) || 0;
        const prevScore = parseInt(localStorage.getItem('score')) || 0;

        // Calculate new values by adding the current stats
        const newCalories = Math.round(prevCalories + caloriesBurned);
        const newTime = prevTime + totalTime;
        const newWorkouts = prevWorkouts + 1;
        const newScore = prevScore + (exercisesCompleted * SCORE_MULTIPLIER);

        // Store updated values in local storage
        localStorage.setItem('totalCalories', newCalories);
        localStorage.setItem('totalTime', newTime);
        localStorage.setItem('totalWorkouts', newWorkouts);
        localStorage.setItem('score', newScore);
    }, []); // The empty array ensures the effect runs only once after the component mounts

    return (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500"> Итоги тренировки </h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-blue-400 font-bold">Время тренировки</p>
                    <p className="text-2xl">{stats.totalTime} сек</p>
                </div>
                <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-pink-400 font-bold">Выполнено упражнений</p>
                    <p className="text-2xl">{stats.exercisesCompleted}</p>
                </div>
                <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-pink-400 font-bold">Поднято веса</p>
                    <p className="text-2xl">{stats.totalWeight} кг</p>
                </div>
                <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-blue-400 font-bold">Сожжено калорий (примерно)</p>
                    <p className="text-2xl">{Math.round(stats.caloriesBurned)}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkoutSummary;
