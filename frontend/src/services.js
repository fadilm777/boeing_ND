const rollElem = document.getElementById("rollLine")
const navpoints = null

fetch('../assets/features.json')
  .then(response => response.json())
  .then(data => {
    navpoints = data.features

  })

export const locationServices = {
  "roll": (value) => {
    rollElem.style.transform = `translate(-50%, -50%) rotate(${value}deg)`
  },
}

export function navpointService(position) {

}

