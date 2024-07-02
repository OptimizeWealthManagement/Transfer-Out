import React from 'react';
import './App.scss';
import FetchCrmContact from './components/formPages/fetchCrmContact';

function App({ brokerageTable }) {


    const renderForm = () => {
        return (
            <div>
                <FetchCrmContact brokerageTable={JSON.parse(brokerageTable)}/>
            </div>
        );
    };

    return <div className="cms-react-boilerplate__container">{renderForm()}</div>;
}

export default App;
