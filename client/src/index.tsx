import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/navbar';
import Manage from './screens/Manage';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Manage />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
