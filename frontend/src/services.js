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
  let geoVector = {}

  if (NavPoints) {
    for (let navpoint of NavPoints) {
      geoVector = geoVectorNM(position.heading,
        position.latitude,
        position.longitude,
        navpoint.coordinates[1],
        navpoint.coordinates[0])
      //console.log(geoVector.distance, geoVector.y)

      if (isNavPointInRange(geoVector.distance, geoVector.y)) {
        displayNavPoint(geoVector.x, geoVector.y, navpoint.name)
      } else {
        hideNavPoint(navpoint.name)
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

  navpointDiv.style.display = "block"
  navpointDiv.style.top = `${Math.round(-3.04 * yVec + 71.2)}%`
  navpointDiv.style.left = `${Math.round(1.85 * xVec + 49.50)}%`
}

function hideNavPoint(navpointName) {
  const navpointDiv = document.getElementById(navpointName)

  navpointDiv.style.display = "none"
}
