"use strict";

window.onload = function(){

	
	var birthday = function(date){
		// Felmeddelande om inmatat datum inte stämmer överrens med formeln ÅÅÅÅ-MM-DD.
		if (date.charAt(4) !== "-" && date.charAt(7) !== "-"){
			throw new Error("Jaaadu... Det här blev fel va?!");
		}
		
		// Skapa sedan ytterligare ett datumobjekt med dagens datum.
		var dateNow = new Date();
		
		// Skapa utifrån det inlästa datumet ett datumobjekt som representerar när användaren fyller år nästa gång.
		// Utgå ifrån att användaren fyller år i år. Fundera på hur du kan få fram aktuellt år utan att skriva in det i klartext.
		var birthdayYear = date.substring(0, 4);
		var birthdayMonth = date.substring(5, 7);
		var birthdayDay = date.substring(8, 10);
		var nextBirthdayDate = new Date(birthdayYear, (birthdayMonth-1), birthdayDay);

		//Ändrar "Födelseåret" till året just nu.
		nextBirthdayDate.setFullYear(dateNow.getFullYear());

		// Kollar om personen redan fyllt år i år. Isåfall ändras "Födelsedagsåret" till nästa år (+1).
		if (dateNow.getMonth() > nextBirthdayDate.getMonth()) {
				nextBirthdayDate.setFullYear(dateNow.getFullYear()+1);
		 		console.log("ändrad");
		}
		else if (dateNow.getMonth() === nextBirthdayDate.getMonth()) {
			if (dateNow.getDate() > nextBirthdayDate.getDate()) {
				nextBirthdayDate.setFullYear(dateNow.getFullYear()+1);
			}
		}
		else {}

		// Genom att subtrahera antalet millisekunder till dagens datum från antalet millisekunder då du fyller år får du 
		// skillnaden mellan datumen. Kan du via denna skillnad se om användaren fyllt år? Om så vad blir då nästa steg?
		console.log(dateNow.getTime());
		console.log(nextBirthdayDate.getTime());
		var timeBetween = (nextBirthdayDate.getTime()-dateNow.getTime());
		
		// När du fått detta att fungera kan du sedan omvandla antalet millisekunder till dagar och du är klar med uppgiften.
		timeBetween = (timeBetween/1000/60/60/24);
		console.log(timeBetween);
		timeBetween = Math.ceil(timeBetween);
		console.log(timeBetween);
		
		return timeBetween;

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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};