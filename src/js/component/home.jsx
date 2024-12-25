import React, { useState } from "react";
import "./home.css";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, inputValue.trim()]);
			setInputValue("");
		}
	};

	const deleteTodo = (index) => {
		setTodos(todos.filter((_, currentIndex) => currentIndex !== index));
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
					{todos.map((todo, index) => (
						<li key={index} className="todo-item">
							{todo}
							<button 
								onClick={() => deleteTodo(index)}
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