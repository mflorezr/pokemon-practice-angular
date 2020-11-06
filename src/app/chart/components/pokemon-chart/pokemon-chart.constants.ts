export const BAR_CHART_OPTIONS = {
  responsive: true,
  title: {
    display: true,
    text: 'Stats',
    fontSize: 17
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        stepSize: 25,
        padding: 5,
      },
      gridLines: {
        display: true,
        drawOnChartArea: false,
        color: 'rgb(0, 0, 0)',
        tickMarkLength: 3
      },
    }],
    xAxes: [{
      ticks: {
        padding: 5
      },
      gridLines: {
        display: true,
        drawOnChartArea: false,
        color: 'rgb(0, 0, 0)',
        offsetGridLines: false,
        tickMarkLength: 5
      },
    }]
  },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
}