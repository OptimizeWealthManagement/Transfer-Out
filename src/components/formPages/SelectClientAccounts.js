import React, { useState } from 'react';
import Confirm from './Confirm';

const SelectClientAccounts = ({ contactData, contactId }) => {
    const accountData = contactData.data.CRM.contact.associations;
    const [inputFields, setInputFields] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [clientFormSubmitted, setClientFormSubmitted] = useState(false);

    const handleInputChange = (event, account_number) => {
        const { name, value } = event.target;
        setInputFields((prevState) => ({
            ...prevState,
            [account_number]: {
                ...prevState[account_number],
                [name]: value,
            },
        }));
    };

    const entity_accounts = accountData.p_account_object_collection__entity_account.items;
    const individual_accounts = accountData.p_account_object_collection__individual_account.items;
    const corporate_accounts = accountData.p_account_object_collection__corporate_account.items;
    const joint_accounts = accountData.p_account_object_collection__joint_account.items;

    // Combine all account types into one array
    const all_accounts = [...entity_accounts, ...individual_accounts, ...corporate_accounts, ...joint_accounts];

    const handleRowClick = (index) => {
        setSelectedRows(selectedRows.includes(index) ? selectedRows.filter((i) => i !== index) : [...selectedRows, index]);
    };

    const calculateTotalMarketValue = () => {
        let totalMarketValue = 0;
        all_accounts.forEach((account) => {
            totalMarketValue += account.market_value;
        });
        return totalMarketValue;
    };

    const totalValue = calculateTotalMarketValue();

    // Combine inputs into an array of objects
    const SubmitForm = () => {
        // get all of the selected row information
        const selectedAccounts = selectedRows.map((index) => all_accounts[index]);
        const selectedInputFields = selectedAccounts.map((account) => ({
            accountInfo: account,
            inputFields: inputFields[account.account_number],
        }));
        setSelectedAccounts(selectedInputFields);
        setClientFormSubmitted(true);
    };


    if (clientFormSubmitted) {
        return (
            <div>
                <Confirm selectedRows={selectedAccounts} contactId={contactId} contactData={contactData} totalValue={totalValue}/>
            </div>
        );
    }

    return (
        <div>
            <h2>Select Client Accounts</h2>
            <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                <table className="table fs-5">
                    <thead style={{ backgroundColor: '#1c3258', color: 'white' }}>
                        <tr>
                            <th scope="col">Account Number</th>
                            <th scope="col">Account Name</th>
                            <th scope="col">Account Type</th>
                            <th scope="col">Assigned Model</th>
                            <th scope="col">Market Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_accounts.map((row, index) => (
                            <>
                                <tr key={row.account_number} onClick={() => handleRowClick(index)} className={selectedRows.includes(index) ? 'table-secondary' : ''}>
                                    <td>
                                        <ul
                                            style={{
                                                marginBottom: '0px !important',
                                                marginBlockEnd: '0px',
                                            }}
                                        >
                                            {row.account_number}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul
                                            style={{
                                                marginBottom: '0px !important',
                                                marginBlockEnd: '0px',
                                            }}
                                        >
                                            {row.account_name}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul
                                            style={{
                                                marginBottom: '0px !important',
                                                marginBlockEnd: '0px',
                                            }}
                                        >
                                            {row.account_type.label}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul
                                            style={{
                                                marginBottom: '0px !important',
                                                marginBlockEnd: '0px',
                                            }}
                                        >
                                            {row.assigned_model}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul
                                            style={{
                                                marginBottom: '0px !important',
                                                marginBlockEnd: '0px',
                                            }}
                                        >
                                            {row.market_value}
                                        </ul>
                                    </td>
                                </tr>
                                {selectedRows.includes(index) && (
                                    <tr className="table-secondary">
                                        <td colSpan="6">
                                            <form>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '200px',
                                                            marginRight: '10px',
                                                        }}
                                                    >
                                                        <label htmlFor="transferType" class="form-label">
                                                            Transfer Type
                                                        </label>
                                                        <select id="transferType" name="transferType" class="form-select" value={inputFields[row.account_number]?.transferType || 'All in cash'} onChange={(e) => handleInputChange(e, row.account_number)}>
                                                            <option value="All in cash">All in cash</option>
                                                            <option value="All in kind">All in kind</option>
                                                            <option value="Partial">Partial</option>
                                                            <option value="Mixed">Mixed</option>
                                                        </select>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    >
                                                        <label htmlFor="partialAmount" class="form-label">
                                                            Partial Amount
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="partialAmount"
                                                            className="form-control"
                                                            name="partialAmount"
                                                            disabled={inputFields[row.account_number]?.transferType !== 'Partial' && inputFields[row.account_number]?.transferType !== 'Mixed'} // if our transferType is not set, this value remains disabled
                                                            value={inputFields[row.account_number]?.partialAmount || ''}
                                                            onChange={(e) => handleInputChange(e, row.account_number)}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    >
                                                        <label htmlFor="receivingInstitution" class="form-label">
                                                            Receiving Institution
                                                        </label>
                                                        <input type="text" className="form-control" id="receivingInstitution" name="receivingInstitution" value={inputFields[row.account_number]?.receivingInstitution || ''} onChange={(e) => handleInputChange(e, row.account_number)} required />
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    >
                                                        <label htmlFor="receivingAccountNumber" class="form-label">
                                                            Receiving Account Number
                                                        </label>
                                                        <input type="text" className="form-control" id="receivingAccountNumber" name="receivingAccountNumber" value={inputFields[row.account_number]?.receivingAccountNumber || ''} onChange={(e) => handleInputChange(e, row.account_number)} required />
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        marginRight: '10px',
                                                    }}
                                                >
                                                    <label htmlFor="receivingAccountNumber" class="form-label">
                                                        Transfer Instructions
                                                    </label>
                                                    <textarea className="form-control" id="transferInstructions" name="transferInstructions" value={inputFields[row.account_number]?.transferInstructions || ''} onChange={(e) => handleInputChange(e, row.account_number)} required />
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                type="button"
                style={{ backgroundColor: '#1c3258', width: '180px' }}
                className="btn btn-secondary btn-lg mr-2 btn-settings "
                onClick={SubmitForm}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0f1f38')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1c3258')}
                disabled={selectedRows.length === 0}
            >
                Continue
            </button>
        </div>
    );
};

export default SelectClientAccounts;
