import { infoMiddleware, locationMiddleware } from './src/nav.js';

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
