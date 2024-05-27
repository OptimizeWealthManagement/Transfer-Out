import axios from 'axios';

async function hubspotWebhook(properties, contactId) {
    console.log('hubspotWebhook properties', properties);

    // Add the contact ID to the properties object
    properties.contactId = contactId;

    try {
        // Make a POST request to the HubSpot webhook URL
        const response = await axios.post('https://7515101.hs-sites.com/_hcms/api/CreateTransferTickets', properties);

        // Check if the request was successful
        if (response.status === 200) {
            console.log('Webhook triggered successfully');
            return response;
        } else {
            console.log('Failed to trigger webhook');
        }
    } catch (error) {
        console.error('An error occurred while calling the function:', error);
        return false;
    }
}
export default hubspotWebhook;
