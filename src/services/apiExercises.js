
export async function getExercises() {
    let exercises = localStorage.getItem('exercises');
    if (exercises) {
        return JSON.parse(exercises);
    }

    const res = await fetch("/exercises.json");
    if (!res.ok) throw new Error("Failed getting exercises");
    const data = await res.json();
    localStorage.setItem('exercises', JSON.stringify(data));
    return data;
}

export async function getExercise(id) {
    let exercises = localStorage.getItem('exercises');
    if (!exercises) {
        await getExercises(); // This will fetch and store the data
        exercises = localStorage.getItem('exercises');
    }
    const data = JSON.parse(exercises);
    return data.exercises.find(ex => ex.id === Number(id.slice(1)));
}
export function addExercise(newExercise) {
    let exercises = JSON.parse(localStorage.getItem('exercises'));
    exercises.exercises.push(newExercise);
    localStorage.setItem('exercises', JSON.stringify(exercises));
}