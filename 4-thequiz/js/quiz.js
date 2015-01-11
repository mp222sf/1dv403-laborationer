"use strict";

var engine = {
    
    // URL för frågor.
    qURL: "http://vhost3.lnu.se:20080/question/1",
    
    // URL för svar.
    aURL: "",
    
    // Objekt av fråga.
    qObject: {},
    
    // Objekt av svar.
    aObject: {},

    // Array som håller koll på antal försök på varje fråga
    arrayCountWrongAnswers: [],
    
    
    run:function(){
        // Läser först in en fråga, sedan körs "clickOnMouse" som läser in ett svar.
        engine.getQuestion();
        engine.clickOnMouse();
    },
    
    clickOnMouse:function(){
            
            
        // Vid musklick på skickaknappen.
        document.getElementById("answerButton").addEventListener("click", function(){
            
            // Läser in ett svar.    
            var inputAnswer = document.getElementById("answer").value;
            engine.postAnswer(inputAnswer);
            
            // Nollställer input-elementet.
            document.getElementById("answer").value = "";
            
            
            
            
            
        });
        
        
        
    },
    
    getQuestion:function(){
        
        // Om question-objektets URL är undefined är spelet slut.
        if (engine.qURL === undefined){
            document.getElementById("question").innerHTML = "GRATTIS! Du har klarat hela quizen.";
            document.getElementById("qMessage").innerHTML = "<br />Antal försök på varje fråga<br><br>";
            document.getElementById("answer").style.display = "none";
            document.getElementById("answerButton").style.display = "none";
            
            for (var i = 0; i < engine.arrayCountWrongAnswers.length; i += 1){
                document.getElementById("qMessage").innerHTML += "Fråga "+ (i+ 1) + ": " + engine.arrayCountWrongAnswers[i] + "<br />";
            }
        }
        // Annars läses en ny fråga in.
        else {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
            
                if (xhr.readyState === 4){
                    if (xhr.status === 200){
                        // Lägger till frågans objekt i "engine.qObject"
                        engine.qObject = JSON.parse(xhr.responseText);
                        
                        // Lägger till 0 i en array - på ett nytt index som inte existerar än.
                        engine.arrayCountWrongAnswers[engine.arrayCountWrongAnswers.length] = 1;
                        
                        // Ändrar svarets URL.
                        engine.aURL = engine.qObject.nextURL;
                        
                        // Byter fråga på index.html.
                        document.getElementById("question").innerHTML = engine.qObject.question;
                    }
                }
            };
            xhr.open("GET", engine.qURL , true);

            xhr.send(null); 
        }
    }, 
    
    postAnswer:function(value){
           
        var xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function(){
                
            if (xhr2.readyState === 4){
                if(xhr2.status == 200){
                    // Lägger till svaret i ett nytt objekt.
                    engine.aObject = JSON.parse(xhr2.responseText);
                    
                    // Ändrar frågans URL.
                    engine.qURL = engine.aObject.nextURL;
                    
                    // Ändrar svarsmeddelandet.
                    document.getElementById("qMessage").innerHTML = engine.aObject.message;
                    
                    // Läser in en ny fråga.
                    engine.getQuestion();
                    
                }
                
                // Om fel svar.
                else{
                    // Ändra svarsmeddelandet.
                    document.getElementById("qMessage").innerHTML = "Wrong answer! Try again.";
                    
                    // Addera antal fel till den aktuella frågan i arrayen.
                    engine.arrayCountWrongAnswers[engine.arrayCountWrongAnswers.length - 1] += 1;
                    
                }
            }
        };
        
        xhr2.open("POST", engine.aURL, true);
        xhr2.setRequestHeader("Content-Type", "application/json");
        var JSONanswer = {
            answer: value,
        };
            
        
        xhr2.send(JSON.stringify(JSONanswer));
    },
};

window.onload = engine.run;