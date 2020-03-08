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
          percent={90}
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
          percent={90}
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
          percent={90}
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
          percent={90}
        />
        <h1>Medicine</h1>
      </div>
    </div>
  );
};

export default Statistics;
