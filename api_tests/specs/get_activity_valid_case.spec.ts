import {expect} from 'chai';
import {activities} from '../helper/endpoints';
import {activityTypes} from '../data/activity_types';

describe('Get Random Activity', function () {
    let randomActivity: any;
    before(async function () {
        randomActivity = await activities.get();
    });
    it('should be returned correct success 200 status code', async function () {
        expect(randomActivity.status).equal(200, 'Status code should be 200');
    });

    it('should be returned all properties in the response', async function () {
        expect(randomActivity.body).to.have.all.keys(['activity', 'accessibility', 'type', 'participants', 'price', 'link', 'key']);
    });

    it('should be returned existing activity type', async function () {
        expect(activityTypes.findIndex(type => type === randomActivity.body.type) > -1)
            .equal(true, `Type '${randomActivity.body.type}' of activity is wrong`);
    });

    it('should be correct type of accessibility property in the response', async function () {
        expect(randomActivity.body.accessibility).to.be.within(0, 1, 'Accessibility property is not in the range: [0,1]');
    });

    it('should be correct type of participants property in the response', async function () {
        expect(randomActivity.body.participants).to.be.a('number', 'Participants property is not a number, but should be');
    });

    it('should be correct type of price property in the response', async function () {
        expect(randomActivity.body.price).to.be.within(0, 1, 'Price property is not in the range: [0,1]');
    });

    it('should be correct length of key property in the response', async function () {
        expect(randomActivity.body.key.length).equal(7, 'Key property should have 7 length');
    });

    it('should be key property in the response starts at least 1', async function () {
        expect(parseInt(randomActivity.body.key.charAt(0))).to.be.at.least(1);
    });
});