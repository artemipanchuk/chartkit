import type {HighchartsWidgetData} from '../../types';

export function dropTimezone(date: string): string {
    const index = date.indexOf('+');
    return index >= 0 ? date.substring(0, index) + 'Z' : date;
}

const rawData = [
    {
        from: '2022-11-19T00:00:00+03:00',
        to: '2022-11-20T00:00:00+03:00',
        created: 598,
        resolved: 90,
        trend: 508,
    },
    {
        from: '2022-11-20T00:00:00+03:00',
        to: '2022-11-21T00:00:00+03:00',
        created: 1224,
        resolved: 72,
        trend: 1660,
    },
    {
        from: '2022-11-21T00:00:00+03:00',
        to: '2022-11-22T00:00:00+03:00',
        created: 2102,
        resolved: 89,
        trend: 3673,
    },
    {
        from: '2022-11-22T00:00:00+03:00',
        to: '2022-11-23T00:00:00+03:00',
        created: 1672,
        resolved: 1126,
        trend: 4219,
    },
    {
        from: '2022-11-23T00:00:00+03:00',
        to: '2022-11-24T00:00:00+03:00',
        created: 2210,
        resolved: 223,
        trend: 6206,
    },
    {
        from: '2022-11-24T00:00:00+03:00',
        to: '2022-11-25T00:00:00+03:00',
        created: 1743,
        resolved: 98,
        trend: 7851,
    },
    {
        from: '2022-11-25T00:00:00+03:00',
        to: '2022-11-26T00:00:00+03:00',
        created: 1190,
        resolved: 98,
        trend: 8943,
    },
    {
        from: '2022-11-26T00:00:00+03:00',
        to: '2022-11-27T00:00:00+03:00',
        created: 536,
        resolved: 76,
        trend: 9403,
    },
    {
        from: '2022-11-27T00:00:00+03:00',
        to: '2022-11-28T00:00:00+03:00',
        created: 862,
        resolved: 72,
        trend: 10193,
    },
    {
        from: '2022-11-28T00:00:00+03:00',
        to: '2022-11-29T00:00:00+03:00',
        created: 1272,
        resolved: 266,
        trend: 11199,
    },
    {
        from: '2022-11-29T00:00:00+03:00',
        to: '2022-11-30T00:00:00+03:00',
        created: 409,
        resolved: 37,
        trend: 11571,
    },
];

const counts = rawData.map(({created, resolved, trend, from, to}) => ({
    created,
    resolved,
    trend,
    from: Date.parse(dropTimezone(from)),
    to: Date.parse(dropTimezone(to)),
}));

const arearange = counts.map(({created, resolved, from}) => [from, resolved, created]);

const createdLine = counts.map(({created, from}) => [from, created]);

const resolvedLine = counts.map(({resolved, from}) => [from, resolved]);

const trends = counts.map(({trend, from}) => [from, trend]);

export const data: HighchartsWidgetData = {
    data: {
        graphs: [
            {
                type: 'arearange',
                data: arearange,
                color: '#84D1EE',
                yAxis: 0,
                opacity: 0.5,
            },
            {
                type: 'line',
                name: 'Решено',
                color: '#1F68A9',
                data: resolvedLine,
                yAxis: 0,
            },
            {
                type: 'line',
                name: 'Создано',
                color: '#84D1EE',
                data: createdLine,
                yAxis: 0,
            },
            {
                type: 'line',
                color: '#4DA2F1',
                data: trends,
                enableMouseTracking: false,
                yAxis: 1,
            },
        ],
    },
    config: {
        hideHolidays: false,
        normalizeDiv: false,
        normalizeSub: false,
    },
    libraryConfig: {
        chart: {
            animation: false,
        },
        xAxis: {
            type: 'datetime',
            minPadding: 0.05,
            maxPadding: 0.05,
        },
        yAxis: [
            {
                height: '70%',
            },
            {
                height: '20%',
                top: '80%',
            },
        ],
        plotOptions: {
            series: {
                states: {
                    inactive: {
                        opacity: 0.5,
                    },
                },
            },
            arearange: {
                showInLegend: false,
                enableMouseTracking: false,
                lineWidth: 0,
                marker: {
                    enabled: false,
                },
            },
            line: {
                lineWidth: 1,
                marker: {
                    enabled: true,
                    symbol: 'circle',
                },
                states: {
                    hover: {
                        lineWidth: 1,
                        lineWidthPlus: 0,
                    },
                },
            },
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            enabled: false,
        },
    },
};
