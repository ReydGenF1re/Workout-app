// Honestly, these achievements came from the AI, but realization of them is on me
export const achievements = [
    { id: 1, name: "Первая тренировка", condition: stats => stats.totalWorkouts >= 1 },
    { id: 2, name: "Сожжено 500 калорий", condition: stats => stats.totalCalories >= 500 },
    { id: 3, name: "Час тренировок", condition: stats => stats.totalTime >= 3600 },
    { id: 4, name: "10 упражнений", condition: stats => stats.exercisesCompleted >= 10 },
    { id: 5, name: "Сожжено 1000 калорий", condition: stats => stats.totalCalories >= 1000 },
    { id: 6, name: "Два часа тренировок", condition: stats => stats.totalTime >= 7200 },
    { id: 7, name: "5 тренировок", condition: stats => stats.totalWorkouts >= 5 },
    { id: 8, name: "Сожжено 2000 калорий", condition: stats => stats.totalCalories >= 2000 },
    { id: 9, name: "Марафонец", condition: stats => stats.totalTime >= 14400 },
    { id: 10, name: "20 упражнений", condition: stats => stats.exercisesCompleted >= 20 },
    { id: 11, name: "10 тренировок", condition: stats => stats.totalWorkouts >= 10 },
    { id: 12, name: "Сожжено 5000 калорий", condition: stats => stats.totalCalories >= 5000 },
    { id: 13, name: "10 часов тренировок", condition: stats => stats.totalTime >= 36000 },
    { id: 14, name: "30 упражнений", condition: stats => stats.exercisesCompleted >= 30 },
    { id: 15, name: "15 тренировок", condition: stats => stats.totalWorkouts >= 15 },
    { id: 16, name: "Сожжено 10000 калорий", condition: stats => stats.totalCalories >= 10000 },
    { id: 17, name: "Сожжено 20000 калорий", condition: stats => stats.totalCalories >= 20000 },
    { id: 18, name: "20 часов тренировок", condition: stats => stats.totalTime >= 72000 },
    { id: 19, name: "50 упражнений", condition: stats => stats.exercisesCompleted >= 50 },
    { id: 20, name: "Сожжено 50000 калорий", condition: stats => stats.totalCalories >= 50000 },
];
