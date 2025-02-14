import React from 'react';
import { useForm } from 'react-hook-form';
import GenerateInputs from "../../utils/GenerateInputs.jsx";

const EditExerciseForm = ({ exercise, onEditExercise, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...exercise,
            muscleGroup: exercise.muscleGroup.join(', '),
            equipment: exercise.equipment.join(', ')
        }
    });

    const onSubmit = (data) => {
        data.muscleGroup = data.muscleGroup.split(',').map(item => item.trim());
        data.equipment = data.equipment.split(',').map(item => item.trim());
        data.difficulty = parseInt(data.difficulty);
        onEditExercise(exercise.id, data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <GenerateInputs register={register} errors={errors}/>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Сохранить изменения</button>
            <button type="button" onClick={onCancel} className="w-full p-2 bg-gray-500 text-white rounded">Отмена</button>
        </form>
    );
};

export default EditExerciseForm;
