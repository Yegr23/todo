/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				main: "#1fb6ff",
				second: "#8492a6",
				third: "#f5f5f5",
				text: "#393939",
			},
		},
	},
	plugins: [],
}
