const { makeEndpointSnapshotTests, setupSnapshots } = require('../../../../utils');

const periodOptions = [ 'day', 'week', 'month', 'year', 'all', undefined ];

describe('/v1/stats/proxies/proxy', () => {
	before(() => {
		setupSnapshots(__filename);
	});

	makeProxyStatsTests();
});

function makeProxyStatsTests () {
	let defaults = {
		period: 'month',
	};

	makeEndpointSnapshotTests('/v1/stats/proxies/{name}{?period}', defaults, [
		{ name: 'wp-plugins', period: periodOptions },
	]);
}