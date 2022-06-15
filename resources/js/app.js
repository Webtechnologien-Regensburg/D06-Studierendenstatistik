import StatsRequest from "./stats/StatsRequest.js";
import ChartView from "./ui/ChartView.js";

let chartView;

function initChartView() {
    chartView = new ChartView(document.querySelector("canvas.chart"));
    document.querySelector("input[name=\"minYear\"]").addEventListener("change", onRangeSelectorChanged);
    document.querySelector("input[name=\"maxYear\"]").addEventListener("change", onRangeSelectorChanged);
}

function onRangeSelectorChanged() {
    let minYear = document.querySelector(".min input").value,
        maxYear = document.querySelector(".max input").value;
    document.querySelector(".min .value").innerHTML = minYear;
    document.querySelector(".max .value").innerHTML = maxYear;
    updateChartView(minYear, maxYear);
}

async function updateChartView(rangeFrom, rangeTo) {
    let statsRequest = new StatsRequest("data/studierendenstatistik.json", rangeFrom, rangeTo),
        data = await statsRequest.run();
    chartView.setData(data);
}

initChartView();
updateChartView();