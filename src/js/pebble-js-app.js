
// got message from pebble
Pebble.addEventListener("appmessage", function(e) {
  console.log("got message " + JSON.stringify(e.payload));
  if (e.payload.button_event !== undefined) {
    console.log("button_event: " + e.payload.button_event);
    var button_map = {
    "1": "Up", 
    "2": "Sel",
    "3": "Dwn",
    "4": "Back",
    };

    console.log("current:" + current);
    
    if (socket.connected) {
      socket.emit('pebble_event', {button : button_map[e.payload.button_event]})
    }
  }
});

function openWebview(e) {
  url = 'http://apps.getpebble.com/applications/556bf9c4389795518100008d';
  Pebble.openURL(url);
}

Pebble.addEventListener("showConfiguration", openWebview);

Pebble.addEventListener("webviewclosed", function(e) {
  console.log("configuration closed");
  if (e.response && e.response.length) {
    var json_data = decodeURIComponent(e.response);
    var config = JSON.parse(json_data);
  }
});

Pebble.addEventListener("ready", openWebview);
