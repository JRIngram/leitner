import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar/Navbar';
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
