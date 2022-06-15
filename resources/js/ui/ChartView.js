/* global Chart */

/**
 * Dieses Modul bündelt alle Funktionen und Werte, die für die Darstellung der Statistik via Chart.js 
 * benötigt werden. Die Funktionen werden in Form eines Prototypen exportiert, der an anderen Stellen
 * der Anwendung verwendet werden kann und über dessen Methoden die Darstellung der Daten ausgelöst
 * werden kann.
 */

/** 
 * Alle Werte, die für die Darstellung und das "Styling" des Graphen benötigt werden, werden hier in
 * Konstanten bereitgestellt.
 */
const DEFAULT_CHART_TYPE = "bar",
    DEFAULT_BAR_BACKGROUND_COLOR = "rgba(230, 175, 46, 0.5)",
    DEFAULT_BAR_BORDER_COLOR = "rgb(230, 175, 46)",
    DEFAULT_BAR_BORDER_WIDTH = 2,
    DEFAULT_LABEL_COLOR = "rgb(25, 23, 22)",
    DEFAULT_LABEL_FONT_SIZE = 14,
    DEFAULT_AXES_LABEL_COLOR = "rgb(190, 183, 164)",
    DEFAULT_AXES_LABEL_FONT_SIZE = 20,
    Y_LABEL_STRING = "Anzahl der Studierenden",
    X_LABEL_STRING = "Studienjahr";

// Die Methode erstellt einen leeren Chart.js Graphen in dem Canvas-Element, dessen Kontext übergeben wurde   
function createChartInContext(context) {
    // Die Struktur dieses Objekts wird durch die Chart.js-Bibliothek vorgegeben. Wir ändern nur dort wo 
    // notwendig die Attributswerte, um den Graphen hinsichtlich seiner Gestaltung an unserer Wünsche anzupassen.
    return new Chart(context, {
        type: DEFAULT_CHART_TYPE,
        data: {
            labels: null,
            datasets: [],
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: DEFAULT_LABEL_COLOR,
                        fontSize: DEFAULT_LABEL_FONT_SIZE,
                        fontStyle: "bold",
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        fontColor: DEFAULT_AXES_LABEL_COLOR,
                        fontSize: DEFAULT_AXES_LABEL_FONT_SIZE,
                        labelString: Y_LABEL_STRING,
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: DEFAULT_LABEL_COLOR,
                        fontSize: DEFAULT_LABEL_FONT_SIZE,
                        fontStyle: "bold",
                        stepSize: 1,
                    },
                    scaleLabel: {
                        display: true,
                        fontColor: DEFAULT_AXES_LABEL_COLOR,
                        fontSize: DEFAULT_AXES_LABEL_FONT_SIZE,
                        labelString: X_LABEL_STRING,
                    },
                }],
            },
        },
    });
}

// Diese Methode generiert ein DataSet aus den per AJAX geholten Statistiken, das kompatible mit Chart.js ist
function createDataSetForChart(label, data) {
    let dataset = {
        label: label,
        backgroundColor: DEFAULT_BAR_BACKGROUND_COLOR,
        borderColor: DEFAULT_BAR_BORDER_COLOR,
        borderWidth: DEFAULT_BAR_BORDER_WIDTH,
        data: [],
    };
    for (let i = 0; i < data.length; i++) {
        dataset.data.push(data[i].value);
    }
    return dataset;
}

// Diese Methode erstellt die Labels für die einzelnen Daten auf der x-Achse (hier: Jahre)
function createLabelsForChart(data) {
    let labels = [];
    for (let i = 0; i < data.length; i++) {
        labels.push(data[i].year);
    }
    return labels;
}

/**
 * Prototype, mit dem andere Komponenten die Funktionalität dieses Moduls nutzten können.
 * Jedes Objekt, das auf Basis diesen Prototyp erstellt wird, repräsentiert einen Graphen.
 */
class ChartView {

    // Erstellt das Objekt und bereitet einen leeren Graphen im übergebenen Canvas vor
    constructor(canvas) {
        let context = canvas.getContext("2d");
        this.chart = createChartInContext(context);
    }

    // Stellt die übergebenen Daten (Statistiken über die Studierendenanzahl) im vorbereiteten Graphen dar 
    renderData(data) {
        let dataset = createDataSetForChart(data.label, data.data),
            labels = createLabelsForChart(data.data);
        this.chart.data.datasets.push(dataset);
        this.chart.data.labels = labels;
        this.chart.update();
    }

}

// Export des ChartView-Prototypen für andere Module
export default ChartView;