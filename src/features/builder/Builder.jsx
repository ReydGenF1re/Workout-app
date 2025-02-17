import React, {useState} from 'react';
import BuilderForm from "./BuilderForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorkout, setWorkoutName} from "./builderSlice.js";
import Button from "../../ui/Button.jsx";

const WorkoutBuilder = () => {
    const dispatch = useDispatch();
    const allWorkouts = useSelector((state) => state.workout.allWorkouts);
    const [showForm, setShowForm] = useState(false);
    const [previewWorkout, setPreviewWorkout] = useState(null);

    const handlePreviewWorkout = (workout) => {
        setPreviewWorkout(workout);
    };
    const handleDeleteWorkout = (workout) => {
        dispatch(deleteWorkout(workout));
        setPreviewWorkout(null);
    };
    const handleForm = () => {
        setShowForm(show => !show);
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Все тренировки</h2>
            <ul className="my-6">
                {allWorkouts?.map((workout, index) => (
                    <li key={index} className="sm:flex justify-between text-lg sm:text-xl items-center p-2 rounded">
                        {workout.name}
                        <div className={'flex gap-2 items-center'}>
                            <Button
                                fn={() => handlePreviewWorkout(workout)}
                                bgColor={'bg-linear-to-r from-cyan-500 to-blue-500 '}
                            >
                                Предпросмотр
                            </Button>
                            <Button
                                fn={() => handleDeleteWorkout(workout)}
                                bgColor={'bg-linear-65 from-purple-500 to-pink-500'}
                            >
                                Удалить
                            </Button>
                        </div>

                    </li>
                ))}
            </ul>

            {previewWorkout && (
                <div className="mt-8 p-4 rounded">
                    <h3 className="text-xl font-semibold mb-4">{previewWorkout.name}</h3>
                    <ul className="space-y-2">
                        {previewWorkout.exercises.map((exercise, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{exercise.name}</span>
                                <span>
                                    {exercise.reps && `${exercise.reps} повторений`}
                                    {exercise.time && `${exercise.time} секунд`}
                                    {exercise.weight > 0 && ` - ${exercise.weight} кг`}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Button
                        fn={() => {
                            setWorkoutName(previewWorkout.name);
                            setSelectedExercises(previewWorkout.exercises);
                            setPreviewWorkout(null);
                        }}
                        // className="mt-4 text-white px-4 py-2 rounded"
                        bgColor={'bg-linear-to-r from-cyan-500 to-blue-500'}
                    >
                        Использовать эту тренировку
                    </Button>
                </div>
            )}

            <Button bgColor={"bg-linear-65 from-purple-500 to-pink-500"}
                    fn={handleForm}>{showForm ? "Закрыть" : "Добавить тренировку"}</Button>

            {showForm && <BuilderForm onClose={handleForm}/>}

        </div>
    );
};

export default WorkoutBuilder;
