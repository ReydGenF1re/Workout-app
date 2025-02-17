import React, { useState } from 'react';
import { getExercise } from "../../services/apiExercises.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import EditExerciseForm from './EditExerciseForm';
import toast from "react-hot-toast";
import Button from "../../ui/Button.jsx";

export async function exerciseLoader({params}){
    return await getExercise(params.exerciseId);
}

const Exercise = () => {
    const [exercise, setExerciseData] = useState(useLoaderData());
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить это упражнение?')) {
            let exercises = JSON.parse(localStorage.getItem('exercises'));
            exercises.exercises = exercises.exercises.filter(ex => ex.id !== exercise.id);
            localStorage.setItem('exercises', JSON.stringify(exercises));
            toast.success('Упражнение успешно удалено');
            navigate('/exercises');
        }
    }
    const handleEditClick = () => {
        setIsEditing(true);
    };


    const handleEditSubmit = (id, updatedExercise) => {
        let exercises = JSON.parse(localStorage.getItem('exercises'));
        exercises.exercises = exercises.exercises.map(ex =>
            ex.id === id ? { ...ex, ...updatedExercise } : ex
        );
        localStorage.setItem('exercises', JSON.stringify(exercises));
        setExerciseData(updatedExercise);
        setIsEditing(false);
        toast.success('Упражнение успешно обновлено');
    };


    const handleEditCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditExerciseForm
                exercise={exercise}
                onEditExercise={handleEditSubmit}
                onCancel={handleEditCancel}
            />
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <img src={`${exercise.image}`} alt={exercise.description} className="w-full object-cover rounded-lg mb-6"/>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{exercise.name}</h1>
            <p className="text-gray-600 mb-6">{exercise.description}</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Группа мышц:</h2>
                <ul className="list-disc list-inside text-gray-600">
                    {exercise.muscleGroup.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Оборудование:</h2>
                <ul className="list-disc list-inside text-gray-600">
                    {exercise.equipment.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-6 flex justify-between">
                <Button
                    fn={handleEditClick}
                    bgColor="bg-linear-to-r from-cyan-500 to-blue-500"
                >
                    Редактировать
                </Button>
                <Button
                    fn={handleDelete}
                    bgColor="bg-linear-65 from-purple-500 to-pink-500"
                >
                    Удалить
                </Button>
            </div>

        </div>
    );
};

export default Exercise;
