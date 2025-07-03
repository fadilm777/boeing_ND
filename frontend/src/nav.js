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


function updateNavInfo(data) {
  for (let i = 0; i < navItems.length; i++) {
    const navItemName = navItems[i]

    const navItem = document.getElementById(`${navItemName}value`)
    if (navItem) {
      navItem.textContent = `${data[navItemName]}`
    }
  }
}
