import React from 'react';

import { Form, Input, Modal } from 'antd';

const NewItemForm = (props) => {
  return (
    <Modal
      visible={true}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
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

export default NewItemForm;
