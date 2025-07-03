import { FrameRateService } from './services.js'

let rateHandler = new FrameRateService(30)

const navItems = ["GS", "TAS", "TCAS", "TRK", "heading"]

// export function locationMiddleware(method, data) {
//   if (method === "PUT") {
//     updateLocation(data.latitude, data.longitude, data.heading)
//   }
// }

export function infoMiddleware(method, data) {
  if (method === "PUT") {
    updateNavInfo(data)
  }
}

function updateTRKring(heading) {
  const ring = document.getElementById("compassRing")
  ring.style.transform = `translate(-50%, -50%) rotate(${-heading}deg)`
}

function updateNavInfo(data) {
  for (let i = 0; i < navItems.length; i++) {
    const navItemName = navItems[i]

    const navItem = document.getElementById(`${navItemName}value`)
    if (navItem) {
      if (navItemName === "TCAS") {
        if (data["TCAS"] == 0) {
          navItem.textContent = "OFF"
        }
        else {
          navItem.textContent = "ON"
        }
      }
      else if (navItemName === "TRK") {
        updateTRKring(data["TRK"])
        navItem.textContent = `${data["TRK"].toFixed(0)}`
      }
      else {
        navItem.textContent = `${data[navItemName]}`
      }
    }
  }
}
