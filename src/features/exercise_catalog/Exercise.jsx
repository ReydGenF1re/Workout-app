import React from 'react';
import {getExercise} from "../../services/apiExercises.js";
import {useLoaderData} from "react-router-dom";
export async function exerciseLoader({params}){
    return await getExercise(params.exerciseId);
}
const Exercise = () => {
    const exercise = useLoaderData();
    console.log(exercise)
    return (
        <div>
            Exercise
        </div>
    );
};

export default Exercise;