import React, { useState } from 'react';
import GraphQLFetchContact from '../../services/GraphQLFetchConact.mjs';
import SelectClientAccounts from './SelectClientAccounts';
import Loading from '../PageElements/Loading';

function FetchCrmContact() {
    const [contactId, setContactId] = useState('');
    const [isFetchSuccessful, setIsFetchSuccessful] = useState();
    const [contactData, setContactData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setContactId(e.target.value);
        setIsFetchSuccessful();
    };

    const FetchCrmContact = async () => {
        setIsLoading(true);
        const response = await GraphQLFetchContact({ contact_id: contactId });
        if (response !== false) {
            setContactData(response);
            setIsLoading(false);
            setIsFetchSuccessful(true);
        }
        else {
            setIsLoading(false);
            setIsFetchSuccessful(false);
            setContactData('');
        }
    };

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (isFetchSuccessful) {
        return (
            // Render your next form here
            <div>
                <SelectClientAccounts contactData={contactData} contactId={contactId} />
            </div>
        );
    }

    return (
        <div>
            <h1 className="mt-4">Fetch CRM Contact</h1>
            <div className="input-group mb-4">
                <input type="text" className="form-control" id="contactId" value={contactId} onChange={handleInputChange} placeholder="Enter contact ID" />
            </div>
            {isFetchSuccessful === false ? (
                <div className="alert alert-danger" role="alert" style={{fontSize: '14px'}}>
                    Contact not found, please ensure that the contact ID is correct.
                </div>
            ) : null}
            <button
                type="button"
                style={{ backgroundColor: '#1c3258', width: '180px' }}
                className="btn btn-secondary btn-lg mr-2 btn-settings "
                onClick={FetchCrmContact}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0f1f38')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1c3258')}
            >
                Fetch Contact
            </button>
        </div>
    );
}

export default FetchCrmContact;
