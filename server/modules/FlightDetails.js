class FlightDetails {
    static fDetail_list = [];


    constructor(id, segments, totalPrice, averagePrice, currencySymbol) {

        this.id = id;
        this.segments = segments;
        this.totalPrice = totalPrice;
        this.averagePrice = averagePrice;
        this.currencySymbol = currencySymbol;

    }
    static add(id, segments, totalPrice, averagePrice, currencySymbol) {
        this.fDetail_list.push(new FlightDetails(id, segments, totalPrice, averagePrice, currencySymbol));
    }



}
module.exports = FlightDetails;