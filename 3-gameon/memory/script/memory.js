"use strict";

var memory = {
    
    memories: [],
    memoryRows: 4,
    memoryCols: 4,
    turnedCounter1: "",
    turnedCounter2: "",
    turnedCountersCount: 0,
    correctGuesses: 0,
    
    // Funktion som körs när sidan är laddad.
    init:function(){
        // Skapar en array med slumpade siffror, lägger in den i "memories".
        memory.memories = RandomGenerator.getPictureArray(memory.memoryRows, memory.memoryCols);
        memory.createTable();
    },
    
    createTable:function(){
        // Skapar <table></table> i "memoryBox". Width: Kolumer * 50px.
        var newTable = document.createElement("table");
        var boxWidth = (memory.memoryCols * 50) + "px";
        newTable.setAttribute("width", boxWidth);
        
        document.getElementById("memoryBox").setAttribute("style", "width: " + boxWidth);
        

        
        // Skapar <tr></tr>. Antal: memoryRows. Läggs in i <table></table>
        for (var i = 0; i < memory.memoryRows; i+=1){
            var newTableRow;
            newTableRow = document.createElement("tr");
            
            // Skapar <td><a><img /></a></td>. 
            // A-taggen får ett id, start på "0". Href sätts till "#". Addlistener läggs till. ("click", memory.turnCounter)
            // Imgage-source blir bilden med frågetecknet, "memory/pics/0.png".
            for (var i2 = 0; i2 < memory.memoryCols; i2+=1){
                var newTableData;
                var newAnchor;
                var newImage;
                
                // Skapar taggar.
                newTableData = document.createElement("td");
                newAnchor = document.createElement("a");
                newImage = document.createElement("img");
                
                // Sätter attribut på taggar.
                newAnchor.setAttribute("id", ((i * memory.memoryCols) + i2));
                newAnchor.setAttribute("href", "#");
                newAnchor.addEventListener("click", memory.turnCounter);
                
                newImage.setAttribute("src", "memory/pics/0.png");
                
                // Lägger in taggar som barn.
                newAnchor.appendChild(newImage);
                newTableData.appendChild(newAnchor);
                newTableRow.appendChild(newTableData);
            }
            
            newTable.appendChild(newTableRow);
        }
        
        document.getElementById("memoryBox").appendChild(newTable);
    },
    
    turnCounter:function(){
        
        // Kollar först att brickan inte redan är öppen.
        if (this.firstChild.src !== "https://1dv403-laborationer-mp222sf.c9.io/3-gameon/memory/pics/0.png") {
            return;
        }
        
        // Öppnar brickan och visar vilken bild.
        this.firstChild.setAttribute("src", "memory/pics/" + memory.memories[this.id] + ".png");
        
        // Om rest av antal vända brickor är 0 tilldelas "turnedCounter1" ett värde.
        if (memory.turnedCountersCount % 2 === 0) {
            memory.turnedCounter1 = this.id;
        }
        
        //  Är resten 1 tilldelas "turnedCounter2" ett värde.
        if (memory.turnedCountersCount % 2 === 1) {
        memory.turnedCounter2 = this.id;
        
            // Om det är exakt likadana bilder så adderas "correctGuesses" med 1. 
            if (memory.memories[memory.turnedCounter1] === memory.memories[memory.turnedCounter2]) {
                memory.correctGuesses += 1;
            } 
            
            // Om bilderna inte är exakt likadana - en setTimeout körs som ändrar brickorna till frågetecken. (1000ms)
            else {
                setTimeout(function(){
                    document.getElementById(memory.turnedCounter1).firstChild.setAttribute("src", "memory/pics/0.png");
                    document.getElementById(memory.turnedCounter2).firstChild.setAttribute("src", "memory/pics/0.png");
                }, 1000); 
            }
        }
        
        // "turnedCountersCount" adderas med 1.
        memory.turnedCountersCount += 1;
        
        // Skriver ut info om antal drag i dokumentet.
        if (memory.turnedCountersCount % 2 === 0) {
            document.getElementById("result").innerHTML = "Antal drag: " + (memory.turnedCountersCount / 2);
            
            // Om "correctGuesses" är lika mycket som Rows*Cols/2 så är spelet slut och avklarat.
            if (memory.correctGuesses == (memory.memoryRows * memory.memoryCols) / 2) {
                document.getElementById("result").innerHTML = "Grattis! Du klarade det!<br>Antal drag: " + (memory.turnedCountersCount / 2);
            }
        }
    }
};

window.onload = memory.init;