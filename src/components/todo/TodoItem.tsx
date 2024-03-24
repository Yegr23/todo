import { useDispatch } from "react-redux"
import { Todo } from "./types"
import { removeTodo, toggleTodoComplete } from "../../store/todoStore"
import { AppDispatch } from "../../store"

export function TodoItem({ todo }: { todo: Todo }) {
	const dispatch = useDispatch<AppDispatch>()
	return (
		<li className="flex px-1 rounded-sm overflow-auto  bg-third">
			<input
				className="bg-second mx-1"
				type="checkbox"
				checked={todo.completed}
				onChange={() => dispatch(toggleTodoComplete({ id: todo.id }))}
			/>

			<span className="p-1 grow whitespace-pre-line break-all">
				{todo.title}
			</span>
			<button
				className="ml-auto px-1"
				onClick={() => dispatch(removeTodo(todo.id))}
			>
				&times;
			</button>
		</li>
	)
}
