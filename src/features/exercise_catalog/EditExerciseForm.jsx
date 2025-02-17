import React from 'react';
import { useForm } from 'react-hook-form';
import GenerateInputs from "../../utils/GenerateInputs.jsx";
import Button from "../../ui/Button.jsx";

const EditExerciseForm = ({ exercise, onEditExercise, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...exercise,
        }
    });

    const onSubmit = (data) => {
        data.difficulty = parseInt(data.difficulty);
        onEditExercise(exercise.id, data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <GenerateInputs register={register} errors={errors}/>
            <Button type="submit" bgColor={'bg-linear-65 from-purple-500 to-pink-500'}>Сохранить изменения</Button>
            <Button type="button" fn={onCancel} >Отмена</Button>
        </form>
    );
};

export default EditExerciseForm;
