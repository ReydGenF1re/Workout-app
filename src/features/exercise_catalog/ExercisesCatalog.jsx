import React from 'react';
import {getExercises} from "../../services/apiExercises.js";
import {useLoaderData} from "react-router-dom";
import ExerciseLink from "./ExerciseLink.jsx";

export async function loadExercises(){
    return await getExercises()
}
const ExercisesCatalog = () => {
    const data = useLoaderData();
    return (
        <ul className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'}>
            {data.exercises.map(exercise => <ExerciseLink key={exercise.id} exercise={exercise}/>)}
        </ul>
    );
};

export default ExercisesCatalog;