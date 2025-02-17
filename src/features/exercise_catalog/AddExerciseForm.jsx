import React from 'react';
import { useForm } from 'react-hook-form';
import GenerateInputs from "../../utils/GenerateInputs.jsx";
import Button from "../../ui/Button.jsx";

const AddExerciseForm = ({ onAddExercise }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        data.difficulty = parseInt(data.difficulty);
        onAddExercise(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">

            <GenerateInputs register={register} errors={errors}/>
            <Button type="submit" bgColor={'bg-linear-65 from-purple-500 to-pink-500'}>Добавить упражнение</Button>
        </form>
    );
};

export default AddExerciseForm;
