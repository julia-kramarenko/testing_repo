'use strict';

import * as fs from 'fs';

const tmp = './tmp';
const dir = tmp + '/';

export const logger = {
    async addLogging({endpoint, method, parameters, response}
                         : { endpoint: string, method: string, parameters?: Object, response?: any }) {
        const content = JSON.stringify({
            endpoint,
            method,
            parameters,
            response: {status: await response.status, body: await response.body, text: await response.text}
        });
        return addLog(content);
    }
};

function addLog(content: any, testName?: string) {
    if (!fs.existsSync(tmp)) {
        fs.mkdirSync(tmp);
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.appendFile(dir + `test_logs.json`, content, 'utf8', (err) => {
        if (err) throw err;
    });
}