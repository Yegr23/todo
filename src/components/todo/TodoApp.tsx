import { useAppDispatch, useAppSelector } from "../../store"
import { TodoAppLayout } from "./TodoAppLayout"
import { TodoInput } from "./TodoInput"
import { TodoItem } from "./TodoItem"
import { useEffect } from "react"
import { fetchTodos } from "../../store/todoStore"
import { Loader } from "../uikit/Loader/Loader"

export function TodoApp() {
	const { todoList, loading, error } = useAppSelector((state) => state.todos)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchTodos())
	}, [])

	if (loading) {
		return <TodoAppLayout input={<TodoInput />} todoList={<Loader />} />
	}
	if (error) {
		return <div>error {error}</div>
	}

	return (
		<TodoAppLayout
			input={<TodoInput />}
			todoList={todoList.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		/>
	)
}
