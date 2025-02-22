import React, {useEffect, useState} from 'react';
import CharacterElement from "./CharacterElement.jsx";
import Store from "./Store.jsx";
import Button from "../../ui/Button.jsx";
import {GoalProvider, useGoal} from './GoalContext';
import Modal from "../../ui/Modal.jsx";
import GoalForm from "./GoalModal.jsx";
import AudioPlayer from "../../ui/AudioPlayer.jsx";
import {useNavigate} from "react-router-dom";

const Character = () => {
    const totalWorkouts = localStorage.getItem('totalWorkouts') || 0;
    const totalCalories = localStorage.getItem('totalCalories') || 0;
    const totalTime = localStorage.getItem('totalTime') || 0;
    const score = localStorage.getItem('score') || 0;
    const [showStore, setShowStore] = useState(false);
    const [boughtCharacters, setBoughtCharacters] = useState(JSON.parse(localStorage.getItem('purchasedCharacters')) || []);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const navigate = useNavigate();
    const defaultAudioFile = '/music/fortuna.mp3';

    // Эффект для создания события загрузки аудио при монтировании
    useEffect(() => {
        const audioEvent = new Event('audioLoad');
        audioEvent.audioPath = defaultAudioFile;
        window.dispatchEvent(audioEvent);
    }, []);
    const handleBuyCharacter = () => {
        setBoughtCharacters([...boughtCharacters, 'BBNO$']);
    };

    const handleShowStore = () => {
        setShowStore(show => !show);
    };

    const handleShowGoalModal = () => {
        setShowGoalModal(show => !show);
    };

    return (
        <GoalProvider>
            <div
                className="w-full max-sm:h-full h-[70vh] flex flex-col gap-6 justify-center items-center sm:flex-row mt-4">
                <div className="w-full h-[300px] sm:h-full max-h-[600px] rounded-lg shadow-lg overflow-hidden relative">
                    <CharacterElement boughtCharacters={boughtCharacters}/>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 text-center">
                    <div className={'flex justify-center items-center gap-4'}>
                        <GoalDisplay/>
                    </div>
                    <div className="text-cyan-500 text-xl mb-2">Сожжено калорий: <div
                        className={'text-pink-500'}> {totalCalories}</div></div>
                    <div className="text-cyan-500 text-xl mb-2">Получено очков всего: <div
                        className={'text-pink-500'}>  {score}</div></div>
                    <div className="text-cyan-500 text-xl">Пройдено тренировок: <div
                        className={'text-pink-500'}> {totalWorkouts} </div></div>
                    <div className="text-cyan-500 text-xl">Всего ты занимался: <div
                        className={'text-pink-500'}>  {Math.round(totalTime / 60)} мин.</div></div>
                    <Button bgColor={'bg-linear-to-bl from-violet-500 to-fuchsia-500'}
                            fn={handleShowStore}>Магазин</Button>
                    <Button bgColor={'bg-linear-to-bl from-violet-500 to-fuchsia-500'} fn={handleShowGoalModal}>Выбрать
                        цель тренировки</Button>

                </div>
                {showStore && (
                    <Modal onClose={handleShowStore}>
                        <Store onBuyCharacter={handleBuyCharacter}/>
                    </Modal>
                )}
                {showGoalModal && (
                    <Modal onClose={handleShowGoalModal}>
                        <GoalForm/>
                    </Modal>
                )}
            </div>
            <div>
                <AudioPlayer defaultAudioFile={defaultAudioFile}
                             autoplay={true}/>
                {/*В чате сказали, что можно сделать такую кнопку, чтобы вам было легче проверять*/}
                <button onClick={() => {
                    localStorage.setItem('totalWorkouts', 9999);
                    localStorage.setItem('totalCalories', 9999);
                    localStorage.setItem('totalTime', 9999);
                    localStorage.setItem('score', 9999);
                    localStorage.setItem('purchasedCharacters', JSON.stringify(['BBNO$']));
                    localStorage.setItem('goal', 'Я ГИГАЧАД😎');
                    navigate(0)
                }} className={'absolute bottom-4 right-4'}>Режим разработчика</button>
            </div>
        </GoalProvider>
    );
};

const GoalDisplay = () => {
    const {goal} = useGoal();
    return goal ? (
        <div className="text-cyan-500 text-2xl mb-4">Цель: <span className="text-pink-500">{goal}</span></div>
    ) : null;
};

export default Character;
