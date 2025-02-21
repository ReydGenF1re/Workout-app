import React, {useEffect} from 'react';
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home.jsx";
import ExercisesCatalog, {loadExercises} from "./features/exercise_catalog/ExercisesCatalog.jsx";
import Builder from "./features/builder/Builder.jsx";
import Character from "./features/character/Character.jsx";
import Workout from "./features/workout_mode/Workout.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Exercise, {exerciseLoader} from "./features/exercise_catalog/Exercise.jsx";
import Error from "./ui/Error.jsx";
import Loader from "./ui/Loader.jsx";
import {Toaster} from "react-hot-toast";
import {setAllWorkouts, setExercises} from "./features/builder/builderSlice.js";
import {useDispatch} from "react-redux";
import {predefinedWorkouts} from "./services/apiExercises.js";

const router = createHashRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>,

    },
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/exercises",
                element: <ExercisesCatalog/>,
                loader: loadExercises,
                errorElement: <Error/>,

            },
            {
                path: "/exercise/:exerciseId",
                loader: exerciseLoader,
                element: <Exercise/>,
                errorElement: <Error/>,
            },
            {
                path: "/builder",
                element: <Builder/>
            },
            {
                path: "/character",
                element: <Character/>
            },
            {
                path: "/workout",
                element: <Workout/>
            },
        ]
    }

])
const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const storedExercises = JSON.parse(localStorage.getItem('exercises'));
        if (storedExercises) {
            dispatch(setExercises(storedExercises.exercises));
        }

        let storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        if (storedWorkouts.length === 0) {
            storedWorkouts = predefinedWorkouts;
            localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
        }
        dispatch(setAllWorkouts(storedWorkouts));
    }, [dispatch]);
    return (
        <>
            <Toaster position={'top-center'}
                     gutter={12}
                     containerStyle={{margin: "8px"}}
                     toastOptions={{
                         success: {
                             duration: 3000,
                         },
                         error: {
                             duration: 3000,
                         },
                         style: {
                             fontSize: '16px',
                             maxWidth: '500px',
                             padding: '16px 24px'
                         }
                     }}/>
            <RouterProvider router={router} fallbackElement={<Loader/>}/>

        </>
    );
};

export default App;