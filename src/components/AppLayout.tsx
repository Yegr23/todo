import { NavLink, Outlet } from "react-router-dom"

const getActiveClassName = ({ isActive }: { isActive: boolean }) =>
	isActive ? "text-sky-400 transition-colors" : ""

export function AppLayout() {
	return (
		<>
			<header className="min-h-10 flex items-center px-4">
				<nav className="flex gap-1 ">
					<NavLink to="/" className={getActiveClassName}>
						home
					</NavLink>
					<NavLink to="/about" className={getActiveClassName}>
						about
					</NavLink>
					<NavLink to="/todo" className={getActiveClassName}>
						todo
					</NavLink>
				</nav>
			</header>
			<main className="flex ">
				<Outlet />
			</main>
			<footer></footer>
		</>
	)
}
