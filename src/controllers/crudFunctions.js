let tasks = JSON.parse(localStorage.getItem("tareas"))

export function editTask(id) {
    location.hash = "/task"

    const task = tasks.filter(item => item.id === id);
    debugger
    let titulo = document.getElementById("titulo")
    titulo.value = task.titulo
}