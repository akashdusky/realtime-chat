const express = require('express')
const socket = require('socket.io')
var cors = require('cors')

// app setup



const app = express();  
app.use(cors({
    origin : "*",
}))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
  });
console.log("cor enables ...")
console.log(cors)

const server = app.listen(process.env.PORT || 5000 ,  ()=>{console.log("started or 5000")})


app.get('/crad', (req , res)=> {
    res.send('crad.mp3')
})

app.use(express.static('public'));



    let usercount = 0


//socket setup

const io = socket(server);

io.on('connection' , (socket)=>{
    console.log('handshake done '  ,socket.id,)
    usercount ++
    io.sockets.emit('newconnection' , (usercount + " active users"))
    // console.log('i sent it bruh')
    console.log(usercount)
     
  
  socket.on('chat' ,(data)=>{
      console.log(data)
      io.sockets.emit('chat', data)
     
  })

  socket.on('typing', (data)=>{

    socket.broadcast.emit('typing' , data)

});

socket.on('realtime', (data)=>{

    socket.broadcast.emit('realtime' , data)

});

socket.on('disconnect', ()=>{
    usercount--
    io.sockets.emit('newconnection' , (usercount + " active users"))
    console.log(usercount)
})


})
// listen for vents




// heroku config:set -a creakchat CORSANYWHERE_RATELIMIT="60 1"