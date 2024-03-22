import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { AppLayout } from "./components/AppLayout"
import { Suspense, lazy } from "react"
import { Loader } from "./components/uikit/Loader/Loader"
import { Provider } from "react-redux"
import { store } from "./store"

const TodoPage = lazy(() => import("./pages/TodoPage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))

export function App() {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route
						path="/about"
						element={
							<Suspense fallback={<Loader big />}>
								<AboutPage />
							</Suspense>
						}
					/>
					<Route
						path="/todo"
						element={
							<Suspense fallback={<Loader big />}>
								<TodoPage />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</Provider>
	)
}
