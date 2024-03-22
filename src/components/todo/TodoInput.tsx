import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../../store/todoStore"

export const TodoInput = memo(function TodoInput() {
	console.log("input render")
	const [text, setText] = useState("")
	const dispatch = useDispatch()
	const handleAddTodo = () => {
		dispatch(addTodo({ text }))
		setText("")
	}
	return (
		<label className="flex gap-2 transition-shadow focus-within:shadow-inner items-start border border-second p-2 rounded-sm focus-within:border-main h-15">
			<textarea
				className="resize-none h-full grow"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
					if (e.keyCode === 13) {
						if (e.shiftKey) {
							if (text.trim().length === 0) {
								e.preventDefault()
							}
						} else {
							if (text.trim().length === 0) {
								e.preventDefault()
							} else {
								e.preventDefault()
								handleAddTodo()
							}
						}
					}
				}}
			/>
			<button
				className="bg-main px-1 rounded-sm"
				onClick={() => {
					if (text.trim().length > 0) {
						handleAddTodo()
					}
				}}
			>
				add
			</button>
		</label>
	)
})
