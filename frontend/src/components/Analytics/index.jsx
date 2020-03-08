import React from 'react';
import Clock from 'react-live-clock';

import './style.less';
import Statistics from '../Statistics';
import { Form, Input, Modal } from 'antd';

const owo =
  'https://charts.mongodb.com/charts-coronavirus-lwlvn/embed/charts?id=6f921f0c-a1ee-4106-839c-412fad3c64e7&autorefresh=3600&theme=dark&attribution=false';

const uwu =
  'https://charts.mongodb.com/charts-coronavirus-lwlvn/embed/charts?id=77ed8e96-69cd-42a0-bcab-66c572c1f747&autorefresh=3600&theme=dark&attribution=false';

const Analytics = props => {
  return (
    <Modal
      width={1700}
      visible={props.ana}
      onOk={props.handleOk}
      onCancel={props.setAna}
    >
      <h1 className="newlist">Analytics Dashboard</h1>
      <div className="row">
        <div className="col">
          <div className="statswrapper">
            <h1 className="headtitle">Item Supply</h1>
            <Statistics />
          </div>
          <div className="statswrapper2">
            {/* <h1 className="headtitle">Item Supply</h1> */}
            <iframe className="graph" src={owo} />
          </div>
        </div>
        <div className="col">
          <div className="statswrapper3">
            <iframe width="975" height="460" className="graph2" src={uwu} />
          </div>
          <div className="statswrapper4">
            <div className="minicard">
              <p>Available Items</p>
              <h1>
                149
              </h1>
            </div>
            <div className="minicard">
              <p>Amount of items sold</p>
              <h1>
                232
              </h1>
            </div>
            <div className="minicard">
              <p>Last Stats Update (GMT)</p>
              <h1>
                <Clock timezone={"GMT"} />
              </h1>
            </div>
            <div className="minicard">
              <p>Last Stats Update (PST)</p>
              <h1>
                <Clock />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Analytics;
