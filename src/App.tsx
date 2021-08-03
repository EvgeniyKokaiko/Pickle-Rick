import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Characters from "./components/Characters";
import NavBar from "./components/NavBar";

interface IState {}
interface IProps {}



class App extends React.Component<IProps, IState> {

  render() {
    return (
        <BrowserRouter>
            <NavBar />
        <Route path="/Characters" component={Characters}/>
        </BrowserRouter>
    );
  }
}


export default App;
