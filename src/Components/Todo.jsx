import React, { useEffect, useRef, useState } from "react";
import todo from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    function addTask(){
        const inputText = inputRef.current.value.trim();;
        if (inputText.trim() === "") {
            alert("Please enter a task.");
            return;
        }
        
        const newTodo = {
            id: Date.now(),
            text: inputText,
            completed: false
        };
        setTodoList([...todoList, newTodo]);
        inputRef.current.value = "";
    }

    function deleteTask(id){
        const updatedTodoList = todoList.filter(item => item.id !== id);
        setTodoList(updatedTodoList);
    }

    function toggle(id){
        const updatedTodoList = todoList.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setTodoList(updatedTodoList);
    }


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    function clearAll() {
        setTodoList([]);
        localStorage.removeItem("todos");
    }


  return (
    <div className="bg-white place-self-center w-11/12 max-w-lg min-h-[600px] rounded-xl flex flex-col p-5">
      <div className="flex items-center justify-center m-2 gap-2 p-2 bg-orange-500 rounded-2xl">
        <img className="w-9" src={todo} alt="" />
        <h1 className="text-3xl font-bold">To-Do List</h1>
      </div>
      <div className="flex items-center mt-2 mb-2 gap-4 bg-gray-400 rounded-full">
        <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-15 pl-6 pr-2 placeholder:text-slate-700"
          type="text"
          placeholder="Add your Task"
        />
        <button onClick={addTask} className="border-none rounded-full bg-yellow-300 w-30 h-14 text-lg font-medium cursor-pointer">
          Add Task
        </button>
      </div>
      <div className="flex-1">
        {todoList.map((item,index) => {
            return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.completed} deleteTask={deleteTask} toggle={toggle}/>
        })}
      </div>

      <div className="flex items-center justify-center mt-auto">
        <button onClick={clearAll} className="border-3 rounded-2xl cursor-pointer bg-red-500 text-shadow-black font-bold px-25 py-2">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Todo;
