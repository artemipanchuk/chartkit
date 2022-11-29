import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Button} from '@gravity-ui/uikit';
import {settings} from '../../../libs';
import {HighchartsPlugin} from '../..';
import {ChartKit} from '../../../components/ChartKit';
import {data, data2} from './mocks/complex2';

export default {
    title: 'Plugins/Highcharts/Complex2',
    component: ChartKit,
} as Meta;

const Template: Story<any> = () => {
    const [shown, setShown] = React.useState(false);

    if (!shown) {
        settings.set({plugins: [HighchartsPlugin]});
        return <Button onClick={() => setShown(true)}>Show chart</Button>;
    }

    return (
        <>
            <div style={{height: 300, width: '100%'}}>
                <ChartKit id="1" type="highcharts" data={data} />
            </div>
            <div style={{height: 100, width: '100%'}}>
                <ChartKit id="2" type="highcharts" data={data2} />
            </div>
        </>
    );
};

export const Complex2 = Template.bind({});
