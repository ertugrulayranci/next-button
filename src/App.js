import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todolar, setTodolar] = useState(null);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [duzenlemeVarMi,setDuzenlemeVarMi]=useState(false);  
  const [duzenlenecekTodo,setDuzenlenecekTodo]= useState(null);
  const [duzenlenecekTitle,setDuzenlenecekTitle]= useState("")
  const todoSil = (id) => {
    axios
      .delete(`http://localhost:3004/todos/${id}`)
      .then((response) => {
        setResult(true);
        setResultMessage("Delete process is successfull");
      })
      .catch((error) => {
        setResult(true);
        setResultMessage("Error oocered while deleting");
      });
  };

  const changeTodosCompleted = (todo) => {
    console.log(todo);
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    axios
      .put(`http://localhost:3004/todos/${todo.id}`, updatedTodo)
      .then((response) => {
        setResult(true);
        setResultMessage("Updated successfully");
      })
      .catch((error) => {
        setResult(true);
        setResultMessage("An error occured while updating");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3004/todos")
      .then((response) => {
        console.log(response.data);
        setTodolar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [result]);

  const formuDenetle = (event) => {
    event.preventDefault();
    //validation:
    if (title === "") {
      alert("please tyepe your todo");
      return;
    }
    //create and save todo
    const newTodo = {
      id: String(new Date().getTime()),
      title: title,
      date: new Date(),
      completed: false,
    };

    axios
      .post("http://localhost:3004/todos", newTodo)
      .then((response) => {
        setTitle("");
        setResult(true);
        setResultMessage("Recording completed");
      })
      .catch((error) => {
        setResult(true);
        setResultMessage(" A problem while reconding");
      });
  };

  const todoGuncelleFormunuDenetle=(event)=>{
    event.preventDefault()
    //validation
    if(duzenlenecekTitle===""){
      alert("Title can't be empty")
      return
    }
    //update todo and send server
    const updatedTodo={
      ...duzenlenecekTodo,
      title: duzenlenecekTitle
    }
 axios.put(`http://localhost:3004/todos/${updatedTodo.id}`, updatedTodo)
 .then((response)=>{
  setResult(true)
  setResultMessage("Updated successfully")
  setDuzenlemeVarMi(false)
 })
 .catch((error)=>{
  setResult(true)
  setResultMessage("An error while updating")
 })
}
  if (todolar === null) {
    return null;
  }

  return (
    <div className="container">
      {result === true && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgrounColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div className="alert alert-success" role="alert">
            <p>{resultMessage}</p>
            <div className="d-flex justify-content-center">
              <button
                onClick={() => setResult(false)}
                className="btn btn-sm btn-outline-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="row my-5">
        <form onSubmit={formuDenetle}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type your todo..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
      {duzenlemeVarMi === true && (
        <div className="row my-5">
          <form onSubmit={todoGuncelleFormunuDenetle}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type your todo..."
                value={duzenlenecekTitle}
                onChange={(event)=>setDuzenlenecekTitle(event.target.value)}
              />
              <button
                onClick={() => setDuzenlemeVarMi(false)}
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
      {todolar.map((todo) => (
        <div
          key={todo.id}
          className="alert alert-secondary d-flex justfiy-content-between align-items-center"
          role="alert"
        >
          <div>
            <h1
              style={{
                textDecoration:
                  todo.completed === true ? "line-through" : "none",
                color: todo.completed === true ? "red" : "black",
              }}
            >
              {todo.title}
            </h1>
            <p>{new Date(todo.date).toLocaleString()}</p>
          </div>
          <div>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                onClick={() => {
                  setDuzenlemeVarMi(true);
                  setDuzenlenecekTodo(todo);
                  setDuzenlenecekTitle(todo.title)
                }}
                type="button"
                className="btn btn-sm btn-warning"
              >
                Update
              </button>
              <button
                onClick={() => todoSil(todo.id)}
                type="button"
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
              <button
                onClick={() => changeTodosCompleted(todo)}
                type="button"
                className="btn btn-sm btn-primary"
              >
                {todo.completed === true ? "Undone" : "Done"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
