import {BaseRequest} from './requests';

class Endpoints extends BaseRequest {
    constructor() {
        super();
    }

    Activities() {
        let context = this;
        return {
            get: async function () {
                return context.get('http://www.boredapi.com/', 'api/activity/', {
                    'Content-Type': 'application/json'
                })
            }
        }
    }
}

let endpoints: Endpoints;
endpoints = new Endpoints();
let activities = endpoints.Activities();

export {endpoints, activities};