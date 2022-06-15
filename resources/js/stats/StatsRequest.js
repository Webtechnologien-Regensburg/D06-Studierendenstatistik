class StatsRequest {

	constructor(url) {
		this.url = url;
	}

	async run() {
		let response = await fetch(this.url),
		json = await response.json();
	return json;
	}
	
}

export default StatsRequest;