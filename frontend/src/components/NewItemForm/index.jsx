import React from 'react';

import './style.less';

import { Form, Input, Modal, Progress } from 'antd';

const NewItemForm = props => {
  return (
    <Modal visible={true} onOk={props.handleOk} onCancel={props.handleCancel}>
      <h1 className="newlist">List New Item</h1>
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
      <div className="modalform">
        <form onSubmit={props.handleSubmit}>
          <Form.Item>
            <Input
              name="title"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
        </form>
      </div>
    </Modal>
  );
};

export default NewItemForm;
