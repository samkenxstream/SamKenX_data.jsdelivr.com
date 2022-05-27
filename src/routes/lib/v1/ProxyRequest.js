const BaseRequest = require('./BaseRequest');
const ProxyModel = require('../../../models/Proxy');
const dateRange = require('../../utils/dateRange');

class ProxyRequest extends BaseRequest {
	async handleProxyStats () {
		let [ dailyStats, periodStats ] = await Promise.all([
			ProxyModel.getDailyStatsByName(this.params.name, ...this.dateRange),
			ProxyModel.getStatsForPeriod(this.params.name, this.period, this.date),
		]);

		this.ctx.body = {
			hits: {
				...periodStats.hits,
				dates: dateRange.fill(dailyStats.hits, ...this.dateRange),
				prev: periodStats.prev.hits,
			},
			bandwidth: {
				...periodStats.bandwidth,
				dates: dateRange.fill(dailyStats.bandwidth, ...this.dateRange),
				prev: periodStats.prev.bandwidth,
			},
		};

		this.setCacheHeader();
	}
}

module.exports = ProxyRequest;
