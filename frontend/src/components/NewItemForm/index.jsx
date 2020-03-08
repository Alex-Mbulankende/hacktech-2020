import React from 'react';

import './style.less';
import Statistics from '../../containers/Statistics';

import { Button, Form, Input, Modal, Progress } from 'antd';

const { TextArea } = Input;

const NewItemForm = props => {
  const onStats = (e) => {
    console.log(e.target.value);
    props.setFieldValue('category', e.target.value);
  }

  return (
    <Modal visible={props.vis} onOk={props.handleOk} onCancel={props.setVis}>
      <h1 className="newlist">List New Item</h1>
      <Statistics onChange={onStats}/>
      <div className="modalform">
        <form onSubmit={props.handleSubmit}>
          <h1 className="label">Name of item</h1>
          <Form.Item>
            <Input
              name="title"
              className="input-box"
              value={props.values.title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <h1 className="label">Drop off location</h1>
          <Form.Item>
            <Input
              name="location"
              className="input-box"
              value={props.values.location}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <h1 className="label">Price (USD)</h1>
          <Form.Item>
            <Input
              name="price"
              className="input-box"
              value={props.values.price}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <a href="imgur.com/"><h1 className="label">Picture URL</h1></a>
          <Form.Item>
            <Input
              name="picture_url"
              className="input-box"
              value={props.values.picture_url}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <h1 className="label">Description</h1>
          <Form.Item>
            <TextArea
              name="description"
              className="input-box"
              value={props.values.description}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">Submit</Button>
        </form>
      </div>
    </Modal>
  );
};

export default NewItemForm;
