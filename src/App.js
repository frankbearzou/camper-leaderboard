import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Detail from './components/Detail';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Detail/>
        <Footer/>
      </div>
    );
  }
}



export default App;
