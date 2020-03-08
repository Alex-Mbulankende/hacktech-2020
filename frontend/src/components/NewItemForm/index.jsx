import React from 'react';

import './style.less';

import { Button, Form, Input, Modal, Progress } from 'antd';

const { TextArea } = Input;

const NewItemForm = props => {
  return (
    <Modal visible={props.vis} onOk={props.handleOk} onCancel={props.setVis}>
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
          <h1 className="label">Name of item</h1>
          <Form.Item>
            <Input
              name="title"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <h1 className="label">Drop off location</h1>
          <Form.Item>
            <Input
              name="title"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <h1 className="label">Price (Euros)</h1>
          <Form.Item>
            <Input
              name="title"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <h1 className="label">Picture URL</h1>
          <Form.Item>
            <Input
              name="title"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <h1 className="label">Description</h1>
          <Form.Item>
            <TextArea
              name="title"
              className="input-box"
              value={props.values}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Button className="login-button">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default NewItemForm;
