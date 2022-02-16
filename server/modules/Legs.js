  class Legs {
      static legs_list = [];

      constructor(departurePoint, arrivalPoint, flightNumber, airlineName, airlineCode) {

          this.departurePoint = departurePoint;
          this.arrivalPoint = arrivalPoint;
          this.flightNumber = flightNumber;
          this.airlineName = airlineName;
          this.airlineCode = airlineCode;
      }
      static add(departurePoint, arrivalPoint, flightNumber, airlineName, airlineCode) {
          this.legs_list.push(new Legs(departurePoint, arrivalPoint, flightNumber, airlineName, airlineCode));
      }
      static initialize() {
          this.legs_list = []
      }


  }

  module.exports = Legs, this.legs_list