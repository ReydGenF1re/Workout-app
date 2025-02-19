
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
        "name": "Тренировка нижней части тела",
        "exercises": [
            {
                "id": 4,
                "name": "Планка",
                "description": "Статическое упражнение для укрепления корпуса. Примите положение упора лежа на локтях, тело прямое. Удерживайте эту позицию, напрягая мышцы живота и спины.",
                "muscleGroup": [
                    "Пресс",
                    "Спина",
                    "Плечи"
                ],
                "difficulty": 2,
                "equipment": [
                    "Коврик"
                ],
                "image": "https://atlet-sport.com/image/cache/catalog/stati/planka/uzkaja-800x600.jpg",
                "type": "time",
                "reps": null,
                "time": 60,
                "weight": null
            },
            {
                "id": 8,
                "name": "Скручивания",
                "description": "Упражнение для укрепления пресса. Лежа на спине, согните колени, руки за головой. Поднимите верхнюю часть тела, скручивая торс, затем опуститесь обратно.",
                "muscleGroup": [
                    "Пресс"
                ],
                "difficulty": 1,
                "equipment": [
                    "Коврик"
                ],
                "image": "https://power-body.ru/wp-content/uploads/2017/04/skruchivaniya-1.jpg",
                "type": "reps",
                "reps": 35,
                "time": null,
                "weight": null
            },
            {
                "id": 1,
                "name": "Приседания",
                "description": "Классическое упражнение для ног и ягодиц. Встаньте прямо, ноги на ширине плеч. Опуститесь, сгибая колени, как будто садитесь на стул, затем вернитесь в исходное положение.",
                "muscleGroup": [
                    "Ноги",
                    "Ягодицы"
                ],
                "difficulty": 2,
                "equipment": [
                    "Не требуется"
                ],
                "image": "/images/squats.jpg",
                "type": "reps",
                "reps": 30,
                "time": null,
                "weight": null
            },
            {
                "id": 5,
                "name": "Выпады",
                "description": "Упражнение для ног и баланса. Сделайте большой шаг вперед, опустите заднее колено почти до пола, затем вернитесь в исходное положение. Чередуйте ноги.",
                "muscleGroup": [
                    "Ноги",
                    "Ягодицы"
                ],
                "difficulty": 2,
                "equipment": [
                    "Гантели"
                ],
                "image": "https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/9/62/346926124307629.jpeg",
                "type": "reps",
                "reps": 20,
                "time": null,
                "weight": null
            },
            {
                "id": 8,
                "name": "Скручивания",
                "description": "Упражнение для укрепления пресса. Лежа на спине, согните колени, руки за головой. Поднимите верхнюю часть тела, скручивая торс, затем опуститесь обратно.",
                "muscleGroup": [
                    "Пресс"
                ],
                "difficulty": 1,
                "equipment": [
                    "Коврик"
                ],
                "image": "https://power-body.ru/wp-content/uploads/2017/04/skruchivaniya-1.jpg",
                "type": "reps",
                "reps": 20,
                "time": null,
                "weight": null
            },
            {
                "id": 15,
                "name": "Гиперэкстензия",
                "description": "Упражнение для укрепления нижней части спины. Лежа на специальной скамье, зафиксируйте ноги. Опустите верхнюю часть тела вниз, затем поднимите до уровня тела.",
                "muscleGroup": [
                    "Спина"
                ],
                "difficulty": 2,
                "equipment": [
                    "Скамья для гиперэкстензии"
                ],
                "image": "https://cross.expert/wp-content/uploads/2016/12/giperekstenziya.jpg",
                "type": "reps",
                "reps": 14,
                "time": null,
                "weight": null
            }
        ]
    }
];
