var socket = io()
var states = ['end','play','pause','buffer','cue']; //-1 == 'unstarted'

function initPlayer(videoUrl) {
  currentVideoID = videoUrl.split('?v=')[1]
  console.log('url: '+videoUrl)
  console.log('videoID: '+currentVideoID)
  var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: window.screen.availHeight*.67,
		width: window.screen.availWidth*.6,
		videoId: currentVideoID,
	  playerVars: {
        html5: 1
      },
  	events: {
			'onStateChange': onPlayerStateChange
		}
	})
}


function onPlayerStateChange(event) {
  if(event.data != -1) { //-1 == unstarted (ignore)
  var state = states[event.data].toUpperCase()
    if(state == 'BUFFER') {state = 'PAUSE'}
    socket.emit('state', state, roomID, player.getCurrentTime())
  }
}


/*
 * protocol
 *
 */

socket.on('state', function(state, time) {
  console.log('received '+state +': '+time)
  processState(state, time) 
})

var processState = function(state, time) {
  if(state == 'PLAY') {
    player.playVideo()
  } 
  else if(state == 'PAUSE') {
    player.seekTo(time)
    player.pauseVideo()
  }
  else if(state == 'STOP') {
    player.stopVideo()
  }
}

//consensus
socket.on('in consensus', function() {
  console.log('wait a bit, syncronizing...')
})
socket.on('play on', function(state, time) {
  processState(state, time) 
})


/*
 * chat
 *
 */

function chat(msg) {
  console.log(msg)
  socket.emit('chat', roomID, user, msg)
  var div = document.getElementById('chat-text')
  div.innerHTML = div.innerHTML +
    user+': '+msg+'<br>'
  scroll()
}

socket.on('chat', function(user, msg){
  var div = document.getElementById('chat-text')
  div.innerHTML = div.innerHTML +
    user+': '+msg+'<br>'  
  scroll()
})

function scroll() {
  var el = document.getElementById("chat-text");
  el.scrollTop = el.scrollHeight;
}


/*
 * operational
 *
 */

socket.on('create room res', function(res) {
	var div = document.getElementById('operationalDiv');
	if (res) {
  	var roomURL = "http://localhost:3000/watch/"+res
	  div.innerHTML = div.innerHTML + 
		'<a href='+roomURL+' target ="_blank">Room with id '+res+'</a> <br>'
  } else {
		div.innerHTML = div.innerHTML + 'URL invalid. Try again!' + '<br>'
    return
	}
})

socket.on('join room res', function(data) {
	if (data.err) alert('err')
	var div = document.getElementById('operationalDiv');
	div.innerHTML = div.innerHTML + data.res;
})


/*
 * frontend
 *
 */

$('#chat_msg').keydown(function (e){
    if(e.keyCode == 13){
     chat(document.getElementById('chat_msg').value)
     $(this).val('')  
   }
})

document.getElementById('chat-text').style.height = window.screen.availHeight*.50+'px'
