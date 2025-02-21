
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
    },
    {
        "name": "Тренировка спины",
        "exercises": [
            {
                "id": 3,
                "name": "Подтягивания",
                "description": "Упражнение для укрепления спины и рук. Повисните на перекладине, ладони от себя. Подтяните тело вверх, пока подбородок не окажется над перекладиной, затем медленно опуститесь.",
                "muscleGroup": [
                    "Спина",
                    "Бицепсы",
                    "Плечи"
                ],
                "difficulty": 3,
                "equipment": [
                    "Турник"
                ],
                "image": "https://images.techinsider.ru/upload/img_cache/eb0/eb016c03bc80f92f1d8b5cb8f703ceb6_ce_1620x1080x156x0.jpg",
                "type": "reps",
                "reps": 15,
                "time": null,
                "weight": null
            },
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
                "time": 50,
                "weight": null
            },
            {
                "id": 7,
                "name": "Становая тяга",
                "description": "Комплексное упражнение для всего тела. Наклонитесь и возьмите штангу, выпрямляя ноги и спину, поднимите штангу до уровня бедер, затем опустите обратно на пол.",
                "muscleGroup": [
                    "Спина",
                    "Ноги",
                    "Ягодицы"
                ],
                "difficulty": 3,
                "equipment": [
                    "Штанга"
                ],
                "image": "https://musclefit.info/wp-content/uploads/2020/04/stanovaya-tyaga-sumo-min.jpg",
                "type": "weight",
                "reps": null,
                "time": null,
                "weight": 47
            },
            {
                "id": 11,
                "name": "Тяга штанги в наклоне",
                "description": "Упражнение для укрепления спины. Наклонитесь вперед, держа штангу в вытянутых руках. Подтяните штангу к животу, сводя лопатки, затем опустите.",
                "muscleGroup": [
                    "Спина"
                ],
                "difficulty": 2,
                "equipment": [
                    "Штанга"
                ],
                "image": "https://musclefit.info/wp-content/uploads/2020/05/tyaga-shtangi-v-naklone.jpg",
                "type": "weight",
                "reps": null,
                "time": null,
                "weight": 44
            }
        ]
    },
    {
        "name": "Тренируем руки",
        "exercises": [
            {
                "id": 3,
                "name": "Подтягивания",
                "description": "Упражнение для укрепления спины и рук. Повисните на перекладине, ладони от себя. Подтяните тело вверх, пока подбородок не окажется над перекладиной, затем медленно опуститесь.",
                "muscleGroup": [
                    "Спина",
                    "Бицепсы",
                    "Плечи"
                ],
                "difficulty": 3,
                "equipment": [
                    "Турник"
                ],
                "image": "https://images.techinsider.ru/upload/img_cache/eb0/eb016c03bc80f92f1d8b5cb8f703ceb6_ce_1620x1080x156x0.jpg",
                "type": "reps",
                "reps": 16,
                "time": null,
                "weight": null
            },
            {
                "id": 9,
                "name": "Подъем гантелей на бицепс",
                "description": "Изолированное упражнение для бицепсов. Стоя, держите гантели в опущенных руках. Поочередно сгибайте руки, поднимая гантели к плечам, затем опускайте.",
                "muscleGroup": [
                    "Бицепсы"
                ],
                "difficulty": 1,
                "equipment": [
                    "Гантели"
                ],
                "image": "https://sportmenu.com/uploads/store/Texts/Text543/cc391f.jpg",
                "type": "weight",
                "reps": null,
                "time": null,
                "weight": 44
            },
            {
                "id": 13,
                "name": "Французский жим",
                "description": "Изолированное упражнение для трицепсов. Лежа на скамье, держите гантель над головой. Согните локти, опуская гантель за голову, затем выпрямите руки.",
                "muscleGroup": [
                    "Трицепсы"
                ],
                "difficulty": 2,
                "equipment": [
                    "Гантель",
                    "Скамья"
                ],
                "image": "https://s0.rbk.ru/v6_top_pics/media/img/1/61/346981746361611.jpeg",
                "type": "weight",
                "reps": null,
                "time": null,
                "weight": 26
            }
        ]
    }
]
