window.onload = function(){
 
    document.getElementById("knapp").addEventListener("click", function(){
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            
            if (xhr.readyState === 4 && xhr.status === 200){
                
                var pers = JSON.parse(xhr.responseText);
                console.log(pers);
                
            }
        };
        
        xhr.open("GET", "http://vhost3.lnu.se:20080", true);
        xhr.setRequestHeader("Content-type","application/json");
        
        xhr.send("hej");
        
    });
 
 
 
 
    
}