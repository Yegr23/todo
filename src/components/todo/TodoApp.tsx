import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { TodoAppLayout } from "./TodoAppLayout"
import { TodoInput } from "./TodoInput"
import { TodoItem } from "./TodoItem"

export function TodoApp() {
	const { todos } = useSelector((state: RootState) => state.todos)
	return (
		<TodoAppLayout
			input={<TodoInput />}
			todoList={todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		/>
	)
}
