import React from 'react';
import CardRender from '../PageElements/CardRender';
import hubspotWebhook from '../../services/hubspotWebhook';

const Confirm = ({ selectedRows, contactId, contactData }) => {
    const [submittedSuccess, setSubmittedSuccess] = React.useState(false);

    const submitTickets = async () => {
        // loop through each request and submit a unique ticket
        const promises = selectedRows.map(async (row) => {
            // call the hubspot webhook
            await hubspotWebhook(row, contactId, contactData);
        });

        await Promise.all(promises);

        setSubmittedSuccess(true);
        // once this is done set a state and render a success page
    };

    if (submittedSuccess) {
        return (
            <div>
                <h1 className="mt-4">Success</h1>
                <div className="alert alert-success" role="alert" style={{ fontSize: '14px' }}>
                    Tickets have been submitted successfully.
                </div>
            </div>
        );
    }

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
