import "./styles/menu.css"
import "./styles/banner.css"

import { departamentos } from "./data"

const menuButton = document.querySelector(".menu-toggle")
const menuContent = document.getElementById("menu-content")
const departmentColumn = document.getElementById("department-column")
const categoryColumn = document.getElementById("category-column")

const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const searchOut = document.getElementById("search-output")
const searchNav = document.getElementById("search-nav")
const searchX = document.getElementById("search-button-x")

const find = (e) => {
	e.preventDefault()

	if (searchInput.value === "") {
		return
	}

	searchNav.classList.remove("hidden")
	searchNav.classList.add("flex")

	const text = searchInput.value

	console.log(text)

	if (text) {
		searchOut.innerText = `Você buscou por: ${text}`
	} else {
		searchOut.innerText = ``
	}
}

searchInput.addEventListener("input", () => {
	searchNav.classList.remove("flex")
	searchNav.classList.add("hidden")

	if (searchInput.value !== "") {
		searchX.classList.add("flex")
		searchX.classList.remove("hidden")
	} else {
		searchX.classList.add("hidden")
		searchX.classList.remove("flex")
	}
})

searchInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		find(e)
	}
})

searchX.addEventListener("click", (e) => {
	e.preventDefault()

	searchNav.classList.remove("flex")
	searchNav.classList.add("hidden")
	searchOut.innerText = ``
	searchInput.value = ""
	searchX.classList.add("hidden")
})

searchButton.addEventListener("click", (e) => {
	find(e)
})

menuButton.addEventListener("click", () => {
	menuContent.classList.toggle("hidden")
	menuContent.classList.toggle("flex")

	menuButton.classList.toggle("active")
	categoryColumn.innerHTML = ""

	menuContentRow.classList.add("hidden")

	departmentRow.querySelectorAll("a").forEach((item) => {
		item.classList.remove("active")
	})

	departmentColumn.querySelectorAll("a").forEach((link) => {
		link.classList.remove("active")
	})

	loadMenu()
})

const loadMenu = () => {
	departmentColumn.innerHTML = ""
	departamentos.forEach((dep) => {
		const depLink = document.createElement("a")
		depLink.href = "#"
		depLink.innerHTML = `${dep.departamento} <i class="ph ph-caret-right"></i>`
		depLink.className =
			"flex justify-between items-center hover:text-blue-600 hover:font-bold"
		departmentColumn.appendChild(depLink)

		depLink.addEventListener("click", (e) => {
			departmentColumn.querySelectorAll("a").forEach((link) => {
				link.classList.remove("active")
			})

			e.currentTarget.classList.toggle("active")

			categoryColumn.innerHTML = ""
			dep.categorias.forEach((cat) => {
				const catLink = document.createElement("a")
				catLink.href = "#"
				catLink.textContent = cat
				catLink.className = "hover:text-blue-600 text-[14px]"
				categoryColumn.appendChild(catLink)
			})
		})
	})
}

const menuContentRow = document.getElementById("menu-content-row")
const departmentRow = document.getElementById("department-row")
const categoryRow = document.getElementById("category-row")
const depTitle = document.getElementById("dep-title")

const loadMenuRow = () => {
	departamentos.forEach((dep) => {
		const depLink = document.createElement("a")
		depLink.href = "#"
		depLink.textContent = dep.departamento
		depLink.className = "hover:text-blue-600 hover:font-bold"
		departmentRow.appendChild(depLink)

		depLink.addEventListener("click", (e) => {
			menuContent.classList.add("hidden")
			menuContent.classList.remove("flex")
			menuButton.classList.remove("active")

			const wasActive = e.target.classList.contains("active")

			departmentRow.querySelectorAll("a").forEach((item) => {
				item.classList.remove("active")
			})

			if (!wasActive) {
				e.target.classList.add("active")
				menuContentRow.classList.remove("hidden")
				categoryRow.innerHTML = ""
				depTitle.innerHTML = ""
				depTitle.textContent = dep.departamento

				dep.categorias.forEach((cat) => {
					const catLink = document.createElement("a")
					catLink.href = "#"
					catLink.textContent = cat
					catLink.className =
						"hover:text-blue-600 text-[0.875rem] min-w-[150px]"
					categoryRow.appendChild(catLink)
				})
			} else {
				menuContentRow.classList.add("hidden")
			}
		})
	})
}

document.addEventListener("DOMContentLoaded", loadMenuRow())
