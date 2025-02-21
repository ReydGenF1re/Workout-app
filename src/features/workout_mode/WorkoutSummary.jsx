import React, { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import {achievements} from "../../services/achievements.js";

const WorkoutSummary = ({ stats }) => {
    const SCORE_MULTIPLIER = 10;
    console.log('WorkoutSummary render, получены stats:', stats);

    // Сразу при рендере сохраняем прогресс
    const saveProgress = () => {
        const { caloriesBurned, totalTime, exercisesCompleted } = stats;

        // Получаем текущие значения
        const prevCalories = JSON.parse(localStorage.getItem('totalCalories')) || 0;
        const prevTime = JSON.parse(localStorage.getItem('totalTime')) || 0;
        const prevWorkouts = JSON.parse(localStorage.getItem('totalWorkouts')) || 0;
        const prevScore = JSON.parse(localStorage.getItem('score')) || 0;

        // Вычисляем новые значения
        const newCalories = Math.round(prevCalories + caloriesBurned);
        const newTime = prevTime + totalTime;
        const newWorkouts = prevWorkouts + 1;
        const newScore = prevScore + (exercisesCompleted * SCORE_MULTIPLIER);

        // Сохраняем значения
        localStorage.setItem('totalCalories', JSON.stringify(newCalories));
        localStorage.setItem('totalTime', JSON.stringify(newTime));
        localStorage.setItem('totalWorkouts', JSON.stringify(newWorkouts));
        localStorage.setItem('score', JSON.stringify(newScore));

        console.log('Сохранены новые значения:', {
            totalCalories: newCalories,
            totalTime: newTime,
            totalWorkouts: newWorkouts,
            score: newScore
        });

        // Проверяем достижения
        const savedAchievements = localStorage.getItem('achievements');
        const unlockedAchievements = savedAchievements ? JSON.parse(savedAchievements) : [];

        const newStats = {
            totalCalories: newCalories,
            totalTime: newTime,
            totalWorkouts: newWorkouts,
            exercisesCompleted
        };

        const newAchievements = achievements.filter(achievement => {
            return !unlockedAchievements.some(a => a.id === achievement.id) &&
                achievement.condition(newStats);
        });

        if (newAchievements.length > 0) {
            const updatedAchievements = [...unlockedAchievements, ...newAchievements];
            localStorage.setItem('achievements', JSON.stringify(updatedAchievements));

            newAchievements.forEach(achievement => {
                toast.success(`Поздравляем! Вы разблокировали достижение "${achievement.name}"!`);
            });
        }
    };

    // Вызываем функцию сохранения сразу при рендере
    if (stats.caloriesBurned > 0) {  // Проверяем, что тренировка была
        console.log('Вызываем saveProgress');
        saveProgress();
    }

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
