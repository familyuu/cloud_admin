import React, { memo } from 'react';
import { Card, Icon } from 'antd';

import Pie from '@/locComponents/Charts/Pie';
import GBunit from '@/locComponents/Charts/gbunit';

const colors = (value) => {
  if (value === 'Used') {
    return '#F0F2F5';
  }
  return 'rgba(24, 144, 255, 0.65)';
};
const Capacity = memo(({ capacity, title }) => {
  const total = capacity.reduce((pre, now) => now.y + pre, 0);
  return (
    <Card title={title} bordered={false} headStyle={{ 'font-size': 14, border: 'none' }}>
      {total ? (
        <Pie
          hasLegend
          total={() => <GBunit>{total}</GBunit>}
          data={capacity}
          valueFormat={(value) => <GBunit>{value}</GBunit>}
          colors={colors}
          height={200}
          lineWidth={4}
        />
      ) : (
        <div style={{ fontSize: '16px', textAlign: 'center' }}>
          <Icon
            type="frown-o"
            style={{ position: 'relative', top: '3px', marginRight: '16px', fontSize: '24px' }}
          />
          No data!
        </div>
      )}
    </Card>
  );
});

export default Capacity;
