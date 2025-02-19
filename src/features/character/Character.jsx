import React, {Suspense, useRef, useState, useEffect, useMemo} from 'react';
import {Canvas} from "@react-three/fiber";
import CharacterModel from "./CharacterModel.jsx";
import NightSky from "./NightSky.jsx";
import EnergyParticles from "./EnergyParticles.jsx";
import CharacterElement from "./CharacterElement.jsx";
import {useSelector} from "react-redux";

const Character = () => {
    const totalWorkouts = useSelector(state => state.workout.totalWorkouts);
    const totalCalories = useSelector(state => state.workout.totalCalories);
    const totalTime = useSelector(state => state.workout.totalTime);
    const score = useSelector(state => state.workout.score);


    const handleCustomize = () => {
    };

    const handleUpdateStats = () => {
    };

    return (
        <div className="w-full h-full flex-col  gap-6 flex justify-center items-center sm:flex-row">
            <div className="w-full h-full max-h-[600px] rounded-lg shadow-lg overflow-hidden relative">
                <CharacterElement/>
            </div>
            <div>
                <div className="text-cyan-500 text-xl mb-2">Сожжено калорий: <span
                    className={'text-pink-500'}> {totalCalories}</span></div>
                <div className="text-cyan-500 text-xl mb-2">Получено очков всего:<span
                    className={'text-pink-500'}>  {score}</span></div>
                <div className="text-cyan-500 text-xl">Пройдено тренировок: <span
                    className={'text-pink-500'}> {totalWorkouts} </span>
                </div>
                <div className="text-cyan-500 text-xl">Всего ты занимался: <span
                    className={'text-pink-500'}>  {totalTime / 60} минут </span></div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleCustomize}>
                    Customize
                </button>
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleUpdateStats}>
                    Update Stats
                </button>
            </div>
        </div>
    );
};

export default Character;
