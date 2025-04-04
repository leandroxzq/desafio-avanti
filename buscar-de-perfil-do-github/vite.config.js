import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
	base: "/desafio-avanti/buscar-de-perfil-do-github/",
	plugins: [react()],
})
