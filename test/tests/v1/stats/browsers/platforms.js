const { expect } = require('chai');
const { makeEndpointSnapshotTests, makeEndpointPaginationTests, makePaginatedEndpointAssertions, setupSnapshots } = require('../../../../utils');

describe('/v1/stats/browsers/platforms', () => {
	before(() => {
		setupSnapshots(__filename);
	});

	makeStatsBrowsersVersionTests();
});

function makeStatsBrowsersVersionTests () {
	makePaginatedEndpointAssertions('/v1/stats/browsers/browser%2019/platforms{?continent,country,period}', {}, [
		{
			params: { period: '2020-04' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.sumBy(response.body, 'prev.share')).to.be.closeTo(100, .1);
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020-04', continent: 'EU' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.sumBy(response.body, 'prev.share')).to.be.closeTo(100, .1);
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020-04', country: 'PL' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.sumBy(response.body, 'prev.share')).to.be.closeTo(100, .1);
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020-02' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.every(response.body, result => result.prev.share === null)).to.be.true;
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020-02', continent: 'EU' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.every(response.body, result => result.prev.share === null)).to.be.true;
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020-02', country: 'PL' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.every(response.body, result => result.prev.share === null)).to.be.true;
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.every(response.body, result => result.prev.share === null)).to.be.true;
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020', continent: 'EU' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.every(response.body, result => result.prev.share === null)).to.be.true;
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2020', country: 'PL' },
			assert: (response) => {
				expect(_.sumBy(response.body, 'share')).to.be.closeTo(100, .1);
				expect(_.every(response.body, result => result.prev.share === null)).to.be.true;
				expect(response.body).to.have.lengthOf(2);
				expect(response).to.matchSnapshot();
			},
		},
		{
			params: { period: '2019' },
			assert: (response) => {
				expect(response.body).to.be.empty;
			},
		},
	]);

	makeEndpointPaginationTests('/v1/stats/browsers/browser%2019/platforms', { period: '2020-04' });

	makeEndpointSnapshotTests('/v1/stats/browsers/browser%2019/platforms{?continent,country,period}', {}, [
		{ continent: 'X' },
		{ country: 'X' },
		{ continent: 'EU', country: 'PL' },
		{ period: 'month' },
	], { status: 400 });
}
