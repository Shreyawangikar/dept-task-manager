const API="http://localhost:5000/api"

let currentRole=""

async function register(){

await fetch(API+"/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name.value,
email:email.value,
password:password.value,
role:role.value

})

})

alert("Registered Successfully")

}



async function login(){

const res=await fetch(API+"/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:loginEmail.value,
password:loginPassword.value

})

})

const data=await res.json()

if(data.message==="Login Success"){

currentRole=data.user.role

localStorage.setItem("role",currentRole)

if(currentRole==="dept"){

window.location="deptDashboard.html"

}else{

window.location="studentDashboard.html"

}

}else{

alert("Invalid Credentials")

}

}



async function addTask(){

await fetch(API+"/task",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

taskTitle:taskTitle.value,
description:description.value,
week:week.value,
role:localStorage.getItem("role")

})

})

getTasks()

}



async function getTasks(){

const res=await fetch(API+"/tasks")

const tasks=await res.json()

taskList.innerHTML=""

tasks.forEach(t=>{

if(localStorage.getItem("role")==="dept"){

taskList.innerHTML+=`

<tr>

<td>${t.taskTitle}</td>
<td>${t.description}</td>
<td>${t.week}</td>

<td>

<button onclick="deleteTask('${t._id}')">Delete</button>

</td>

</tr>

`

}else{

taskList.innerHTML+=`

<tr>

<td>${t.taskTitle}</td>
<td>${t.description}</td>
<td>${t.week}</td>

</tr>

`

}

})

}



async function deleteTask(id){

await fetch(API+"/task/"+id,{

method:"DELETE",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
role:localStorage.getItem("role")
})

})

getTasks()

}



function logout(){

localStorage.clear()

window.location="index.html"

}


if(document.getElementById("taskList")){

getTasks()

}