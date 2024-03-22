import clsx from "clsx"
import classes from "./loader.module.css"

export function Loader({
	className,
	big,
}: {
	className?: string
	big?: boolean
}) {
	return (
		<svg
			className={clsx(classes.loader, className, big && "h-20")}
			height="100"
			viewBox="0 0 100 100"
			stroke="currentColor"
		>
			<circle r="45" cx="50" cy="50" fill="red" />
		</svg>
	)
}
