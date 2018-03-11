import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const STATS = [
  { offense: 'MURDER & NON-NEGL. MANSLAUGHTER', 2016: 335,   2017: 292 },
  { offense: 'RAPE',                            2016: 1438,  2017: 1449 },
  { offense: 'ROBBERY',                         2016: 15500, 2017: 13956 },
  { offense: 'FELONY ASSAULT',                  2016: 20847, 2017: 20052 },
  { offense: 'BURGLARY',                        2016: 12990, 2017: 12083 },
  { offense: 'GRAND LARCENY',                   2016: 44279, 2017: 43150 },
  { offense: 'GRAND LARCENY OF MOTOR VEHICLE',  2016: 6327,  2017: 5676 }
]

class App extends Component {
  constructor() {
    super();

    this.handleSort = this.handleSort.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      sortColumn: 'none',
      sortDirection: 'none',
      stats: STATS.slice()
    }
  }

  handleSort(column) {
    if (this.state.sortDirection === 'none') {
      this.setState({
        sortColumn: column,
        sortDirection: 'asc',
        stats: this.state.stats.sort((a, b) => a[column] > b[column])
      });
    } else if (this.state.sortDirection === 'asc') {
      this.setState({
        sortColumn: column,
        sortDirection: column === this.state.sortColumn ? 'desc' : 'asc',
        stats: this.state.stats.sort((a, b) => a[column] < b[column])
      });
    } else {
      this.setState({
        sortColumn: 'none',
        sortDirection: column === this.state.sortColumn ? 'none' : 'asc',
        stats: STATS.slice()
      });
    }
  }

  onClick(column) {
    return () => this.handleSort(column);
  }

  renderSortMarker(column) {
    let marker = '';
    if (column === this.state.sortColumn) {
      if (this.state.sortDirection === 'asc')
        marker = '^';
      else if (this.state.sortDirection === 'desc')
        marker = 'v';
      return <span>{marker}</span>;
    }
    return null;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <table>
          <tbody>
            <tr>
              <th onClick={this.onClick('offense')}>
                Offense {this.renderSortMarker('offense')}
              </th>
              <th onClick={this.onClick('2016')}>
                2016 {this.renderSortMarker('2016')}
              </th>
              <th onClick={this.onClick('2017')}>
                2017 {this.renderSortMarker('2017')}
              </th>
            </tr>
            {this.state.stats.map(function(stat) {
              return (
                <tr>
                  <td>{stat.offense}</td>
                  <td className="number">{stat[2016]}</td>
                  <td className="number">{stat[2017]}</td>
                </tr>
              );
            })}
            <tr><td>TOTAL</td>
              <td>{this.state.stats.reduce(function(acc, stat) {
                return acc + stat[2016];
              }, 0)}</td>
              <td>{this.state.stats.reduce(function(acc, stat) {
                return acc + stat[2017];
              }, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
