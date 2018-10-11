import {config} from './config';

class Api{
    send(url, requestOptions){
        debugger;
        return fetch(`${config.apiUrl}${url}`, requestOptions)
        .then(this.handleResponse, this.handleError);
    }

    get(url){
        var requestOptions = {
            method: 'GET'
        };

        return this.send(url, requestOptions)
    }

    post(url, data){
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return this.send(url, requestOptions);
    }

    handleResponse(response) {
        return new Promise((resolve, reject) => {
            if (response.ok) {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    response.json().then(json => resolve(json));
                } else {
                    resolve();
                }
            } else {
                response.text().then(text => reject(text));
            }
        });
    }
    
    handleError(error) {
        return Promise.reject(error && error.message);
    }
}

export default new Api();

