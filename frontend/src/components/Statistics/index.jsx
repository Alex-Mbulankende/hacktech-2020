import React from 'react';

import './style.less';

import { Progress } from 'antd';

const Statistics = props => {
  return (
    <div className="circles">
      <div className="item">
        <Progress
          className="circprogress"
          type="circle"
          width={72}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068'
          }}
          percent={props.sanitizers}
        />
        <h1>Sanitizers</h1>
      </div>
      <div className="item">
        <Progress
          className="circprogress"
          type="circle"
          width={72}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068'
          }}
          percent={props.masks}
        />
        <h1>Masks</h1>
      </div>
      <div className="item">
        <Progress
          className="circprogress"
          type="circle"
          width={72}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068'
          }}
          percent={props.camping}
        />
        <h1>Camping</h1>
      </div>
      <div className="item">
        <Progress
          className="circprogress"
          type="circle"
          width={72}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068'
          }}
          percent={props.medicine}
        />
        <h1>Medicine</h1>
      </div>
    </div>
  );
};

export default Statistics;
