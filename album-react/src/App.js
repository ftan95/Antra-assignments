import React, {Component} from 'react';
import './App.css';
import AlbumCardContainerClass from './components/AlbumCardContainerClass';
import AlbumCardContainerFn from './components/AlbumCardContainerFn';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        {/* <AlbumCardContainerClass /> */}
        <AlbumCardContainerFn />
      </div>
    );
  }
}

export default App;
