import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Characters from "./components/Characters";
import NavBar from "./components/NavBar";
import Episodes from "./components/Episodes";
import Locations from "./components/Locations";
import MyList from "./components/MyList";

interface IState {}
interface IProps {}



class App extends React.Component<IProps, IState> {

  render() {
    return (
        <BrowserRouter>
            <NavBar />
        <Route path="/Characters" component={Characters}/>
            <Route path="/Episodes" component={Episodes}/>
            <Route path="/Locations" component={Locations}/>
            <Route path="/MyList" component={MyList}/>
        </BrowserRouter>
    );
  }
}


export default App;
