import React from 'react';
import {useDispatch} from "react-redux";
import {updateScore, updateTotalCalories, updateTotalTime, updateTotalWorkouts} from "../builder/builderSlice.js";

const WorkoutSummary = ({ stats }) => {
    const SCORE_MULTIPLIER = 10;
    const dispatch = useDispatch();
    dispatch(updateTotalCalories(stats.caloriesBurned))
    dispatch(updateTotalTime(stats.totalTime))
    dispatch(updateTotalWorkouts(1))
    dispatch(updateScore(stats.exercisesCompleted * SCORE_MULTIPLIER))
    return (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                Итоги тренировки
            </h2>
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
                    <p className="text-blue-400 font-bold">Общее количество повторений</p>
                    <p className="text-2xl">{stats.totalReps}</p>
                </div>
                <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-pink-400 font-bold">Поднято веса</p>
                    <p className="text-2xl">{stats.totalWeight} кг</p>
                </div>
                <div className="bg-zinc-700 p-4 rounded-lg col-span-2">
                    <p className="text-green-400 font-bold">Сожжено калорий (примерно)</p>
                    <p className="text-2xl">{stats.caloriesBurned} ккал</p>
                </div>
            </div>
        </div>
    );
};

export default WorkoutSummary;
