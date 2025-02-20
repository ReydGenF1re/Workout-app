import React from 'react';

import CharacterElement from "./CharacterElement.jsx";
import Store from "./Store.jsx";

const Character = () => {
    const totalWorkouts = localStorage.getItem('totalWorkouts') || 0;
    const totalCalories = localStorage.getItem('totalCalories') || 0;
    const totalTime = localStorage.getItem('totalTime') || 0;
    const score = localStorage.getItem('score') || 0;
    const [showStore, setShowStore] = React.useState(false);
    const handleCustomize = () => {
    };

    const handleShowStore = () => {
        setShowStore(show => !show);
    };

    return (
        <div className="w-full h-full flex-col  gap-6 flex justify-center items-center sm:flex-row">
            <div className="w-full h-full max-h-[600px] rounded-lg shadow-lg overflow-hidden relative">
                <CharacterElement/>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 text-center">
                <div className="text-cyan-500 text-xl mb-2">Сожжено калорий: <div
                    className={'text-pink-500'}> {totalCalories}</div></div>
                <div className="text-cyan-500 text-xl mb-2">Получено очков всего:
                    <div
                        className={'text-pink-500'}>  {score}</div>
                </div>
                <div className="text-cyan-500 text-xl">Пройдено тренировок: <div
                    className={'text-pink-500'}> {totalWorkouts} </div>
                </div>
                <div className="text-cyan-500 text-xl">Всего ты занимался: <div
                    className={'text-pink-500'}>  {Math.round(totalTime / 60)} мин.</div></div>
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleShowStore}>
                    Магазин
                </button>
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                >
                    Выбрать цель тренировки
                </button>
            </div>
            {showStore && <Store/>}
        </div>
    );
};

export default Character;
