import * as messaging from "messaging";

// Send a message to the device
export function sendMessage(cmd, data) {
  var data = {
    command: cmd,
    content: data
  }
  
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
  else {console.log("peerSocket to app not open or not ready.")}
}