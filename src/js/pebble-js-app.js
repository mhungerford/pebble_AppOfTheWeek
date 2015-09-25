
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
  //url = 'http://apps.getpebble.com/applications/556bf9c4389795518100008d';
  url = 'pebble://appstore/556bf9c4389795518100008d';
  //url = (url === null ? 'http://google.com' : url);
  console.log("showing " + url);
  Pebble.openURL("data:text/html,"+encodeURI('<!DOCTYPE html><html><head><title>AppOfTheWeek</title> <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><script language="javascript">setTimeout(function(){window.open("' + url + '")},0);</script><a href="' + url + '">Click here</a><body>Redirect to app of the Week</body></html><!--.html'));
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
