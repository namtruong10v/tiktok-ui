import { useState } from 'react';
import { Button, Form, Input , notification , Modal} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Password from 'antd/es/input/Password';
import styles from '../../Acount/Acount.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import {openNotificationSuccess ,openNotificationErorr} from '~/components/Notification'
import images from '~/assets/images';
import config from '~/config'
import  app  from '~/firebase';
import { getAuth, createUserWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
import { Input2 } from '~/components/Input';
const auth = getAuth(app);



const cx = classNames.bind(styles)

function Register(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailXT, setEmailXT] = useState()
  const navigate = useNavigate();


  const onFinish = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        openNotificationSuccess('topRight','Đăng ký thành công','Chúc mừng bạn đã đăng ký thành công !')
        const user = userCredential.user;
        navigate('/login')
        console.log(user,'user')
        // ...
      })
      .catch((error) => {
        console.log(error,'error');
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        switch ( errorCode ){
          case 'auth/email-already-in-use':
            openNotificationErorr('topRight','Có lỗi', 'Email đã tồn tại !')
            break;
          default:
            openNotificationErorr('topRight','Có lỗi', 'Có lỗi vui lòng thử lại!')
        }
        // ..
      });
      
     
   };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
     };


     const showModal = () => {
      setIsModalOpen(true);
      };

      const handleOk = async() => {

        sendPasswordResetEmail(auth, emailXT)
        .then(() => {
          openNotificationSuccess('topRight','Thành công','Mã xác nhận đã gửi vào Email của bạn, Vui lòng kiểm tra!');
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

          setIsModalOpen(false);
          
      };
      const handleCancel = () => {
          setIsModalOpen(false);
      };

    return (
       
        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            marginTop:'100px'
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
        <h2>Register</h2>
        <Form.Item
          
            name="email"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
          <Input width={'100%'} size="large" placeholder="Email" prefix={<UserOutlined />} />
        </Form.Item>
    
        <Form.Item
         
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />}/>
        </Form.Item>
    
   
    
        <Form.Item >
            <div style={{marginBottom:15}} className={cx('forgotPass')} >
                <a onClick={showModal}>Forgot password</a>
                <Modal title="Quên mật khẩu " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                  <div className={cx('wrapper_modal')}>
                    
                          <Input2 data={emailXT}  label='Email xác thực' type='text' setData={setEmailXT} />
                     
                  </div>

                  </Modal>
                <Link to={config.routes.login}>Login now!</Link>
            </div>
            <div style={{marginBottom:15}}>
                <button className={cx('button-login-width-social-fb')}>
                    <img src={images.facebook} style={{marginRight:15}} />
                    <span> Đăng nhập với FaceBook</span>
                    
              </button>
            </div>
            <div style={{marginBottom:15}}>
                <button  className={cx('button-login-width-social-gg')}>
                    <img src={images.google} style={{marginRight:15}}/>
                    <span> Đăng nhập với Google</span>
              </button>
            </div>
             
             
         
          
            
         
          <Button className={cx('button-sumbit')} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
}

export default Register;