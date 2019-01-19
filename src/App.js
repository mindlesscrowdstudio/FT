import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    }
  }
  componentDidMount() {
    const API_SHEET = 'https://sheets.googleapis.com/v4/spreadsheets/1p5gAr7EKeCCZN_GzQ-u4jjfKyEe82Z8WMLZmOnrBXgo/values:batchGet?majorDimension=ROWS&ranges=Sheet1&key=AIzaSyD6m8QpTi2vBoqo06oozNI9fcbApKPirzQ';

    fetch(API_SHEET).then(
      response => response.json()).then(
        data => {
          let rowValues = data.valueRanges[0].values;
          console.log(rowValues);
          const rows = [];

          for (let i = 1; i < rowValues.length; i++) {
            console.log(rowValues.length);
            let rowObject = {};

             for (let j = 0; j < rowValues[i].length; j++) {
              rowObject[rowValues[0][j]] = rowValues[i][j];
            }
            rows.push(rowObject);

          }
          this.setState({items: rows});
          console.log(this.state.items);
        }
      );

  }
  render() {
    const listItems = this.state.items.map((item) => <li key={item.idname}>{item.idname} with {item.lat} and {item.long}</li>)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
          <ul><li>{listItems}</li></ul>
        </header>


      </div>
    );
  }
}

export default App;
