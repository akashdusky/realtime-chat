// make Connnection



const socket = io.connect('https://creakchat.herokuapp.com/')


//Query dom
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      feedback = document.getElementById('feedback')
      realtime = document.getElementById('realtime')
      usercount = document.getElementById('usercount')


//emitter events

var send = new Audio();
send.src="send.mp3"

var receive = new Audio();
receive.src="receive.mp3"


var type = new Audio();
type.src="type.mp3"
    



btn.addEventListener('click', ()=>{
   

    socket.emit('chat' , {

        message: message.value,
        handle:  handle.value

    })
    message.value=""
    send.play()
})

message.addEventListener('keypress' , ()=>{
    socket.emit('typing' , handle.value);
    console.log('im emiting ')
    
    
    
})


message.addEventListener('input', ()=>{
    console.log('from ere ' + message.value)
    socket.emit('realtime' , ( message.value));
})
message.addEventListener('keypress', (e)=>{

    if(e.key == "Enter"){
        send.play()
        socket.emit('chat' , {

            message: message.value,
            handle:  handle.value
            
    
        })
        message.value=""

    }
    
})





// receivers

socket.on('chat' ,(data)=>{
    // console.log(data)
    feedback.innerText= ""
    output.innerHTML+= "<p><strong>" + data.handle +  ": </strong>" + data.message+  " </p>"
    realtime.innerHTML= ""
    receive.play()
    

   
    
    
    
    if(handle.value){
        localStorage.setItem("username" , handle.value)
        handle.style.display ='none'
    
    }
    else if(localStorage.getItem("username")){
        handle.value = localStorage.getItem("username")
    }
})

socket.on('typing', (data)=>{
    feedback.innerHTML= "<p><em>"+data+ "  is typing...." +"</em> </p>"
    console.log('im getting ')
    type.play()
})




socket.on('realtime' ,(data)=>{
    console.log(data)
    realtime.innerHTML= "<p>"+data+ "...." +" </p>"
    type.play()
})

socket.on('newconnection' , (data)=>{
    console.log(data)
    usercount.innerHTML= "<p>" + data + "</p>"
})