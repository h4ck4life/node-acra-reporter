/*global $:true document:true jQuery:true Highcharts:true */
(function($) {
    "use strict";
    var charts = {
        'Android Version': {
            chart: { renderTo: 'graph_android_version' },
            title: { text: 'Crash Breakdown by Android Version' }
        },
        'Application Version': {
            chart: { renderTo: 'graph_application_version' },
            title: { text: 'Crash Breakdown by Application Version' }
        }
    };

    $(document).ready(function() {
    
        // define the options
        var options = {
            chart: { renderTo: 'container', type: 'area'},
            title: { text: 'Crash Breakdown by Android Version' },
            xAxis: {
                type: 'datetime',
                tickInterval: 24 * 3600 * 1000, // one day
                tickWidth: 0,
                gridLineWidth: 1,
            },
            yAxis: { title: { text: "Crashes" } },
            tooltip: { shared: true, crosshairs: true },
            plotOptions: {
                series: { cursor: 'pointer', marker: { lineWidth: 1}},
                area: { stacking: 'normal', lineColor: '#666666', lineWidth: 1,  marker: { lineWidth: 1, lineColor: '#666666' }}
            },
            series: []
        };
        
        jQuery.getJSON('/api/topLevel', function(data) {
            jQuery.each(Object.keys(charts), function(idx, elm) {
                var chartOptions = jQuery.extend(true, {}, options, charts[elm]);
                var values = {};
                jQuery(data[elm].retval).each(function(idx, elm) {
                    if (!values[elm.value]) values[elm.value] = [];
                    values[elm.value].push([elm.date, elm.count]);
                });
                jQuery.each(Object.keys(values), function(idx, elm) {
                    chartOptions.series.push({
                        name: elm,
                        data: values[elm]
                    });
                });
                console.log(chartOptions);
                charts[elm].chart = new Highcharts.Chart(chartOptions);
            });
        });
    });
})(jQuery);
