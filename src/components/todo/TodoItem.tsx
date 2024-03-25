import { useAppDispatch } from "../../store"
import { Todo } from "./types"
import { removeTodo, toggleTodoCompleted } from "../../store/todoStore"

export function TodoItem({ todo }: { todo: Todo }) {
	const dispatch = useAppDispatch()
	return (
		<li className="flex px-1 rounded-sm overflow-auto  bg-third">
			<input
				className="bg-second mx-1"
				type="checkbox"
				checked={todo.completed}
				onChange={() => dispatch(toggleTodoCompleted(todo.id))}
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
