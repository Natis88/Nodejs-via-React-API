
import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody  } from 'mdb-react-ui-kit';
import '../App.css'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const filtersAirlines = {
  type: []
};
const filtersConnections = {
  type: []
};
var len=0;
export default function FlightsList(props) {
      const data=props.data
      
      const [filtersSt, setFiltersASt] =  useState(filtersConnections);
      const [filtersAl, setFiltersAl] = useState(filtersAirlines);
     
      /////handle airline filter function

      const handleFilterAlChange = (e, label) => {
        setFiltersAl({
          ...filtersAl,
          type: e.target.checked
            ? [...filtersAl.type, label]
            : filtersAl.type.filter((i) => i !== label)
        });
      };
        /////handle connections filter function
      const handleFilterStChange = (e, label) => {
        setFiltersASt({
          ...filtersSt,
          type: e.target.checked
            ? [...filtersSt.type, label]
            : filtersSt.type.filter((i) => i !== label)
        });
      };
   //initialize airlines array
      const airlines = []
      data.map(flight => (flight.segments.legs.map((ele) => (
        airlines.push(ele.airlineCode)
        ))),)
   //initialize prices array
      const prices = []
        data.map((item) =>  (
        prices.push(item.totalPrice)
      ))
  //initialize connections array
      const connections=[]
      data.map(flight => (
        connections.push(flight.segments.legs.length)
        ),)
 
      
      const uniquePrices = Array.from(new Set(prices));
      const uniqueNames = Array.from(new Set(airlines));
      const uniqueStops= Array.from(new Set(connections)).sort();
    
      const [price, setPrice] =  useState([0,Math.max.apply(0,uniquePrices)]);
     
      /////handle price filter function
      const rangeSelector = (event, newValue) => {
      setPrice(newValue);

  };

return (

//UpperMenu vendors,stops and price range
 <div>
    <div style={{marginLeft:'100%',marginBottom:'-7%'}}>
        <img src="ap.png" alt="" style={{width:'150px',height:'auto'}} />
    </div>
          <div className="form-check form-check-inline bg-dark text-white h-auto w-100  ">
  

          <b>Airline : </b>
    
           { uniqueNames.map((item,idx) =>( 
            <div key={idx} className="form-check form-check-inline ">
               <input 
               className="form-check-input" 
               type="checkbox"
                id="inlineCheckbox1" 
                value={item} 
                onChange={(e) => handleFilterAlChange(e, item)}
                checked={filtersAl.type.includes(item)}
                />
               <label className="form-check-label" htmlFor="inlineCheckbox1" style={{color:'white',fontSize:'11px'}}>{item}</label>
            </div> ))
            }
          


         <div><b>Connections  : </b>
       {uniqueStops.map((item,idx) =>( 
            <div key={idx} className="form-check form-check-inline " >
              <input 
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value={item} 
              onChange={(e) => handleFilterStChange(e, item)}
              checked={filtersSt.type.includes(item)}
              />
            <label className="form-check-label" htmlFor="inlineCheckbox2" style={{color:'white',fontSize:'13px'}}>{item-1}</label>
            </div> )) }
           
    
           
                  
      <div  style={{
      display: 'block',
      width: 'fit-content',
      fontWeight:'bold'
    }}>Select Price Range:
      <Typography id="range-slider" gutterBottom/>
      <Slider
        value={price}
        min={0}
        max={Math.max.apply(null,uniquePrices)}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
      />
      Your range of Price is between {price[0]} to {price[1]}
    </div>
        </div>
          </div>
        
        
     <div style={{margin:'20px',width:'100%',marginLeft:'0px'}}>
            <MDBTable  bordered striped hover >
                <MDBTableHead dark>
                <tr>
                <th>Flight number</th>
                <th>Departure time</th>
                <th>Arrival time</th>
                <th>From</th>
                <th>To</th>
                <th>Airline</th>
                <th>Price</th>
       
                </tr>
                </MDBTableHead>
             <MDBTableBody >
           {    
           
//Filter over table on vendors prices and stops
          data.filter(ven=>{
         
             if(filtersAl.type.length==0){return ven;}

        
             if(filtersAl.type.some(elem=>ven.segments.legs[0].airlineCode.includes(elem)))
             {
   
                return ven;
             }
            }).filter(st=>{
                    
              if(filtersSt.type.length==0){ return st;}
             
              else if(filtersSt.type.some(elem=>st.segments.legs.length==elem))   
              {return st;}                  
          
         
            }).filter(pr=> {
              if(price[0]==0 && price[1]==Math.max(null,uniquePrices)){return pr;}
              if(pr.totalPrice>=price[0]&&pr.totalPrice<=price[1]){return pr;}
            })
            
            
            .map((flight,idx) =>( flight.segments.legs.map((leg,idx)=>(
            len=flight.segments.legs,
                                  
            (idx==0)?
      
            <tr key={idx}  >
                <td><b>{leg.flightNumber}</b></td>
                <td>{leg.departurePoint.DateTime}</td>
                <td>{len[len.length-1].arrivalPoint.DateTime}</td>
                <td>{leg.departurePoint.AirportCode}</td>
                <td>{len[len.length-1].arrivalPoint.AirportCode}</td>
                <td>{leg.airlineCode}</td>
                <td>{flight.totalPrice}{flight.currencySymbol}</td>
               
            </tr>  
         
               :
               //for connections
         
          <details style={{color:'red'}} key={idx}  >
            <span style={{color:'black',fontSize:'13px'}}><b style={{color:'green'}}>FlightNumber:</b><b>{leg.flightNumber}</b></span>
            <span style={{color:'black',fontSize:'13px'}}><b style={{color:'green'}}>DepartureTime:</b>{leg.departurePoint.DateTime}</span>
            <span style={{color:'black',fontSize:'13px'}}><b style={{color:'green'}}>ArrivalTime:</b>{leg.arrivalPoint.DateTime}</span>
            <span style={{color:'black',fontSize:'13px'}}><b style={{color:'green'}}>From:</b>{leg.departurePoint.AirportCode}</span>
            <span style={{color:'black',fontSize:'13px'}}><b style={{color:'green'}}>To:</b> {leg.arrivalPoint.AirportCode}</span>

         </details> 
     ))   
   ))}

    </MDBTableBody>
</MDBTable>
      
    </div>
</div>

);}
