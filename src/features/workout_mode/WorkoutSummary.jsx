import React, { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import {achievements} from "../../services/achievements.js";

const WorkoutSummary = ({ stats }) => {
    const SCORE_MULTIPLIER = 10;
    const isFirstRun = useRef(true);
    
    const getLocalStorageItem = (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Ошибка при чтении из localStorage (${key}):`, error);
            return defaultValue;
        }
    };

    const setLocalStorageItem = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Ошибка при записи в localStorage (${key}):`, error);
            toast.error('Не удалось сохранить прогресс. Проверьте настройки браузера.');
        }
    };

    const [unlockedAchievements, setUnlockedAchievements] = useState(
        getLocalStorageItem('achievements', [])
    );

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        
        const { caloriesBurned, totalTime, exercisesCompleted } = stats;

        const prevCalories = getLocalStorageItem('totalCalories', 0);
        const prevTime = getLocalStorageItem('totalTime', 0);
        const prevWorkouts = getLocalStorageItem('totalWorkouts', 0);
        const prevScore = getLocalStorageItem('score', 0);

        const newCalories = Math.round(prevCalories + caloriesBurned);
        const newTime = prevTime + totalTime;
        const newWorkouts = prevWorkouts + 1;
        const newScore = prevScore + (exercisesCompleted * SCORE_MULTIPLIER);

        setLocalStorageItem('totalCalories', newCalories);
        setLocalStorageItem('totalTime', newTime);
        setLocalStorageItem('totalWorkouts', newWorkouts);
        setLocalStorageItem('score', newScore);

        const newStats = { 
            totalCalories: newCalories, 
            totalTime: newTime, 
            totalWorkouts: newWorkouts, 
            exercisesCompleted 
        };

        const newAchievements = achievements.filter(achievement =>
            !unlockedAchievements.some(a => a.id === achievement.id) && 
            achievement.condition(newStats)
        );

        if (newAchievements.length > 0) {
            const updatedAchievements = [...unlockedAchievements, ...newAchievements];
            setUnlockedAchievements(updatedAchievements);
            setLocalStorageItem('achievements', updatedAchievements);

            newAchievements.forEach(achievement => {
                toast.success(`Поздравляем! Вы разблокировали достижение "${achievement.name}"!`);
            });
        }

    }, [stats, unlockedAchievements]);

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
