import axios from 'axios';

const GraphQLFetchContact = async ({ contact_id }) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://7515101.hs-sites.com/_hcms/api/GetContactAccounts?contact_id=${contact_id}`,
        headers: {
            Cookie: '__cfruid=b6cf730f0773743ce9dec6a4fae483efa38582e2-1715697276',
        },
    };

    try {
        const response = await axios.request(config);
        console.log('GraphQL Data response', response.data);
        if (!response.data.data.CRM.contact.firstname) {
            return false;
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default GraphQLFetchContact;
