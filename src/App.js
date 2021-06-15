import React from 'react';
import Canvas from './components/canvas/Canvas';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';
import WebglCanvas from './components/webgl-canvas/WebglCanvas';
import Elements from './components/webgl-elements/Elements';
import PixiComponents from './components/pixi-components/PixiComponents';
import Main from './components/svg/Main';

class App extends React.Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/svg">
            <Main></Main>
          </Route>
          <Route path="/pixi">
            <PixiComponents></PixiComponents>
          </Route>
          <Route path="/elements">
            <Elements></Elements>
          </Route>
          <Route path="/webgl">
            <WebglCanvas></WebglCanvas>
          </Route>
          <Route
            path='/'
            component={Canvas}
          />
        </Switch>
      </Router>
    )
  }
};

export default App;
