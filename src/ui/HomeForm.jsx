import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";

function HomeForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg shadow-lg">
            <input
                {...register("height", { required: "Рост обязателен", min: { value: 100, message: "Минимальный рост 100 см" } })}
                type="number"
                placeholder="Рост (см)"
                className="w-full bg-zinc-900 mb-4 p-2 border rounded text-lg"
            />
            {errors.height && <p className="text-red-500 mb-2">{errors.height.message}</p>}

            <input
                {...register("weight", { required: "Вес обязателен", min: { value: 30, message: "Минимальный вес 30 кг" } })}
                type="number"
                placeholder="Вес (кг)"
                className="w-full bg-zinc-900 mb-4 p-2 border rounded text-lg"
            />
            {errors.weight && <p className="text-red-500 mb-2">{errors.weight.message}</p>}

            <Button type="submit" bgColor={"bg-linear-65 from-purple-500 to-pink-500"}>Сохранить</Button>
        </form>
    );
}

export default HomeForm;
