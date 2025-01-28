import React, { useState,useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(()=>{
		getask()
	},[])
	const getask = async () => {
     	const respon = await fetch('https://playground.4geeks.com/todo/users/amanda', {
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  const data = await respon.json()
		  setTodos(Array.isArray(data) ? data: (data.todos || []))
	}
	const handleKeyPress = async (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			try{
			const newTodo = {
				label: inputValue.trim() ,
				is_done:false
			}
			const response = await fetch ('https://playground.4geeks.com/todo/todos/amanda', {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(newTodo)
			}

			)
			setInputValue("");
			getask()
		} catch(error) { 
			console.error("error al crear la tarea", error)
		}
		}
	};
	const deleteTodo = async (id) => {
		 try {
			const response = await fetch (`https://playground.4geeks.com/todo/todos/${id}`,
				{
					method:"DELETE",
					headers:{"Content-Type": "application/json"}
				}
			)
			getask();
		 } catch (error){
			console.error("error al eliminar tareas", error);
		 }
	};

	return (
		<>
			<div className="header">
				<h1>todos</h1>
			</div>
			
			<div className="todo-list">
				
				<input
					type="text"
					placeholder="What needs to be done?"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				
				<ul>
					{todos.map((todo) => (
						<li key={todo.id} className="todo-item">
							{todo.label}
							<button 
								onClick={() => deleteTodo(todo.id)}
								className="delete-btn"
							>
								×
							</button>
						</li>
					))}
				</ul>
				<div className="todo-count">
					{todos.length} item{todos.length !== 1 ? "s" : ""} left
				</div>
			</div>
		</>
	);
};
export default Home;