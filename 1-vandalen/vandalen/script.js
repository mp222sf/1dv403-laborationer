"use strict";

var makePerson = function(persArr){
    
    
    // Skapar array med namn från alla objekt.
    var names = persArr.map(function(person){
        return person.name;
    });

    
    // Kontrollerar att namnen är av typen "string".
    for (var i = 0; i < names.length; i++) {
        if (typeof persArr[i].name !== "string") {
            throw new Error("Jaaadu... Detta är ingen sträng.");
        }
    }
    
    //Fixar till sortering av Å,Ä,Ö.
    function localeSort(string1, string2) {
        return string1.toString().localeCompare(string2.toString());
    }
    names.sort(localeSort);
    
    // Skapar en sträng med de sorterade namnen.
    var namesNewString = names.join(", ");
    
    // Skapar en array med alla åldrar från objekten. Sorterar sedan. Adderar även ihop alla åldrar.
    var agesTotal = 0;
    var ages = persArr.map(function(person){
        agesTotal += person.age;
        return person.age;
    });
    ages.sort();
    

    // Skapar det nya objektet med de nya värdena.
    var newObject = {
        minAge: ages[0],
        maxAge: ages[ages.length-1],
        averageAge: Math.round(((agesTotal) / ages.length)),
        names: namesNewString
    };
    
	return newObject;
    
};

