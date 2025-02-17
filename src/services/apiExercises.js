
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
export const predefinedWorkouts = [
    {
        name: "Тренировка верхней части тела",
        exercises: [
            {id: 1, name: "Жим штанги лежа", reps: 12, weight: 60},
            {id: 2, name: "Подтягивания", reps: 10, weight: 0},
            {id: 3, name: "Отжимания на брусьях", reps: 15, weight: 0},
        ]
    },
    {
        name: "Тренировка ног",
        exercises: [
            {id: 4, name: "Приседания со штангой", reps: 10, weight: 80},
            {id: 5, name: "Выпады с гантелями", reps: 12, weight: 20},
            {id: 6, name: "Становая тяга", reps: 8, weight: 100},
        ]
    },
    {
        name: "Кардио тренировка",
        exercises: [
            {id: 7, name: "Бег на беговой дорожке", time: 600, weight: 0},
            {id: 8, name: "Прыжки на скакалке", time: 300, weight: 0},
            {id: 9, name: "Велотренажер", time: 900, weight: 0},
        ]
    }
];
