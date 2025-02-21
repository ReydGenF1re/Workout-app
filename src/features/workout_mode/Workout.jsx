import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Button from '../../ui/Button.jsx';
import WorkoutSummary from './WorkoutSummary.jsx';

const Workout = () => {
    const currentWorkout = useSelector((state) => state.workout.currentWorkout);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [timer, setTimer] = useState(0);
    const currentExercise = currentWorkout?.exercises[currentExerciseIndex];
    const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);

    const [workoutStats, setWorkoutStats] = useState({
        totalTime: 0,
        exercisesCompleted: 0,
        totalWeight: 0,
        caloriesBurned: 0,
        height: localStorage.getItem('height') || 170,
    });
    useEffect(() => {
        if (isWorkoutCompleted) return;
        const interval = setInterval(() => {
            setWorkoutStats(prevStats => ({
                ...prevStats,
                totalTime: prevStats.totalTime + 1
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [isWorkoutCompleted]);

    useEffect(() => {
        if (currentExercise) {
            if (isResting) {
                setTimer(30); // Устанавливаем фиксированное время отдыха
            } else if (currentExercise.time) {
                setTimer(currentExercise.time);
            } else {
                setTimer(0); // Для упражнений без времени устанавливаем 0
            }
        }
    }, [currentExerciseIndex, currentExercise, isResting]);
    useEffect(() => {
        let interval;
        if (isResting || (currentExercise && currentExercise.time)) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        if (isResting) {
                            setIsResting(false);
                        } else {
                            startNextExercise();
                        }
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isResting, currentExercise]);


    const startNextExercise = () => {
        setWorkoutStats(prevStats => ({
            ...prevStats,
            exercisesCompleted: prevStats.exercisesCompleted + 1,
            totalWeight: prevStats.totalWeight + (currentExercise.weight || 0) * (currentExercise.reps || 1)
        }));

        if (currentExerciseIndex < currentWorkout.exercises.length - 1) {
            setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
            setIsResting(true);
            setTimer(30); // Устанавливаем фиксированное время отдыха
        } else {
            // Тренировка завершена
            setWorkoutStats(prevStats => ({
                ...prevStats,
                caloriesBurned: 88.362 + (13.397 * prevStats.totalWeight) + (4.799 * prevStats.height) - (5.677 * 25)
            }));
            setIsWorkoutCompleted(true);
        }
    };

    const adjustRestTime = (seconds) => {
        setTimer((prevTimer) => Math.max(0, prevTimer + seconds));
    };
    if (isWorkoutCompleted) return <WorkoutSummary stats={workoutStats}/>
    return (
        <div className="max-w-4xl mx-auto p-6 bg-zinc-800 rounded-lg shadow-lg">
            <h2 className="text-3xl text-center font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                {currentWorkout.name}
            </h2>
            {isResting ? (
                <div className="text-center">
                    <p className="text-2xl mb-4">Отдых</p>
                    <p className="text-4xl font-bold mb-6 text-blue-400">{timer}s</p>
                    <div className="flex justify-center space-x-4">
                        <Button
                            fn={() => adjustRestTime(-10)}
                            bgColor="bg-gradient-to-r from-blue-500 to-blue-700"
                        >
                            -10s
                        </Button>
                        <Button
                            fn={() => adjustRestTime(10)}
                            bgColor="bg-gradient-to-r from-pink-500 to-pink-700"
                        >
                            +10s
                        </Button>
                    </div>
                </div>
            ) : currentExercise ? (
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">{currentExercise.name}</h3>
                    {currentExercise.time ? (
                            <p className="text-4xl font-bold mb-6 text-pink-500">{timer}s</p>
                        ) :
                        currentExercise.weight > 0 ? (
                            <p className="text-xl mb-6">Вес: {currentExercise.weight} кг</p>
                        ) : (
                            <p className="text-4xl font-bold mb-6 text-blue-500">
                                {currentExercise.reps} повторений
                            </p>
                        )

                    }
                    <Button
                        fn={startNextExercise}
                        bgColor="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                        Завершить упражнение
                    </Button>
                </div>
            ) : (
                <p className="text-2xl text-center">Тренировка завершена!</p>
            )}
        </div>
    );
};

export default Workout;
