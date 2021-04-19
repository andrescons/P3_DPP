import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import { useGoogleMaps } from "react-hook-google-maps";

const uluru = { lat: -25.344, lng: 131.036 };


const SideBar = (props: {setPath}) => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [results, setResults] = useState([])

  const onSubmit = ()=> {
    // magia 

   
  }

  const onSearchInputChange = (e)=> {
    setSearchInputValue(e.target.value)
     setResults([...results,e.target.value ])
    props.setPath(results)
  }

  return (
    <div style={{
      backgroundColor:'red',
      height:'100vh',
      width:'50vh',
      padding: 50
    }}>
      <div style={{background:'orange'}}>
        <input type="text" onChange={
          onSearchInputChange
        }/>

        {/* {results.map(r=> <h3>{r}</h3>)} */}

      </div>

    </div>
  );
};



const Map = (props)=> {
  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk",
    // NOTE: even if you change options later
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    },
  );

  useEffect(()=> {
    console.log('AQUI', map, props.path)
    if (map) {
      // execute when map object is ready
      new google.maps.Marker({ position: uluru, map });
    }

  //  new google.maps.Marker({ position: uluru, map });
  } ,[props.path])

  
  return (
    <div
    ref={ref} style={{ width: '80vh', height: '100%' }}
    >
    </div>
  )
}


const Screen = ()=> {
  const [path, setPath] = useState([])

  return(
  <div style={{
    display:'flex',
    flexDirection:'row'
  }}>
    <SideBar setPath={setPath}></SideBar>    
    <Map path={path}/>
  </div>)
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Screen} />
      </Switch>
    </Router>
  );
}
