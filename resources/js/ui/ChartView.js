/* global Chart */

const BAR_BACKGROUND_COLOR = "#e83f6fff",
    BAR_BORDER_WIDTH = 0,
    GRID_TEXT_COLOR = "#ffffffff",
    LABEL_DATASET = "Studierende",
    LABEL_X_AXIS = "Studienjahr",
    LABEL_Y_AXIS = "Anzahl Studierende";

function createChart(context, stats) {
    return new Chart(context, {
        type: "bar",
        data: {
            labels: createLabelsForChart(stats),
            datasets: createDataSet(stats),
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    title: {
                        text: LABEL_X_AXIS,
                        display: true,
                        color: GRID_TEXT_COLOR,
                    },
                    ticks: {
                        color: GRID_TEXT_COLOR,
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    title: {
                        text: LABEL_Y_AXIS,
                        display: true,
                        color: GRID_TEXT_COLOR,
                    },
                    ticks: {
                        color: GRID_TEXT_COLOR,
                    },
                    grid: {
                        color: GRID_TEXT_COLOR,
                        drawTicks: false,
                    },
                },
            },
        },
    });
}

function createDataSet(stats) {
    let dataset = {
        label: LABEL_DATASET,
        backgroundColor: BAR_BACKGROUND_COLOR,
        borderWidth: BAR_BORDER_WIDTH,
        data: [],
    };
    for (let i = 0; i < stats.data.length; i++) {
        dataset.data.push(stats.data[i].value);
    }
    return [dataset];
}

function createLabelsForChart(stats) {
    let labels = [];
    for (let i = 0; i < stats.data.length; i++) {
        labels.push(stats.data[i].year);
    }
    return labels;
}

class ChartView {

    constructor(canvas) {
        this.context = canvas.getContext("2d");
    }

    setData(stats) {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = createChart(this.context, stats);
    }

}

export default ChartView;