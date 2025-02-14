import React from 'react';

const GenerateInputs = ({register, errors}) => {
    return (
        <>
            <input
                {...register("name", { required: "Это поле обязательно" })}
                placeholder="Название упражнения"
                className="w-full p-2 border rounded"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}

            <textarea
                {...register("description", { required: "Это поле обязательно" })}
                placeholder="Описание упражнения"
                className="w-full p-2 border rounded"
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}

            <input
                {...register("muscleGroup", { required: "Это поле обязательно" })}
                placeholder="Группы мышц (через запятую)"
                className="w-full p-2 border rounded"
            />
            {errors.muscleGroup && <span className="text-red-500">{errors.muscleGroup.message}</span>}

            <select
                {...register("difficulty", { required: "Это поле обязательно" })}
                className="w-full p-2 border rounded bg-black text-white"
            >
                <option value="1">Легкая</option>
                <option value="2">Средняя</option>
                <option value="3">Сложная</option>
            </select>
            {errors.difficulty && <span className="text-red-500">{errors.difficulty.message}</span>}

            <input
                {...register("equipment", { required: "Это поле обязательно" })}
                placeholder="Оборудование (через запятую)"
                className="w-full p-2 border rounded"
            />
            {errors.equipment && <span className="text-red-500">{errors.equipment.message}</span>}

            <input
                {...register("image", { required: "Это поле обязательно" })}
                placeholder="URL изображения"
                className="w-full p-2 border rounded"
            />
            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
        </>
    );
};

export default GenerateInputs;