const FlightDetails = require('./FlightDetails');
const legs = require('./Legs');
const fDetails = require('./FlightDetails')
const flightsDb = require('../DB/Raw_data.json');
const Segment = require('../modules/Segment');



for (let i = 0; i < flightsDb.length; i++) {
    const id = flightsDb[i].ID;
    legs.initialize();

    for (let j = 0; j < flightsDb[i].Segments[0].Legs.length; j++) {

        const departurePoint = flightsDb[i].Segments[0].Legs[j].DeparturePoint
        const arrivalPoint = flightsDb[i].Segments[0].Legs[j].ArrivalPoint
        const flightNumber = flightsDb[i].Segments[0].Legs[j].FlightNumber
        const airlineName = flightsDb[i].Segments[0].Legs[j].AirlineName
        const airlineCode = flightsDb[i].Segments[0].Legs[j].AirlineCode
        legs.add(departurePoint, arrivalPoint, flightNumber, airlineName, airlineCode)

    }

    const segmentDuration = flightsDb[i].Segments[0].SegmentDuration
    const validatingCarrier = flightsDb[i].Segments[0].ValidatingCarrier
    const segment = new Segment(legs.legs_list, segmentDuration, validatingCarrier)


    const totalPrice = flightsDb[i].TotalPrice
    const averagePrice = flightsDb[i].AveragePrice
    const currencySymbol = flightsDb[i].CurrencySymbol
    fDetails.add(id, segment, totalPrice, averagePrice, currencySymbol)

}


module.exports = fDetails