import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import useMuscleGroups from "../../utils/useMuscleGroups.js";
import {useDispatch, useSelector} from "react-redux";
import {setAllWorkouts, setExercises} from "../builder/builderSlice.js";
import MusclesSelector from "../../ui/MusclesSelector.jsx";
import EquipmentSelector from "../../ui/EquipmentSelector.jsx";

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
                <MusclesSelector isSelect={true} onChange={(e) => onSort('muscleGroup', e.target.value)}/>
                <select
                    className="p-2 border-2 rounded-md bg-black border-gray-500"
                    onChange={(e) => onSort('difficulty', e.target.value)}
                >
                    <option value="">Сложность</option>
                    <option value="1">Легкая</option>
                    <option value="2">Средняя</option>
                    <option value="3">Сложная</option>
                </select>
                <EquipmentSelector isSelect={true} onChange={(e) => onSort('equipment', e.target.value)} />
            </div>
        </div>
    );
};

export default ExercisesOperations;
