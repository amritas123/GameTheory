$(function () {
    $('#container').highcharts({
        title: {
            text: 'Combination chart'
        },
        xAxis: {
            categories: ['Defend', 'Detect', 'Attack', 'Spread', 'Destroy']
        },
        labels: {
            items: [{
                html: 'Strategy Distribution',
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: 'Attacker',
            data: [3, 2, 1, 3, 4]
        }, {
            type: 'column',
            name: 'Defender',
            data: [2, 3, 5, 7, 6]
        }, {
            type: 'spline',
            name: 'Average',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[4],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: 'Attacker',
                y: 13,
                color: Highcharts.getOptions().colors[0] // Jane's color
            }, {
                name: 'Defender',
                y: 23,
                color: Highcharts.getOptions().colors[1] // John's color
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
});