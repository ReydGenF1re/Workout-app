import React, { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import {achievements} from "../../services/achievements.js";

const WorkoutSummary = ({ stats }) => {
    const SCORE_MULTIPLIER = 10;
    const isFirstRun = useRef(true);

    const getLocalStorageItem = (key, defaultValue) => {
        try {
            console.log(`Пытаемся получить ${key} из localStorage`);
            const item = localStorage.getItem(key);
            console.log(`Значение ${key}:`, item);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Ошибка при чтении из localStorage (${key}):`, error);
            return defaultValue;
        }
    };

    const setLocalStorageItem = (key, value) => {
        try {
            console.log(`Пытаемся записать ${key} в localStorage:`, value);
            localStorage.setItem(key, JSON.stringify(value));
            // Проверяем, записалось ли значение
            const savedValue = localStorage.getItem(key);
            console.log(`Проверка записи ${key}:`, savedValue);
        } catch (error) {
            console.error(`Ошибка при записи в localStorage (${key}):`, error);
            toast.error('Не удалось сохранить прогресс. Проверьте настройки браузера.');
        }
    };

    // Добавим логирование начального состояния
    console.log('Initial stats:', stats);

    const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
        const saved = getLocalStorageItem('achievements', []);
        console.log('Initial achievements:', saved);
        return saved;
    });

    useEffect(() => {
        console.log('useEffect triggered, isFirstRun:', isFirstRun.current);

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const { caloriesBurned, totalTime, exercisesCompleted } = stats;
        console.log('Current workout stats:', { caloriesBurned, totalTime, exercisesCompleted });

        const prevCalories = getLocalStorageItem('totalCalories', 0);
        const prevTime = getLocalStorageItem('totalTime', 0);
        const prevWorkouts = getLocalStorageItem('totalWorkouts', 0);
        const prevScore = getLocalStorageItem('score', 0);

        console.log('Previous values:', { prevCalories, prevTime, prevWorkouts, prevScore });

        const newCalories = Math.round(prevCalories + caloriesBurned);
        const newTime = prevTime + totalTime;
        const newWorkouts = prevWorkouts + 1;
        const newScore = prevScore + (exercisesCompleted * SCORE_MULTIPLIER);

        console.log('New values to save:', { newCalories, newTime, newWorkouts, newScore });

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

        console.log('Checking for new achievements with stats:', newStats);

        const newAchievements = achievements.filter(achievement => {
            const isUnlocked = !unlockedAchievements.some(a => a.id === achievement.id);
            const isConditionMet = achievement.condition(newStats);
            console.log(`Achievement ${achievement.name}: unlocked=${isUnlocked}, conditionMet=${isConditionMet}`);
            return isUnlocked && isConditionMet;
        });

        console.log('New achievements:', newAchievements);

        if (newAchievements.length > 0) {
            const updatedAchievements = [...unlockedAchievements, ...newAchievements];
            console.log('Updating achievements:', updatedAchievements);
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
