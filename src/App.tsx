import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Characters from "./components/Characters";


interface IState {

}

interface IProps {

}



class App extends React.Component<IProps, IState> {




  render() {
    return (
        <BrowserRouter>
        <Characters FetchCharacters={() => {return function () {}}} CharactersReducer={{}} />
        </BrowserRouter>
    );
  }
}


export default App;
