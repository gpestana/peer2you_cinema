##big picture
###idea
service that brings p2p cinema to everyone, anywhere in your browser. users can
create a cinema room and watch videos together with friends. the cinema sessions
are controlled by the users and/or only the room`s creator. the room can be
broadcasting videos that are hosted on the web or on the room`s creator machine.
in addition, the room`s users can interact within each other through chatting,
voice and probably video while the session is on  

##mvp
- rooms with less than 3 users
- only youtube videos 
- chat system with users within same room
- user-friendly design for web and mobile
- start tracking user`s preferences and behavior 


###techs
- hosting on linode (already have one account set up and running)
- express.js for backup server
- socket.io for p2p and COMET-like communication between users and server


###proj_organization

- /index.js  
initializes express serve

- /server/io.js
socket.io server logic. receives the user`s requests, calls the server logic to
process them and sends response accordingly. 

- /server/server,js
sets up the https server (express.js). handles the http requests from the users
and works as frontend for room`s creation and joining.

- /server/warehouse/..
holds the logic for the rooms management and will, at some point, hold the
database logic as well.

-/public/...
frontend logic. notably, the /public/assets/js/yougether.js is where the user`s
socket.io logic is (to handle responses from the server and send requests)

- /server/views  
some handlebars views - let`s refactor everything for single page view with
socket.io ?
