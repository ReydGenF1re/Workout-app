import React from 'react';
import {useSearchParams} from "react-router-dom";

const ExercisesOperations = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const onSort = (category, value) => {
        searchParams.set(category, value)
        setSearchParams(searchParams)
    }
    return (
        <div className="mb-6 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Сортировка упражнений</h2>
            <div className="flex flex-wrap gap-4">
                <select
                    className="p-2 border-2 rounded-md bg-black border-gray-500"
                    onChange={(e) => onSort('muscleGroup', e.target.value)}
                >
                    <option value="">Группа мышц</option>
                    <option value="Ноги">Ноги</option>
                    <option value="Грудь">Грудь</option>
                    <option value="Спина">Спина</option>
                    <option value="Плечи">Плечи</option>
                    <option value="Руки">Руки</option>
                    <option value="Пресс">Пресс</option>
                </select>

                <select
                    className="p-2 border-2 rounded-md bg-black border-gray-500"
                    onChange={(e) => onSort('difficulty', e.target.value)}
                >
                    <option value="">Сложность</option>
                    <option value="1">Легкая</option>
                    <option value="2">Средняя</option>
                    <option value="3">Сложная</option>
                </select>

                <select
                    className="p-2 border-2 rounded-md bg-black border-gray-500"
                    onChange={(e) => onSort('equipment', e.target.value)}
                >
                    <option value="">Оборудование</option>
                    <option value="Не требуется">Без оборудования</option>
                    <option value="Гантели">Гантели</option>
                    <option value="Штанга">Штанга</option>
                    <option value="Турник">Турник</option>
                    <option value="Скамья">Скамья</option>
                </select>
            </div>
        </div>
    );
};

export default ExercisesOperations;
