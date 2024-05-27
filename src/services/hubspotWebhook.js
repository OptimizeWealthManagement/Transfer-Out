import axios from 'axios';

async function hubspotWebhook(properties, contactId) {

    // Add the contact ID to the properties object
    properties.contactId = contactId;

    try {
        // Make a POST request to the HubSpot webhook URL
        const response = await axios.post('https://7515101.hs-sites.com/_hcms/api/CreateTransferTickets', properties);

        // Check if the request was successful
        if (response.status === 200) {
            return response;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
}
export default hubspotWebhook;
