

var engine = {
    
    messages: [],
    
    instansiate:function(inputText){
        var newObject = new Message(inputText, new Date());
        engine.messages.push(newObject);
    },

    init:function(){
        var link = document.getElementById("sendButton").addEventListener("click", function(){
            var hej = document.getElementById("textmeddelande").value;
            engine.instansiate(hej);
            alert(engine.messages); 
        });
    }

    

};




 window.onload = engine.init;

