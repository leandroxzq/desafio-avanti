import { shirt } from "./data"
import Glide from "@glidejs/glide"

const createCarousel = (ulId) => {
	const ulElement = document.getElementById(ulId)

	for (let i = 0; i < shirt.amount; i++) {
		const liShirt = document.createElement("li")
		liShirt.classList.add(
			"glide__slide",
			"flex",
			"flex-col",
			"p-2",
			"border-1",
			"border-[#DDDDDD]",
			"rounded-lg",
			"relative"
		)

		const imgShirt = document.createElement("img")
		imgShirt.src =
			"https://raw.githubusercontent.com/leandroxzq/desafio-avanti/main/desenvolvimento-do-layout/src/assets/img/shirt.png"
		imgShirt.classList.add("max-w-[220px]", "max-h-[220px]")

		liShirt.innerHTML = `
				${imgShirt.outerHTML}
				<span class="absolute bg-[#00264E] text-white text-[0.5rem] font-bold p-1 rounded-md">
					NOVO
				</span>
		
				<div class="flex flex-col py-4 text-xs gap-1">
					<h3 class="font-bold" id="title-shirt-${i}">${shirt.titleShirt}</h3>
					<span class="flex flex-col justify-center relative">
						<del id="old-value-shirt-${i}">${shirt.oldValueShirt}</del>
						<strong class="text-base font-bold" id="new-value-shirt-${i}">${shirt.newValueShirt}</strong>
						<mark id="promotion-shirt-${i}" 
							class="absolute left-20 bg-[#5EC0BE] rounded-sm px-2 py-1 text-white font-bold text-[0.688rem]">
							${shirt.promotionShirt}
						</mark>
					</span>
					<span>Ou em até <strong>10x de R$ 7,90</strong></span>
				</div>
				<button class="py-2.5 font-bold bg-[#005CFF] rounded-lg text-white hover:bg-[#002fff] cursor-pointer">
					Comprar
				</button>
			`

		ulElement.appendChild(liShirt)
	}
}

createCarousel("ul-shirt-1")
createCarousel("ul-shirt-2")

document.querySelectorAll(".glide").forEach((glide) => {
	new Glide(glide, {
		type: "carousel",
		startAt: 0,
		perView: 5,
		breakpoints: {
			1024: {
				perView: 4,
			},
			768: {
				perView: 3,
			},
			540: {
				perView: 2,
			},
			300: {
				perView: 1,
			},
		},
	}).mount()
})
