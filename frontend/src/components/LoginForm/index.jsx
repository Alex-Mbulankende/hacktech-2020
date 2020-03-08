import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, Input, Modal } from 'antd';

import './style.less';

import facebook from '../../assets/facebook-login.svg';
import google from '../../assets/google-login.svg';

const LoginForm = (props) => {
  return (
    <Modal
      className="login-form"
      footer={null}
      visible={true}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <NavLink to="/map">
        <div className="login-button2 facebook-login">
          <img src={facebook}/>
        </div>
      </NavLink>
      <NavLink to="/map">
        <div className="login-button2 google-login">
          <img src={google}/>
        </div>
      </NavLink>
      <hr/> or
      <form onSubmit={props.handleSubmit}>
        <Form.Item>
          <Input
            name="title"
            className="input-box"
            value={props.values}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            placeholder="Email Address"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="title"
            className="input-box"
            value={props.values}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            placeholder="Password"
          />
        </Form.Item>
        <NavLink to="/map">
          <Button className="login-button">
            Log In
          </Button>
        </NavLink>
      </form>
    </Modal>
  )
}

export default LoginForm;
