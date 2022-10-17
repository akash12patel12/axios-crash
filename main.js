//axios globals
axios.defaults.headers.common['X-Auth-Token'] = 'sometoken'
// GET REQUEST
function getTodos() {
  axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todos/1",
  })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos/",
    data: {
      title: "New Todo",
      completed: false,
    },
  })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios({
    method: "patch",
    url: "https://jsonplaceholder.typicode.com/todos/1",
    data: {
      title: "Updated Todo",
      completed: true,
    },
  })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
    axios({
        method: "delete",
        url: "https://jsonplaceholder.typicode.com/todos/1"
      })
        .then((res) => showOutput(res))
        .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([axios.get('https://jsonplaceholder.typicode.com/todos'),
  axios.get('https://jsonplaceholder.typicode.com/posts')
])
.then(res=>{
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[1]);
})
.catch(err=>console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
   const config = {
    'Content-Type': 'application/json',
    Authorization: 'sometoken'
   }
   axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos/",
    data: {
      title: "New Todo",
      completed: false,
    },
    config: config
  })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos/',
    data: {
        title: 'Hellow World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data=> {
        data.title = data.title.toUpperCAse();
        return data;
    })
  }
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config=>{
    console.log(`${config.method} sent to ` + `${config.url}`);
})
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
