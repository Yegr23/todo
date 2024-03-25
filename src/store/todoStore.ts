import {
	AnyAction,
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit"
import { Todo } from "../components/todo/types"
import { RootState } from "."

type TodosState = {
	todoList: Todo[]
	loading: boolean
	error: null | undefined | string
}

//FETCH TODO THUNK
export const fetchTodos = createAsyncThunk<
	Todo[],
	void,
	{ rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
	const response = await fetch(
		"https://jsonplaceholder.typicode.com/todos?_limit=20",
	)
	if (!response.ok) {
		return rejectWithValue("can't fetch todos, server error")
	}
	const data = await response.json()
	return data
})

//REMOVE ( DELETE ) TODO THUNK
export const removeTodo = createAsyncThunk<
	number,
	number,
	{ rejectValue: string }
>("todos/removeTodo", async function (id, { rejectWithValue }) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos/${id}`,
		{ method: "DELETE" },
	)
	if (!response.ok) {
		return rejectWithValue("can't delete todo, server error")
	}
	return id
})

//TOGGLE TODO THUNK
export const toggleTodoCompleted = createAsyncThunk<
	Todo,
	number,
	{ rejectValue: string; state: RootState }
>(
	"todos/toggleTodoCompleted",
	async function (id, { rejectWithValue, getState }) {
		const todo = getState().todos.todoList.find((todo) => todo.id === id)
		if (!todo) return rejectWithValue("can't delete todo, client error")
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
			return rejectWithValue("can't delete todo, server error")
		}

		return (await response.json()) as Todo
	},
)

//ADD TODO THUNK
export const addTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
	"todos/addTodo",
	async function (text, { rejectWithValue }) {
		const newTodo = { completed: false, title: text, userId: 1 }
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/todos`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTodo),
			},
		)
		if (!response.ok) {
			return rejectWithValue("can't add new todo, server error")
		}

		return (await response.json()) as Todo
	},
)

const initialState: TodosState = {
	todoList: [],
	loading: false,
	error: null,
}

const todoSlice = createSlice({
	name: "todos",
	initialState: initialState,
	reducers: {
		// addTodoInClient: (state, action: PayloadAction<string>) => {
		// 	state.todoList.push({
		// 		id: Date.now(),
		// 		title: action.payload,
		// 		completed: false,
		// 	})
		// },
		// toggleTodoCompletedInClient: (state, action: PayloadAction<number>) => {
		// 	const todo = state.todoList.find((t) => t.id === action.payload)
		// 	if (todo) {
		// 		todo.completed = !todo.completed
		// 	}
		// },
		// removeTodoInClient: (state, action: PayloadAction<number>) => {
		// 	state.todoList = state.todoList.filter(
		// 		(todo) => todo.id !== action.payload,
		// 	)
		// },
	},
	extraReducers: (builder) => {
		builder

			//fetch case
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.todoList = action.payload
			})

			//remove case
			.addCase(removeTodo.fulfilled, (state, action) => {
				state.error = null
				state.todoList = state.todoList.filter(
					(todo) => todo.id !== action.payload,
				)
			})

			//toggle case
			.addCase(toggleTodoCompleted.fulfilled, (state, action) => {
				state.error = null
				const todo = state.todoList.find(
					(t) => t.id === action.payload.id,
				)
				if (todo) {
					todo.completed = action.payload.completed
				}
			})

			//add case
			.addCase(addTodo.fulfilled, (state, action) => {
				state.error = null
				state.todoList.push(action.payload)
			})

			//error handling
			.addMatcher(isError, (state, action: PayloadAction<string>) => {
				state.error = action.payload
				state.loading = false
			})
	},
})

// export const { addTodoInClient } = todoSlice.actions

export const todoReducer = todoSlice.reducer

function isError(action: AnyAction) {
	return action.type.endsWith("rejected")
}
