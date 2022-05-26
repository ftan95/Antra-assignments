var listContainter = document.getElementById("list-container");

function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const entry = data.map((todo) =>  {
            let div = document.createElement('div');
            let pid = document.createElement('p');
            let id = document.createTextNode("id: " + todo.id);
            pid.appendChild(id);
            let ptitle = document.createElement('p');
            let title = document.createTextNode("title: " + todo.title);
            ptitle.appendChild(title);
            let pcomplete = document.createElement('p');
            let complete = document.createTextNode("completed: " + todo.completed);
            pcomplete.appendChild(complete);
            div.appendChild(pid);
            div.appendChild(ptitle);
            div.appendChild(pcomplete);
            div.classList.add("entry-container");
            listContainter.appendChild(div);
        });
    })
}

fetchData();