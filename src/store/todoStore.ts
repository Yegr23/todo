import { createSlice } from "@reduxjs/toolkit"
import { Todo } from "../components/todo/types"

const todoSlice = createSlice({
	name: "todos",
	initialState: {
		todos: [] as Todo[],
	},
	reducers: {
		addTodo: (state, action) => {
			state.todos.push({
				id: Date.now(),
				title: action.payload.text,
				completed: false,
			})
		},
		toggleTodoComplete: (state, action) => {
			const todo = state.todos.find((t) => t.id === action.payload.id)
			if (todo) {
				todo.completed = !todo.completed
			}
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload.id,
			)
		},
	},
})

export const { addTodo, deleteTodo, toggleTodoComplete } = todoSlice.actions

export const todoReducer = todoSlice.reducer
