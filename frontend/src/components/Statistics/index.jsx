import React, { useState } from 'react';

import './style.less';

import { Progress, Radio } from 'antd';

const Statistics = props => {

  return (
    <div className="circles">
      <Radio.Group onChange={props.onChange}>
        <Radio value={177663}>
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
        <Radio value={257818}>
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
        <Radio value={181381}>
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
        <Radio value={75036}>
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
