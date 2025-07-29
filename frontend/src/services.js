import { geoVectorNM } from "./distance.js"

const rollElem = document.getElementById("rollLine")
var NavPoints = null

export const locationServices = {
  "roll": (value) => {
    rollElem.style.transform = `translate(-50%, -50%) rotate(${value}deg)`
  },
}

function isNavPointInRange(distance, yVec) {
  if (yVec > 0 && distance < 20) {
    return true
  }
  else {
    return false
  }
}

export function navpointService(position) {
  let distance, xVec, yVec = 0

  if (NavPoints) {
    for (let navpoint of NavPoints) {
      distance, xVec, yVec = geoVectorNM(position.heading,
        position.latitude,
        position.longitude,
        navpoint.coordinates[1],
        navpoint.coordinates[0])

      if (isNavPointInRange(distance, yVec)) {
        displayNavPoint(xVec, yVec, navpoint.name)
      }
    }
  }
}

export function renderNavPoints(navpoints) {
  NavPoints = navpoints
  for (let navPointData of navpoints) {
    const navPoint = document.createElement("div")
    const navPointIcon = document.createElement("img")
    const navPointLabel = document.createElement("div")

    navPoint.id = navPointData.name
    navPoint.classList.add("navPoint")
    navPointLabel.textContent = navPointData.name
    navPointLabel.classList.add("navPointLabel")
    navPointIcon.src = "assets/navPoint.png"

    navPoint.appendChild(navPointIcon)
    navPoint.appendChild(navPointLabel)

    document.body.appendChild(navPoint)
  }
}

function displayNavPoint(xVec, yVec, navpointName) {
  const navpointDiv = document.getElementById(navpointName)

  navpointDiv.stlye.display = "block"
  navpointDiv.style.top = `${Math.round(-3.04 * yVec + 71.2)}%`
  navpointDiv.style.left = `${Math.round(1.85 * xVec + 50.25)}%`
}
