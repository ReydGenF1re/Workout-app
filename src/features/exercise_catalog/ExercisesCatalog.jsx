import React, { useState } from 'react';
import { getExercises } from "../../services/apiExercises.js";
import { useLoaderData, useSearchParams } from "react-router-dom";
import ExerciseLink from "./ExerciseLink.jsx";
import ExercisesOperations from "./ExercisesOperations.jsx";
import AddExerciseForm from "./AddExerciseForm.jsx";
import toast from "react-hot-toast";
import Button from "../../ui/Button.jsx";
import useMuscleGroups from "../../utils/useMuscleGroups.js";

export async function loadExercises(){
    return await getExercises()
}

const ExercisesCatalog = () => {
    const data = useLoaderData();
    const [exercises, setExercises] = useState(data.exercises);
    const [searchParams] = useSearchParams();
    const [showAddForm, setShowAddForm] = useState(false);

    const muscleGroup = searchParams.get('muscleGroup') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const equipment = searchParams.get('equipment') || '';

    let filteredData = exercises;

    if (muscleGroup) {
        filteredData = filteredData.filter(exercise => exercise.muscleGroup.includes(muscleGroup));
    }

    if (difficulty) {
        filteredData = filteredData.filter(exercise => exercise.difficulty === parseInt(difficulty));
    }

    if (equipment) {
        filteredData = filteredData.filter(exercise => exercise.equipment.includes(equipment));
    }

    const handleAddExercise = (newExercise) => {
        newExercise.id = exercises.length + 1;
        const updatedExercises = [...exercises, newExercise];
        setExercises(updatedExercises);
        localStorage.setItem('exercises', JSON.stringify({ exercises: updatedExercises }));
        setShowAddForm(false);
        toast.success('Новое упражнение успешно добавлено');
    };
    const muscleGroups = useMuscleGroups()
    return (
        <div>
            <div className={'flex justify-between items-center flex-col sm:flex-row mb-6'}>
                <ExercisesOperations isSelect={true} muscleGroups={muscleGroups}/>
                <Button
                    fn={() => setShowAddForm(!showAddForm)}
                    bgColor={'bg-linear-to-bl from-violet-500 to-fuchsia-500'}
                >
                    {showAddForm ? 'Скрыть форму' : 'Добавить упражнение'}
                </Button>
            </div>

            {showAddForm && <AddExerciseForm onAddExercise={handleAddExercise} />}
            <ul className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}>
                {filteredData.map(exercise => <ExerciseLink key={exercise.id} exercise={exercise}/>)}
            </ul>
        </div>
    );
};

export default ExercisesCatalog;
