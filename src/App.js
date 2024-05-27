import React from 'react';
import './App.scss';
import FetchCrmContact from './components/formPages/fetchCrmContact';

function App() {

  const renderForm = () => {
    return (
      <div>
        <FetchCrmContact />
      </div>
    );
  };

  return (
    <div className="cms-react-boilerplate__container">
        {renderForm()}
    </div>
  );
}

export default App;
