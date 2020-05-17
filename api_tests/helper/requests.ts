'use strict';

import {logger} from './logger';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

export class BaseRequest {

    async get(url: string, route: string, headers: Object): Promise<any> {
        const result = await handleErrors(chai.request(url)
            .get(route)
            .set(headers));
        await logger.addLogging({endpoint: url + route, method: 'GET', response: result});
        return result;
    }
}

function handleErrors(promise: Promise<Object>) {
    return promise.catch((err) => {
        if (err.response) return err.response;
        throw err;
    });
}

let baseRequest: BaseRequest;
baseRequest = new BaseRequest();
export {baseRequest}