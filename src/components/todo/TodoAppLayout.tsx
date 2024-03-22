import { ReactNode } from "react"

export function TodoAppLayout({
	input,
	todoList,
}: {
	input: ReactNode
	todoList: ReactNode
}) {
	return (
		<div className="border-r border-r-second p-2 max-w-60 flex flex-col gap-1">
			{input}
			<ul className="p-2 flex flex-col gap-1">{todoList}</ul>
		</div>
	)
}
