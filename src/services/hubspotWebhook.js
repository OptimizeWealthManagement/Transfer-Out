import axios from 'axios';

async function hubspotWebhook(properties, contactId, contactData) {
    // Add the contact ID to the properties object
    properties.contactId = contactId;
    properties.contactData = contactData.data.CRM.contact;

    try {
        // Make a POST request to the HubSpot webhook URL
        const response = await axios.post('https://7515101.hs-sites.com/_hcms/api/CreateTransferTickets', properties);
        // Check if the request was successful
        if (response.status === 200) {
            return response;
        } else {
            console.log(response);
            return false;
        }
    } catch (error) {
        return error;
    }
}
export default hubspotWebhook;
