import { Beer } from "Domain/Models/Beer/Beer";
import { Status } from "Domain/Models/Beer/Stock/Status";

export class BeerDto{
    public readonly beerId: string;
    public readonly name: string;
    public readonly price: number;
    public readonly stockId: string;
    public readonly quantity: number;
    public readonly status: Status

    constructor(beer: Beer) {
        this.beerId = beer.getBeerId.getValue
        this.name = beer.getBeerName.getValue
        this.price = beer.getPrice.getAmount
        this.stockId = beer.getStockId.getValue
        this.quantity = beer.getQuantity.getValue
        this.status = beer.getStatus
    }
}