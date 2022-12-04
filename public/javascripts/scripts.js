const buttonGerecht = document.getElementById("buttonVoegGerechtToe");
const winkelMand = document.getElementById("winkelMand");



buttonGerecht.addEventListener('click', () => {
    var Gerecht = buttonGerecht.getAttribute('gerecht').split('"');
    var GerechtId = Gerecht[3];  
    var WinkelmandItem = buttonGerecht.getAttribute('winkelmandItem');
    var winkelMandObject = buttonGerecht.getAttribute('winkelmand');
     
    console.log(winkelMandObject.);
    
})    

