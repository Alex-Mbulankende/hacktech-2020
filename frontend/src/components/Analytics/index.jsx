import React from 'react';

import './style.less';

import { Form, Input, Modal } from 'antd';

const Analytics = (props) => {
  return (
    <Modal
      visible={props.ana}
      onOk={props.handleOk}
      onCancel={props.setAna}
    >
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
    </Modal>
  )
}

export default Analytics;
