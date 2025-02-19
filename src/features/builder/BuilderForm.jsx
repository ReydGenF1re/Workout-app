import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import toast from "react-hot-toast";
import {
    addSelectedExercise,
    removeSelectedExercise,
    updateSelectedExercise,
    setWorkoutName,
    setUserWeight,
    setAllWorkouts,
    clearWorkout
} from './builderSlice.js';
import BuilderSelector from "./BuilderSelector.jsx";
import {useSearchParams} from "react-router-dom";
import Button from "../../ui/Button.jsx";

const BuilderForm = ({onClose}) => {
    const dispatch = useDispatch();
    const {exercises, selectedExercises, workoutName, userWeight, allWorkouts} = useSelector((state) => state.workout);
    const [searchParams] = useSearchParams();
    const muscleGroup = searchParams.get('muscleGroup') || '';
    let filteredData = exercises;

    if (muscleGroup) {
        filteredData = filteredData.filter(exercise => exercise.muscleGroup.includes(muscleGroup));
    }


    const calculateReps = (exercise) => {
        return Math.floor((userWeight / 10) + Math.random() * 5) + 5;
    };
    const calculateTime = (exercise) => {
        return Math.floor(Math.random() * 30) + 30;
    };


    const calculateWeight = (exercise) => {
        return Math.floor(userWeight * (0.3 + Math.random() * 0.4));
    };

    const checkHighLoad = (exercise) => {
        if (exercise.reps > 35 || exercise.time > 300 || exercise.weight > userWeight * 1.5) {
            toast.error(`Высокая нагрузка для упражнения ${exercise.name}`);
            return false;
        }
        return true;
    };

    const handleExerciseChange = (index, field, value) => {
        const updatedExercise = {
            ...selectedExercises[index],
            [field]: parseInt(value)
        };
        if (checkHighLoad(updatedExercise)) {
            dispatch(updateSelectedExercise({ index, field, value: parseInt(value) }));
        }
    };

    const handleAddExercise = (exercise) => {
        const newExercise = {
            ...exercise,
            reps: exercise.type === 'reps' ? calculateReps(exercise) : null,
            time: exercise.type === 'time' ? calculateTime(exercise) : null,
            weight: exercise.type === 'weight' ? calculateWeight(exercise) : null,
        };
        if (checkHighLoad(newExercise)) {
            dispatch(addSelectedExercise(newExercise));
        }
    };

    const handleRemoveExercise = (index) => {
        dispatch(removeSelectedExercise(index));
    };

    const handleSaveWorkout = () => {
        if (workoutName.trim() === '') {
            toast.error('Пожалуйста, введите название тренировки');
            return;
        }
        if(!userWeight){
            toast.error('Пожалуйста, введите вес');
            return;
        }
        if (selectedExercises.length === 0) {
            toast.error('Пожалуйста, добавьте хотя бы одно упражнение');
            return;
        }
        const newWorkout = {
            name: workoutName,
            exercises: selectedExercises,
        };
        const updatedWorkouts = [...allWorkouts, newWorkout];
        dispatch(setAllWorkouts(updatedWorkouts));
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        toast.success('Тренировка успешно сохранена');
        dispatch(clearWorkout());
        onClose();
    };

    return (
        <form className={'m-6'} onSubmit={e => e.preventDefault()}>
            <div className={'sm:flex justify-between items-center mb-4 gap-4 block'}>
                <input
                    type="text"
                    value={workoutName}
                    onChange={(e) => dispatch(setWorkoutName(e.target.value))}
                    placeholder="Введите название тренировки"
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="number"
                    value={userWeight}
                    onChange={(e) => dispatch(setUserWeight(parseInt(e.target.value)))}
                    placeholder="Ваш вес (кг)"
                    className="w-full p-2 mb-4 border rounded"
                />
            </div>
            <BuilderSelector />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Доступные упражнения</h2>
                    <ul className="space-y-2">
                        {filteredData.map((exercise) => (
                            <li key={exercise.id} className="flex flex-col sm:flex-row text-center justify-between items-center p-2 rounded gap-2">
                                {exercise.name}
                                <Button color={'text-pink-500'} fn={() => handleAddExercise(exercise)}>Добавить</Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Выбранные упражнения</h2>
                    <ul className="space-y-2">
                        {selectedExercises.map((exercise, index) => (
                            <li key={index} className="p-2 rounded">
                                <div className="flex justify-between items-center mb-2 flex-col sm:flex-row">
                                    <span>{exercise.name}</span>
                                    <Button
                                        fn={() => handleRemoveExercise(index)}
                                        bgColor="bg-linear-to-bl from-violet-500 to-fuchsia-500"
                                    >
                                        Удалить
                                    </Button>
                                </div>
                                <div className="flex space-x-2">
                                    {exercise.type === 'reps' && (
                                        <input
                                            type="number"
                                            placeholder="Повторения"
                                            className="w-full p-1 border rounded"
                                            value={exercise.reps}
                                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                        />
                                    )}
                                    {exercise.type === 'time' && (
                                        <input
                                            type="number"
                                            placeholder="Время (сек)"
                                            className="w-full p-1 border rounded"
                                            value={exercise.time}
                                            onChange={(e) => handleExerciseChange(index, 'time', e.target.value)}
                                        />
                                    )}
                                    {exercise.type === 'weight' && (
                                        <input
                                            type="number"
                                            placeholder="Вес (кг)"
                                            className="w-full p-1 border rounded"
                                            value={exercise.weight}
                                            onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                                        />
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                onClick={handleSaveWorkout}
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
            >
                Сохранить тренировку
            </button>
        </form>
    );
};

export default BuilderForm;
