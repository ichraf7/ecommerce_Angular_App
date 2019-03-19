import { shoppingCartItem } from "./shopping-cart-item";

export class shoppingCart {
    items: shoppingCartItem[]
    constructor() { }

    public getQuantity() {
        let count = 0
        for (let item in this.items)
            count += this.items[item].quantity
        return count
    }
}