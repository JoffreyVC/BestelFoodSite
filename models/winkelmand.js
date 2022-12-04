//Bij het toevoegen van een nieuw item wordt er steeds een nieuwe winkelmand gemaakt op basis van de oude
module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    
    //cecken of het item dat we willen toevoegen al in de winkelwagen zit
    this.add = function(item, id){
        var storedItem = this.items[id];
        //Nieuw item maken als het er nog niet inzit
        if (!storedItem) {
            storedItem = this.items[id] = {item:item, qty:0, price:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.prijs*storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.prijs;

    };
    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.prijs;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.prijs;
        
        if (this.items[id].qty <= 0){
            delete this.items[id];
        }
    };
    
     this.addByOne = function(id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.prijs;
        this.totalQty++;
        this.totalPrice += this.items[id].item.prijs;
    };
    
    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
        
    };
    
    
    //Creeert een array van de gerechten die in de winkelmand zitten
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};