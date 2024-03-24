import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Todo } from "../components/todo/types"
import { ThunkApiConfig } from "."

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>()

export const fetchTodos = createAppAsyncThunk(
	"todos/fetchTodos",
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=20",
			)
			if (!response.ok) {
				throw new Error("can't fetch todos, server error")
			}
			const data = await response.json()
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const removeTodo = createAppAsyncThunk(
	"todos/removeTodo",
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{ method: "DELETE" },
			)
			if (!response.ok) {
				throw new Error("can't delete todo, server error")
			}

			dispatch(removeTodoInClient({ id }))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const toggleTodoCompleted = createAppAsyncThunk(
	"todos/toggleTodoCompleted",
	async function (id: number, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todoList.find((todo) => todo.id === id)
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						completed: !todo.completed,
					}),
				},
			)
			if (!response.ok) {
				throw new Error("can't delete todo, server error")
			}

			dispatch(toggleTodoCompletedInClient({ id }))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

const todoSlice = createSlice({
	name: "todos",
	initialState: {
		todoList: [] as Todo[],
		status: null as null | string,
		error: null as null | string | unknown,
	},
	reducers: {
		addTodoInClient: (state, action) => {
			state.todoList.push({
				id: Date.now(),
				title: action.payload.text,
				completed: false,
			})
		},
		toggleTodoCompletedInClient: (state, action) => {
			const todo = state.todoList.find((t) => t.id === action.payload.id)
			if (todo) {
				todo.completed = !todo.completed
			}
		},
		removeTodoInClient: (state, action) => {
			state.todoList = state.todoList.filter(
				(todo) => todo.id !== action.payload.id,
			)
		},
	},
	extraReducers: (builder) => {
		//fetch case
		builder.addCase(fetchTodos.pending, (state) => {
			state.status = "pending"
			state.error = null
		})
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.status = "fulfilled"
			state.error = null
			state.todoList = action.payload
		})
		builder.addCase(fetchTodos.rejected, (state, action) => {
			state.status = "rejected"
			state.error = action.payload
			console.log(action.payload)
		})

		//remove case
		builder.addCase(removeTodo.pending, (state) => {
			state.status = "pending"
			state.error = null
		})
		builder.addCase(removeTodo.fulfilled, (state) => {
			state.status = "fulfilled"
			state.error = null
		})
		builder.addCase(removeTodo.rejected, (state, action) => {
			state.status = "rejected"
			state.error = action.payload
			console.log(action.payload)
		})
	},
})

export const {
	addTodoInClient,
	removeTodoInClient,
	toggleTodoCompletedInClient,
} = todoSlice.actions

export const todoReducer = todoSlice.reducer
