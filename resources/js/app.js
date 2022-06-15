// Expliziter Import des StatsRequest-Funktion aus der Modul-Datei
import StatsRequest from "./stats/StatsRequest.js";
// Impliziter Import des Default-Export (ChartView-Prototypen) aus der Modul-Datei
import ChartView from "./ui/ChartView.js";

// Einstiegspunkt in die Anwendung: Diese Funktion wird beim Laden der Website aufgerufen (siehe letzte Zeile dieser Datei)
async function initChartView() {
    let statsRequest = new StatsRequest("data/studierendenstatistik.json"), // Erstellen des StatsRequests
        canvasEl = document.querySelector("canvas.chart"), // Selektion des Canvas-Elements aus dem DOM
        chart = new ChartView(canvasEl), // Erstellen des neuen ChartViews
        data = await statsRequest.run(); // Anfordern der Studierendenstatistik
    chart.renderData(data);

}

initChartView();