import { configureStore } from "@reduxjs/toolkit"
import { todoReducer } from "./todoStore"

export const store = configureStore({
	reducer: {
		todos: todoReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkApiConfig = {
	state: RootState
	dispatch: AppDispatch
	rejectValue: AnyErrorType
	extra: AnyExtraArgumentType
}
