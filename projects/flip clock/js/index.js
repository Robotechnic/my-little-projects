import { addDigit, flip } from "./clock.js";

const container = document.querySelector(".clockConainer")

addDigit(container, "h1", 0)
addDigit(container, "h0",0)
addDigit(container, ":",":")
addDigit(container, "m1",0)
addDigit(container, "m0",0)
addDigit(container, ":1",":")
addDigit(container, "s1", 0)
addDigit(container, "s0", 0)

function setTime() {
	const time = new Date()
	const seconds = String(time.getSeconds()).padStart(2, "0")
	flip(container, "s1",seconds[0])
	flip(container, "s0", seconds[1])

	const minutes = String(time.getMinutes()).padStart(2, "0")
	flip(container, "m1",minutes[0])
	flip(container, "m0", minutes[1])

	const hours = String(time.getHours()).padStart(2, "0")
	flip(container, "h1",hours[0])
	flip(container, "h0", hours[1])
}

setInterval(setTime, 1000)
setTime()