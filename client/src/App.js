import React,{useEffect,useState} from 'react'
import FlightsList from './comps/FlightsTable.js';




export default function App() {


  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api')
    .then(res=>{
      return res.json();
    })
    .then(result=>{
      setData(result)
    })

}, []);

const fetchAgain=()=>{

    fetch('/api')
    .then(res=>{
      return res.json();
    })
    .then(result=>{
      setData(result)
    })

}
  return (
    <div className="container" key={data.map(item => item.id)} >  
    <button className='btn-success'onClick={fetchAgain}>Refresh</button>
     <FlightsList  data={data} />

  </div>  

  
  );
  
}



