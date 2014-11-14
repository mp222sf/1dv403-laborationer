"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		
		// Plats för förändring.
		var stringLenght = str.length;
		var newString = "";
		
		for (var i = 0; i < stringLenght; i++) {
			if (str.charAt(i) === "A") {
				newString += "#";
			}
			else if (str.charAt(i) === "a") {
				newString += "#";
			}
			else if (str.charAt(i) === str.charAt(i).toUpperCase()) {
				newString += str.charAt(i).toLowerCase();
			}
			else if (str.charAt(i) === str.charAt(i).toLowerCase()) {
				newString += str.charAt(i).toUpperCase();
			}
			else {
				
			}
		}
		
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		if (stringLenght === 0) {
			throw new Error("Jaaadu... Det här blev fel va?!");
		}
		// Returnera den konverterade strängen.
		return newString;
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};