/*global $:true document:true jQuery:true Highcharts:true */
(function($) {
    "use strict";
    var chart;

    $(document).ready(function() {
    
        // define the options
        var options = {
            chart: { renderTo: 'container'},
            title: { text: 'breakdowns' },
            xAxis: {
                type: 'datetime',
                tickInterval: 7 * 24 * 3600 * 1000, // one week
                tickWidth: 0,
                gridLineWidth: 1,
                labels: {
                    align: 'left',
                    x: 3,
                    y: -3
                }
            },
            yAxis: [
                { // left y axis
                    title: { text: null },
                    labels: {
                        align: 'left',
                        x: 3,
                        y: 16,
                        formatter: function() {
                            return Highcharts.numberFormat(this.value, 0);
                        }
                    },
                    showFirstLabel: false
                },
                { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: { text: null },
                    labels: {
                        align: 'right',
                        x: -3,
                        y: 16,
                        formatter: function() {
                            return Highcharts.numberFormat(this.value, 0);
                        }
                    },
                    showFirstLabel: false
                }
            ],
            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 20,
                floating: true,
                borderWidth: 0
            },
            tooltip: { shared: true, crosshairs: true },
            plotOptions: {
                series: { cursor: 'pointer', marker: { lineWidth: 1}}
            },
            series: []
        };
        
        jQuery.getJSON('/data/topLevel', function(data) {
            jQuery.each(['Android Version','Application','Application Version'], function(idx, elm) {
                if (!data[elm]) {
                    console.error("No data for " + elm);
                    return;
                }
                options.series[idx] = {
                    name: elm,
                    data: jQuery.map(data[elm].retval, function(elm, idx) {
                        console.log(elm.date);
                        return [new Date(elm.date), elm.count];
                    })
                };
            });
            chart = new Highcharts.Chart(options);
        });
    });
})(jQuery);
