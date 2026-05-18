const API_Address = "172.25.48.1";
const API_Domain = `http://${API_Address}:7152`;

export default async function ApiRequest(endpoint, method, body=null, isFormData=false) {
    try {
        let headers = {};

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_Domain}/${endpoint}`, {
            method: method,
            headers: headers,
            body: isFormData ? body: body ? JSON.stringify(body) : null
        });

        return response;
    } catch (error) {
        console.error('API Manager Error ', error)
    }
}