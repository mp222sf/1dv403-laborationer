"use strict";

var makePerson = function(persArr){
    
    
    // Skapar array med namn från alla objekt.
    var namesArray = [persArr[0].name, persArr[1].name, persArr[2].name];
    
    // Kontrollerar att namnen är av typen "string".
    for (var i = 0; i < persArr.length; i++) {
        if (typeof persArr[i].name !== "string") {
            throw new Error("Jaaadu... Detta är ingen sträng.");
        }
    }
    
    //Fixar till sortering av Å,Ä,Ö.
    function localeSort(string1, string2) {
        return string1.toString().localeCompare(string2.toString());
    }
    
    // Sorterar arrayen.
    namesArray.sort(localeSort);
    
    // Skapar en sträng med de sorterade namnen.
    var namesNewString = "";
    namesNewString += namesArray[0] + ", " + namesArray[1] + ", " + namesArray[2];
    
    // Skapar en array med alla åldrar från objekten. Sorterar sedan.
    var ageArray = [persArr[0].age, persArr[1].age, persArr[2].age];
    ageArray.sort();

    // Skapar det nya objektet med de nya värdena.
    var newObject = {
        minAge: ageArray[0],
        maxAge: ageArray[2],
        averageAge: Math.round(((ageArray[0]+ageArray[1]+ageArray[2]) / 3)),
        names: namesNewString
    };
    
	return newObject;
    
};

