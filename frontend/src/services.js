const rollElem = document.getElementById("rollLine")

export const locationServices = {
  "roll": (value) => {
    rollElem.style.transform = `translate(-50%, -50%) rotate(${value}deg)`
  },
}

