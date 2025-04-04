import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
	base: "/desafio-avanti/desenvolvimento-do-layout/",
	plugins: [tailwindcss()],
	server: {
		open: true,
	},
})
