import { infoMiddleware, locationMiddleware } from './src/nav.js';
import { renderNavPoints } from './src/services.js';

// render the navigation points on the map
fetch('../assets/features.json')
  .then(response => response.json())
  .then(data => {
    renderNavPoints(data.features)
  })

// connect to websocket server
var socket = new WebSocket("ws://127.0.0.1:8325")

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data)

  if (data.request.type === "navInfo") {
    infoMiddleware(data.request.method, data.body)
  }
  else if (data.request.type === "location") {
    locationMiddleware(data.request.method, data.body)
  }
});
