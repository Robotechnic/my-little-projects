

function flip(container, id, value) {
	const digit = container.querySelector(`#digit${id}`)

	if (digit.dataset.value == value) {
		return
	}

	const holdValue = digit.dataset.value 
	digit.dataset.annimation = "0"
	digit.dataset.value = value
	digit.dataset.holdValue = holdValue

	digit.querySelector(".digit__up").innerText = value

	digit.classList.add("flip")
}

function addDigit(container, id, value) {
	const digit = document.createElement("div")
	digit.setAttribute("class", "digit")
	digit.setAttribute("id", `digit${id}`)
	digit.dataset.value = value
	digit.dataset.holdValue = value

	const top = document.createElement("div")
	top.setAttribute("class", "digit__up")
	top.appendChild(document.createTextNode(value))

	const bottom = document.createElement("div")
	bottom.setAttribute("class", "digit__down")
	bottom.appendChild(document.createTextNode(value))

	digit.appendChild(top)
	digit.appendChild(bottom)

	digit.addEventListener("animationend", () => {
		if (digit.dataset.annimation === "1") {
			digit.querySelector(".digit__down").innerText = digit.dataset.value
			digit.classList.remove("flip")
		} else {
			digit.dataset.annimation = "1"
		}
	})

	container.appendChild(digit)
}

export {addDigit, flip}