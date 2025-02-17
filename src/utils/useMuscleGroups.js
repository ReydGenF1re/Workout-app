import {useSelector} from "react-redux";

function useMuscleGroups() {
    const exercises = useSelector((state) => state.workout.exercises);
    return [...new Set(exercises.flatMap((exercise) => {
        return Array.isArray(exercise.muscleGroup) ? exercise.muscleGroup : [exercise.muscleGroup]
    }))]

}
export default useMuscleGroups;