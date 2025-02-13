export async function getExercises() {
    const res = await fetch("/exercises.json");
    if (!res.ok) throw new Error("Failed getting exercises");
    const data = await res.json();
    return data
}
export async function getExercise(id) {
    const res = await fetch("/exercises.json");
    if (!res.ok) throw new Error("Failed getting exercises");
    const data = await res.json();
    for(let ex of data.exercises){
        if(ex.id === Number(id.slice(1))) {
            return ex;
        }
    }
}