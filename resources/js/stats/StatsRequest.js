const DEFAULT_RANGE_FROM = 2000,
	DEFAULT_RANGE_TO = 2022;

class StatsRequest {

	constructor(url, rangeFrom = DEFAULT_RANGE_FROM, rangeTo = DEFAULT_RANGE_TO) {
		this.url = url;
		this.rangeFrom = rangeFrom;
		this.rangeTo = rangeTo;
	}

	async run() {
		let response = await fetch(this.url),
			json = await response.json();
		json.data = json.data.filter((value) => value.year >= this.rangeFrom && value.year <= this.rangeTo);
		return json;
	}

}

export default StatsRequest;