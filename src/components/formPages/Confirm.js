import React from 'react';
import CardRender from '../PageElements/CardRender';
import hubspotWebhook from '../../services/hubspotWebhook';

const Confirm = ({ selectedRows, contactId }) => {

    const submitTickets = () => {
        // loop through each request and submit a unique ticket
        selectedRows.forEach((row) => {
            // call the hubspot webhook
            hubspotWebhook(row, contactId);
        });
    };

    return (
        <div>
            <div style={{ height: '50%', overflow: 'scroll' }}>
                <h1 className="mt-4">Confirm Transfer</h1>
                {selectedRows.map((row, index) => (
                    <CardRender key={index} cardData={row} />
                ))}
            </div>
            <button
                type="button"
                style={{ backgroundColor: '#1c3258', width: '180px' }}
                className="btn btn-secondary btn-lg mr-2 btn-settings "
                onClick={submitTickets}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0f1f38')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1c3258')}
            >
                Submit
            </button>
        </div>
    );
};

export default Confirm;
