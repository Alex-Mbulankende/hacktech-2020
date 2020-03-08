import React, { useState } from 'react';

import './style.less';

import { Progress, Radio } from 'antd';

const Statistics = props => {

  const [rad, setRad] = useState(1);

  return (
    <div className="circles">
      <Radio.Group>
        <Radio value={1}>
          <div className="item">
            <Progress
              className="circprogress"
              type="circle"
              width={72}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068'
              }}
              percent={props.sanitizers.toFixed(0)}
            />
            <h1>Sanitizers</h1>
          </div>
        </Radio>
        <Radio value={2}>
          <div className="item">
            <Progress
              className="circprogress"
              type="circle"
              width={72}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068'
              }}
              percent={props.masks.toFixed(0)}
            />
            <h1>Masks</h1>
          </div>
        </Radio>
        <Radio value={3}>
          <div className="item">
            <Progress
              className="circprogress"
              type="circle"
              width={72}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068'
              }}
              percent={props.camping.toFixed(0)}
            />
            <h1>Camping</h1>
          </div>
        </Radio>
        <Radio value={4}>
          <div className="item">
            <Progress
              className="circprogress"
              type="circle"
              width={72}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068'
              }}
              percent={props.medicine.toFixed(0)}
            />
            <h1>Medicine</h1>
          </div>
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default Statistics;
