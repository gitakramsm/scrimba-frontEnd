// javascript
import { initializeApp }  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://cat-cart-a99ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageListElInDB = ref(database, "messageList")

const publishBtn = document.getElementById("publish-btn")
const textFieldEl = document.getElementById("text-field")
const messageListEl = document.getElementById("message-el")

publishBtn.addEventListener("click", function(){
    let message = textFieldEl.value
    
    push(messageListElInDB, message)
    
    clearTextFieldEl() 
})

onValue(messageListElInDB, function(snapshot){
   if(snapshot.exists()){
        let messageListArray = Object.entries(snapshot.val())
    
        clearMessageListEl()

        for(let i = 0; i < messageListArray.length; i++){
            let message = messageListArray[i]
            let messageID = message[0]
            let messageValue = message[1]
            appendMessageToMessageListEl(message)
        }  
    }else{
        messageListEl.innerHTML = "No messages here...yet"
    }   
})

function clearTextFieldEl(){
    textFieldEl.value = ""
}

function clearMessageListEl(){
     messageListEl.innerHTML = ""
}

function appendMessageToMessageListEl(text){
    // messageListEl.innerHTML += `<li>${text}</li>`
    let textID = text[0]
    let textValue = text[1]
    let newEl = document.createElement("li")
    newEl.innerHTML = textValue
    
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfMessageInDB = ref(database, `messageList/${textID}`)
        remove(exactLocationOfMessageInDB)
    })
    
    messageListEl.prepend(newEl)
}