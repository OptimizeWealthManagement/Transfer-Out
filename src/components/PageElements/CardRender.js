import React from 'react';

const CardRender = ({ cardData }) => {

    // GraphQL call to pull our account Data
    const account = {
        accountNumber: cardData.accountInfo.account_number || '',
        accountName: cardData.accountInfo.account_name || '',
        accountType: cardData.accountInfo.account_type.value || '',
        marketValue: cardData.accountInfo.market_value || '0',
    };

    // Inputs from our user
    const inputs = {
        receivingAccountNumber: cardData.inputFields.receivingAccountNumber || '',
        receivingInsitution: cardData.inputFields.receivingInstitution || '',
        transferType: cardData.inputFields.transferType || 'All in cash', // set to all assuming value has never changed
        partialAmount: cardData.inputFields.partialAmount || '',
        transferInstructions: cardData.inputFields.transferInstructions || '',
    };
    return (
        <div className="card" style={{ width: '800px', marginBottom: '10px' }}>
            <div className="card-body" style={{ textAlign: 'left' }}>
                <h3 className="card-title">
                    {account.accountName} - {account.accountNumber}
                </h3>
                <h5 class="card-text">Receiving Account Number: {inputs.receivingAccountNumber}</h5>
                <h5 class="card-text">Receiving Institution: {inputs.receivingInsitution}</h5>
                <h5 class="card-text">Transfer Type: {inputs.transferType}</h5>
                {inputs.transferType !== 'All in cash' && <h5 class="card-text">Amount: {inputs.partialAmount}</h5>}
                {inputs.transferType === 'All in cash' && <h5 class="card-text">Amount: {account.marketValue}</h5>}
                <h5 class="card-text">Transfer Instructions: {inputs.transferInstructions}</h5>
            </div>
        </div>
    );
};

export default CardRender;
