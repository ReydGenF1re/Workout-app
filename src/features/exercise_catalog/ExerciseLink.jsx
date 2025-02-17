import React from 'react';
import {NavLink} from "react-router-dom";

const ExerciseLink = ({exercise}) => {
    let difficulty;
    let difficultyColor;
    switch (exercise.difficulty) {
        case 1:
            difficulty = 'Легко';
            difficultyColor = 'text-cyan-500';
            break;
        case 2:
            difficulty = 'Средне';
            difficultyColor = 'text-violet-500';
            break;
        case 3:
            difficulty = 'Сложно';
            difficultyColor = 'text-pink-500';
            break;
        default:
            difficulty = 'Неизвестно';
    }
    return (
        <NavLink to={`/exercise/:${exercise.id}`} className={'p-3 sm:p-5 border-2 border-gray-500 rounded-lg text-md sm:text-lg gap-2 sm:gap-4 flex justify-between items-center'}>
            <span className={'break-all'}>{exercise.name}</span>
            <span className={`${difficultyColor} p-2 rounded-md w-[100px] text-center`}>{difficulty}</span>
        </NavLink>
    );
};

export default ExerciseLink;