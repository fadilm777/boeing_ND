import { locationServices, navpointService } from "./services.js"

export function infoMiddleware(method, data) {
  if (method === "PUT") {
    updateNavInfo(data)
  }
}

export function locationMiddleware(method, data) {
  if (method === "PUT") {
    updateLocation(data)
    navpointService({latitude: data.latitude, 
                      longitude: data.longitude,
                      heading: data.heading})
  }
}

function updateNavInfo(data) {
  Object.keys(data).forEach(navItemName => {
    const navItem = document.getElementById(`${navItemName}value`)

    if (navItem) {
      updateNavItem(navItem, navItemName, data[navItemName])
    }
  })
}

function updateLocation(data) {
  Object.keys(data).forEach(locationItem => {
    if (locationItem in locationServices) {
      locationServices[locationItem](data[locationItem])
    }
  })
}

function updateTRKring(heading) {
  const ring = document.getElementById("compassRing")
  ring.style.transform = `translate(-50%, -50%) rotate(${-heading}deg)`
}

function updateTCAS(value, navItem) {
  if (value == 0) {
    navItem.textContent = "OFF"
  }
  else {
    navItem.textContent = "ON"
  }
}

function updateNavItem(navItem, navItemName, value) {
  if (navItemName === "TCAS") {
    updateTCAS(value, navItem)
  }
  else if (navItemName === "TRK") {
    updateTRKring(value)
    navItem.textContent = `${value.toFixed(0)}`
  }
  else {
    navItem.textContent = `${value}`
  }
}

