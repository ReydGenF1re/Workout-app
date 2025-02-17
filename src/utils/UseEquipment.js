import {useSelector} from "react-redux";

function useEquipment() {
    const exercises = useSelector((state) => state.workout.exercises);
    return [...new Set(exercises.flatMap((exercise) => {
        return Array.isArray(exercise.equipment) ? exercise.equipment : [exercise.equipment]
    }))]

}
export default useEquipment;