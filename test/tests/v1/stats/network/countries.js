const { makeEndpointSnapshotTests, setupSnapshots } = require('../../../../utils');

const periodOptions = [ 'day', 'week', 'month', 'year', 'all' ];

describe('/v1/stats/network/countries', () => {
	before(() => {
		setupSnapshots(__filename);
	});

	makeStatsNetworkCountriesTests();
});

function makeStatsNetworkCountriesTests () {
	makeEndpointSnapshotTests('/v1/stats/network/countries{?type,period}', {
		period: 'month',
	}, [
		{
			type: [ 'hits', 'bandwidth' ],
			period: periodOptions,
		},
	]);

	makeEndpointSnapshotTests('/v1/stats/network/countries{?type,period}', {
		period: 'month',
	}, [
		{ type: 'X' },
		{ type: 'hits', period: 'X' },
	], { status: 400 });
}
