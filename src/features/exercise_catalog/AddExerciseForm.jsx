import React from 'react';
import { useForm } from 'react-hook-form';
import GenerateInputs from "../../utils/GenerateInputs.jsx";

const AddExerciseForm = ({ onAddExercise }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        data.muscleGroup = data.muscleGroup.split(',').map(item => item.trim());
        data.equipment = data.equipment.split(',').map(item => item.trim());
        data.difficulty = parseInt(data.difficulty);
        onAddExercise(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <GenerateInputs register={register} errors={errors}/>

            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Добавить упражнение</button>
        </form>
    );
};

export default AddExerciseForm;
