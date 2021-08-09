const taskList = []
const badList = []
const hrPerWeek = 168

const handleOnSubmit = e => {
    const frmData = new FormData(e)
    const task = frmData.get("task")
    const hr = +frmData.get("hr")

   
    const newTask = {
        task,
        hr,
    }

    if (hr<1) return;
    
    

    const ttlHrs = taskList.reduce((subTtl, row) => (subTtl += row.hr), 0 )
    
    if (hrPerWeek < ttlHrs + hr) {
        return alert("You do not have enough hours to add")
    } 
    taskList.push(newTask)


    displayTask();
    totalTaskHours();
}


const displayTask = () => {
    let str = ""
    
    taskList.map((item, i)=> {
        str +=  `<li>
        <div class="lists">
            <span>
                <input type="checkbox">
                <label for="">${item.task}</label>
            </span>
            <span class="hour">${item.hr}hr/W</span>
            <button onclick="markAsNotToDo(${i})">Mark Not To Do</button>
            <button onclick="deleteItem(${i})">Delete</button>
        </div>
    </li>`
    })
    document.getElementById("task-list").innerHTML = str;
    totalTaskHours()
    totalBadHours()
    
}

const displayBadTaskList = () => {
    let str = ""
    
    badList.map((item, i)=> {
        str +=  `<li>
        <div class="lists">
            <span>
                <input type="checkbox">
                <label for="">${item.task}</label>
            </span>
            <span class="hour">${item.hr}hr/W</span>
            <button onclick="markAsToDo(${i})">Mark To Do</button>
        </div>
    </li>`
    })
    document.getElementById("not-todo-task-list").innerHTML = str;
    totalBadHours()
    totalTaskHours()
    
}

const markAsNotToDo = i => {
    const itm = taskList.splice(i, 1)[0]
    badList.push(itm)

    displayTask();
    displayBadTaskList();
}

const markAsToDo = i => {
    const itm = badList.splice(i, 1)[0]
    taskList.push(itm)

    displayTask();
    displayBadTaskList();
}

const totalTaskHours = () => {
    const ttlHrs = taskList.reduce((subTtl, row) => (subTtl += row.hr), 0 )
    document.getElementById("totalhr").innerText = ttlHrs;
}


const totalBadHours = () => {
    const ttlHrs = badList.reduce((subTtl, row) => (subTtl += row.hr), 0 )
    document.getElementById("totalhr1").innerText = ttlHrs;
}

const deleteItem = (i) => {
    const deletedValue = taskList.splice(i,1)[0]
    displayTask()
    totalTaskHours()

    alert(deletedValue.task + " has been deleted")
}