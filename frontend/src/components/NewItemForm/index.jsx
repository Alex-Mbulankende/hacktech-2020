import React from 'react';

import './style.less';
import Statistics from '../../containers/Statistics';

import { Button, Form, Input, Modal, Progress } from 'antd';

const { TextArea } = Input;

const NewItemForm = props => {
  return (
    <Modal visible={props.vis} onOk={props.handleOk} onCancel={props.setVis}>
      <h1 className="newlist">List New Item</h1>
      <Statistics />
      <div className="modalform">
        <form onSubmit={props.handleSubmit}>
          <div className="row">
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
            <Form.Item>
              <Input
                name="title"
                className="input-box"
                value={props.values}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Form.Item>
          </div>
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
          <h1 className="label">Price (USD)</h1>
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
          <Button className="login-button">Submit</Button>
        </form>
      </div>
    </Modal>
  );
};

export default NewItemForm;
