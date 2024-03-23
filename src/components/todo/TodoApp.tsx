import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { TodoAppLayout } from "./TodoAppLayout"
import { TodoInput } from "./TodoInput"
import { TodoItem } from "./TodoItem"
import { useEffect } from "react"
import { fetchTodos } from "../../store/todoStore"
import { Loader } from "../uikit/Loader/Loader"

export function TodoApp() {
	const { todos, status, error } = useSelector(
		(state: RootState) => state.todos,
	)
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(fetchTodos())
	}, [])

	if (status === "pending") {
		return <TodoAppLayout input={<TodoInput />} todoList={<Loader />} />
	}
	if (status === "rejected") {
		return <div>error </div>
	}

	return (
		<TodoAppLayout
			input={<TodoInput />}
			todoList={todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		/>
	)
}
