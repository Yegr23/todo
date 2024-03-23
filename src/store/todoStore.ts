import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Todo } from "../components/todo/types"

export const fetchTodos = createAsyncThunk(
	"todos/fetchTodos",
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=20",
			)
			if (!response.ok) {
				throw new Error("can't fetch todos")
			}
			const data = await response.json()
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

const todoSlice = createSlice({
	name: "todos",
	initialState: {
		todos: [] as Todo[],
		status: null as null | string,
		error: null as null | string | unknown,
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
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.pending, (state) => {
			state.status = "pending"
			state.error = null
		})
		builder.addCase(fetchTodos.rejected, (state, action) => {
			state.status = "rejected"
			state.error = action.payload
			console.log(action.payload)
		})
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.status = "fulfilled"
			state.error = null
			state.todos = action.payload
		})
	},
})

export const { addTodo, deleteTodo, toggleTodoComplete } = todoSlice.actions

export const todoReducer = todoSlice.reducer
