"use strict";

window.onload = function(){
	
	var secret = Math.floor(Math.random() * 100) + 1; // Detta tal behöver bytas ut mot ett slumpat tal.
	var count = 0;
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number){
		console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret innifrån funktionen.
		console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
			
		// Plats för förändring.
		count += 1;
		
		// Skapar en array.
		var myArray = new Array(false, "Talet är inte i intervallet 1-100.");
		// Returnera exempelvis: 
		// [true, "Grattis du vann! Det hemliga talet var X och du behövde Y gissningar för att hitta det."]
		if (number == secret){
			myArray[0] = true;
			myArray[1] = "Grattis du vann! Det hemliga talet var "+secret+" och du behövde "+count+" gissningar för att hitta det.";
		}
		// [false, "Talet är utanför intervallet 0 - 100"]	
		else if (number < 1 || number > 100) {
			myArray[1] = "FEL! Talet är utanför intervallet 0 - 100. Försök igen. (Detta räknas inte som en gissning.)";
			count -= 1;
		} 
		// [false, "Det hemliga talet är lägre!"]
		else if (secret < number){
			myArray[1] = "Det hemliga talet är lägre!";
		} 
		// [false, "Det hemliga talet är högre!"]
		else if (secret > number){
			myArray[1] = "Det hemliga talet är högre!";
		} 
		else {
			myArray[1] = "Fel. Du angav inte ett riktigt tal. Försök igen. (Detta räknas inte som en gissning.)";
			count -= 1;
		}
		
		return myArray;
	};
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value); // Läser in talet från textrutan och skickar till funktionen "guess"
		console.log(answer);
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};