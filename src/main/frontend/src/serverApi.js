import 'whatwg-fetch';

export default function serverApi() {
    function doGet(url) {
        return doRequest('GET', url);
    }

    function generateServerError(response) {
        return new Error(response.statusText + '(' + response.status + ')');
    }

    function parseStatusCode(response) {
        let successStatusCodes = [200, 203];

        if (successStatusCodes.includes(response.status)) {
            return Promise.resolve(response);
        } else {
            let error = generateServerError(response);
            return Promise.reject(error);
        }
    }

    function parseJsonResponse(response) {
        try {
            return Promise.resolve(response.json());
        } catch (exception) {
            let message = 'Client is expecting JSON but server is returning HTML. Are you sure you are running the right backend?';
            /* eslint-disable */
            console.error(message);
            /* eslint-enable */
            return Promise.reject({message});
        }
    }

    function doRequest(method, url, content = undefined) {
        return fetch(url, {
            method: method,
            headers: headers(),
            body: JSON.stringify(content),
            credentials: 'same-origin'
        })
            .catch((error) => {
                return Promise.reject({message: 'Network problem:' + error.toString()});
            })
            .then(parseStatusCode)
            .then(parseJsonResponse);

    }

    function headers() {
        return {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
    }

    return {
        loadEstablishments: () => {
            return doGet("http://localhost:8000/some_url");
        }
    };
}