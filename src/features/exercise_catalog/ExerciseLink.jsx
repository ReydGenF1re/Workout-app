import React from 'react';
import {NavLink} from "react-router-dom";

const ExerciseLink = ({exercise}) => {
    let difficulty;
    let difficultyColor;
    switch (exercise.difficulty) {
        case 1:
            difficulty = 'Легко';
            difficultyColor = 'bg-green-500';
            break;
        case 2:
            difficulty = 'Средне';
            difficultyColor = 'bg-yellow-500';
            break;
        case 3:
            difficulty = 'Сложно';
            difficultyColor = 'bg-red-500';
            break;
        default:
            difficulty = 'Неизвестно';
    }
    return (
        <NavLink to={`/exercise/:${exercise.id}`} className={'p-5 border-2 border-white rounded-lg text-xl gap-4 flex justify-between items-center'}>
            <span className={'break-all'}>{exercise.name}</span>
            <span className={`${difficultyColor} p-2 rounded-md`}>{difficulty}</span>
        </NavLink>
    );
};

export default ExerciseLink;