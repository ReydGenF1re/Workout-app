import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home.jsx";
import ExercisesCatalog, {loadExercises} from "./features/exercise_catalog/ExercisesCatalog.jsx";
import Builder from "./features/builder/Builder.jsx";
import Character from "./features/character/Character.jsx";
import Workout from "./features/workout_mode/Workout.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Exercise, {exerciseLoader} from "./features/exercise_catalog/Exercise.jsx";
import Error from "./ui/Error.jsx";
import Loader from "./ui/Loader.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error />,

    },
    {
        element: <AppLayout/>,
        children:[
            {
                path: "/exercises",
                element: <ExercisesCatalog/>,
                loader: loadExercises,
                errorElement: <Error />,

            },
            {
                path: "/exercise/:exerciseId",
                loader: exerciseLoader,
                element: <Exercise/>,
                errorElement: <Error />,
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
            }
        ]
    }

])
const App = () => {

    return (
        <RouterProvider router={router} fallbackElement={<Loader />}/>
    );
};

export default App;