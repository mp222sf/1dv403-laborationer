

var engine = {
    
    messages: [],
    
    instansiate:function(inputText){
        var newObject = new Message(inputText, new Date());
        engine.messages.push(newObject);
        engine.renderMessages();
    },

    init:function(){
        var link = document.getElementById("sendButton").addEventListener("click", function(){
            var textareaInput = document.getElementById("textmeddelande").value;
            engine.instansiate(textareaInput);
        });
        
        var link2 = document.getElementById("textmeddelande").addEventListener("keypress", keyPressTextField, false);
        
        function keyPressTextField(e){
            var keyCode = e.keyCode;
            if(keyCode == 13) {
                if (e.shiftKey === false)
                {
                    var textareaInput = document.getElementById("textmeddelande").value;
                    engine.instansiate(textareaInput); 
                }
                else {
                    
                }
            } 
        }
    },
    
    renderMessage:function(messageID){
        //Ny div-tagg inuti #writtenMessages
        var newDivElement = document.createElement("div");
        newDivElement.setAttribute("class", "aMessage");
        document.getElementById("writtenMessages").appendChild(newDivElement);
        
        //Inputtext inuti div-taggen.
        var Text = engine.messages[messageID].getHTMLText();
        newDivElement.innerHTML = Text;
        
        //Ny div-tagg.
        var newDivElement2 = document.createElement("div");
        newDivElement2.setAttribute("class", "floatright");
        newDivElement.appendChild(newDivElement2);
        
        //Tid-knapp.
        var newAElement = document.createElement("a");
        newAElement.setAttribute("href", "#");
        var newImgElement = document.createElement("img");
        newImgElement.setAttribute("src", "pics/TimeButton.png");
        newAElement.appendChild(newImgElement);
        newDivElement2.appendChild(newAElement);
        
        var showTime = document.getElementsByTagName("a")[messageID * 2].addEventListener("click", function(){
            var monthNames = [ "januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december" ];
            var messageTime = engine.messages[messageID].getDate();
            alert("Inlägget skapades den "+messageTime.getDate()+" "+monthNames[messageTime.getMonth()]+" "+messageTime.getFullYear()+" klockan "+messageTime.toLocaleTimeString());
        });
        
        //Radera-knapp.
        var newAElement2 = document.createElement("a");
        newAElement2.setAttribute("href", "#");
        var newImgElement2 = document.createElement("img");
        newImgElement2.setAttribute("src", "pics/DeleteButton.png");
        newAElement2.appendChild(newImgElement2)
        newDivElement2.appendChild(newAElement2);
        
        var deleteMessage = document.getElementsByTagName("a")[((messageID * 2)+ 1)].addEventListener("click", function(){
            
            function myFunction() {
                var txt;
                var r = confirm("Fortsätter du så tas meddelandet bort.");
                if (r === true) {
                    engine.messages.splice(messageID, 1);
                    engine.renderMessages();
                } else {
                    
                }
                
            }
            myFunction();
            
        });
        
        //Ny p-tagg inlagd i div-tag.
        var newPElement = document.createElement("p");
        newDivElement2.appendChild(newPElement);
        
        //Datumet i p-taggen.
        var ObjectDate = engine.messages[messageID].getDate();
        var dateTrim = ObjectDate.toLocaleTimeString();
        newPElement.innerHTML = dateTrim;
        
        //Rensa textarea.
        var clearTextarea = document.getElementById("textmeddelande");
        clearTextarea.value = "";
    },
    
    renderMessages:function(){
        document.getElementById("writtenMessages").innerHTML = "";
        
        for (var i = 0; i < engine.messages.length; i++) {
            engine.renderMessage(i);
        }
        
        var countTag = document.getElementById("countValue"); 
        countTag.innerHTML = engine.messages.length;
    }
};

window.onload = engine.init;

