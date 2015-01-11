"use strict";

var desktop = {
    
    galleryImages: [],
    isWindowOpen: false,
    
    init:function(){
        var imageViewerIconAnchor = document.getElementById("imageViewerIconAnchor");
        imageViewerIconAnchor.addEventListener("click", desktop.createimageViewer);
    },
    
    createimageViewer:function(){
        
        // Kontrollera om fönstret redan är öppet.
        if (desktop.isWindowOpen === false) {
            desktop.isWindowOpen = true;
        }
        else {
            return;
        }
        
        // Skapar taggar till fönstret.
        var newDivisionBox = document.createElement("div");
        var newDivisionTop = document.createElement("div");
        var newDivisionContent = document.createElement("div");
        var newDivisionBottom = document.createElement("div");
        var newParagraphTop = document.createElement("p");
        var newParagraphBottom = document.createElement("p");
        var newAnchor = document.createElement("a");
        var newImgageIcon = document.createElement("img");
        var newImgageCloseButton = document.createElement("img");
        var newImageLoading = document.createElement("img");
        
        // Sätter attribut på "newDivisionBox".
        newDivisionBox.setAttribute("id", "testDiv");
        newDivisionBox.setAttribute("class", "newWindow");
        
        // Sätter attribut på taggar inom "newDivisionTop"
        newDivisionTop.setAttribute("class", "divTop");
        newDivisionTop.setAttribute("padding", "2px");
        newImgageIcon.setAttribute("src", "pics/ImageViewerIcon.png");
        newImgageIcon.setAttribute("width", "20px");
        newImgageIcon.setAttribute("height", "20px");
        newParagraphTop.innerHTML = "ImageViewer";
        newImgageCloseButton.setAttribute("src", "pics/CloseButton.png");
        newImgageCloseButton.setAttribute("width", "15px");
        newAnchor.addEventListener("click", desktop.deleteDiv);
        newAnchor.setAttribute("href", "#");
        newAnchor.setAttribute("id", "closeWindowAnchor");
        
        // Sätter attribut på taggar inom "newDivisionContent"
        newDivisionContent.setAttribute("class", "divContent");
        newDivisionContent.setAttribute("id", "BoxContent");
        
        // Sätter attribut på taggar inom "newDivisionBottom"
        newImageLoading.setAttribute("src", "pics/ajax-loader.gif");
        newDivisionBottom.setAttribute("class", "divBottom");
        newDivisionBottom.setAttribute("id", "BoxBottom");
        newParagraphBottom.innerHTML = "Laddar";
        
        // Sorterar in de olika taggarna.
        newDivisionTop.appendChild(newImgageIcon);
        newDivisionTop.appendChild(newParagraphTop);
        newAnchor.appendChild(newImgageCloseButton);
        newDivisionTop.appendChild(newAnchor);
        newDivisionBox.appendChild(newDivisionTop);
        newDivisionBox.appendChild(newDivisionContent);
        newDivisionBottom.appendChild(newImageLoading);
        newDivisionBottom.appendChild(newParagraphBottom);
        newDivisionBox.appendChild(newDivisionBottom);
        document.getElementById("desktopScreen").appendChild(newDivisionBox);
        
        // Kör funktion som laddar bilder.
        desktop.loadPics();
    },
    
    deleteDiv:function(){
        var element = document.getElementById("desktopScreen");
        element.innerHTML = "";
        desktop.isWindowOpen = false;
    },
    
    loadPics:function(){
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
        
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    
                    // Tar bort "Laddar" i statusraden.
                    document.getElementById("BoxBottom").innerHTML = "";
                    
                    // Skapar objekt från inläsningen från Ajax.
                    var picsObject = {};
                    picsObject = JSON.parse(xhr.responseText);
                    
                    // Variablar som innehåller största bredd och höjd av thumbbilder.
                    var imageWidth = 0;
                    var imageHeight = 0;
                    
                    // Loopar igenom bilderna och väljer ut största bredden och höjden.
                    for (var i = 0; i < picsObject.length; i += 1)
                    {
                        if (picsObject[i].thumbWidth > imageWidth){
                            imageWidth = picsObject[i].thumbWidth;
                        }
                        if (picsObject[i].thumbHeight > imageHeight){
                            imageHeight = picsObject[i].thumbHeight;
                        }
                    }
                    
                    // Loopar igenom varje objekt i objektet.
                    for (var i = 0; i < picsObject.length; i += 1)
                    {
                        desktop.createPicGallery(i, picsObject, imageWidth, imageHeight);
                    }
                }
            }
        };
        xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/" , true);
        xhr.send(null); 
    },
    
    createPicGallery:function(picID, picsObject, maxWidth, maxHeight){
        // Lägger till varje objekt i galleryImages[]
        desktop.galleryImages.push(picsObject[picID]);
                        
        // Skapar tagg.
        var newDivisionImageInside = document.createElement("div");
        var newImageInContent = document.createElement("img");
        var newAnchor = document.createElement("a");
                        
        // Sätter attribut.
        newDivisionImageInside.setAttribute("class", "divImageInside");
        newImageInContent.setAttribute("src", picsObject[picID].thumbURL);
        newImageInContent.setAttribute("height", maxHeight);
        newDivisionImageInside.setAttribute("style", "width:" + (maxWidth) + "px; height: " + maxHeight + "px");
            
        // Lägger till addEventListner till att byta bakgrund. Skickar med ID till bilden.
        newAnchor.addEventListener("click", function(){
            desktop.changeBackground(picID);
        });
        
        // Sätter attribut på ankaret.
        newAnchor.setAttribute("href", "#");
        newAnchor.appendChild(newImageInContent);
            
        newDivisionImageInside.appendChild(newAnchor);
            
        document.getElementById("BoxContent").appendChild(newDivisionImageInside);
    },
    
    changeBackground:function(picID){
        // Ändrar bakgrundsbild.
        var backgroundToChange = document.getElementById("container");
        backgroundToChange.setAttribute("style", "background: url('"+desktop.galleryImages[picID].URL+"');");
    }
};

window.onload = desktop.init;