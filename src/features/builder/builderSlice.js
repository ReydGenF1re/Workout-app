import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    exercises: [],
    selectedExercises: [],
    allWorkouts: [],
    workoutName: '',
    userWeight: localStorage.getItem('weight') || '',
    currentWorkout: null,
    score: 0,
    totalTime: 0,
    totalCalories:0,
    totalWorkouts:0,
};

export const builderSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        updateScore: (state, action) => {
            state.score += action.payload;
        },
        updateTotalWorkouts: (state, action) => {
            state.totalWorkouts += action.payload;
        },
        updateTotalCalories: (state, action) => {
            state.totalCalories += action.payload;
        },
        updateTotalTime: (state, action) => {
            state.totalTime += action.payload;
        },
        setExercises: (state, action) => {
            state.exercises = action.payload;
        },
        addSelectedExercise: (state, action) => {
            state.selectedExercises.push(action.payload);
        },
        removeSelectedExercise: (state, action) => {
            state.selectedExercises.splice(action.payload, 1);
        },
        updateSelectedExercise: (state, action) => {
            const { index, field, value } = action.payload;
            state.selectedExercises[index][field] = value;
        },
        setAllWorkouts: (state, action) => {
            state.allWorkouts = action.payload;
        },
        setWorkoutName: (state, action) => {
            state.workoutName = action.payload;
        },
        setUserWeight: (state, action) => {
            state.userWeight = action.payload;
        },
        clearWorkout: (state) => {
            state.selectedExercises = [];
            state.workoutName = '';
        },
        deleteWorkout: (state, action) => {
            console.log(action)
            state.allWorkouts = state.allWorkouts.filter(workout => workout.name !== action.payload.name);
            localStorage.setItem('workouts', JSON.stringify(state.allWorkouts));
        },
        setCurrentWorkout: (state, action) => {
            state.currentWorkout = action.payload;
        },
    },
});

export const {
    setExercises,
    addSelectedExercise,
    removeSelectedExercise,
    updateSelectedExercise,
    setAllWorkouts,
    setWorkoutName,
    setUserWeight,
    clearWorkout,
    deleteWorkout,
    setCurrentWorkout,
    updateScore,
    updateTotalCalories,
    updateTotalTime,
    updateTotalWorkouts,
} = builderSlice.actions;

export default builderSlice.reducer;