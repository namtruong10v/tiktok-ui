import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../../Acount/Acount.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import { openNotificationSuccess, openNotificationErorr } from '~/components/Notification'
import images from '~/assets/images';
import config from '~/config';
import app from '~/firebase';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, FacebookAuthProvider } from "firebase/auth";
import { Input2 } from '~/components/Input';

const auth = getAuth(app);
const cx = classNames.bind(styles)

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailXT, setEmailXT] = useState()

  const navigate = useNavigate();


  const onFinish = (values) => {

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user, 'user')

        openNotificationSuccess('topRight', 'Đăng nhập thành công', 'Chào mừng bạn quay trở lại !');
        navigate('/')

      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/user-not-found':
            openNotificationErorr('topRight', 'Không tìm thấy email', 'Email có vẻ như sai hoặc chưa đăng ký, vui lòng thử lại !');
            break;
          case 'auth/wrong-password':
            openNotificationErorr('topRight', 'Sai mật khẩu', 'Mật khẩu của bạn chưa đúng, vui lòng thử lại');
            break;
          default:
            openNotificationErorr('topRight', 'Email hoặc mật khẩu không đúng', 'Email hoặc mật khẩu của bạn chưa đúng, vui lòng thử lại');
        }
      });

  };



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // login = google
  const loginGoogleHandel = () => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        openNotificationSuccess('topRight', 'Đăng nhập thành công', 'Chúc mừng bạn đã đăng nhập thành công bằng tài khoản Google !');

        navigate('/')

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  // login = facbook
  const loginFacebookHandel = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {

    sendPasswordResetEmail(auth, emailXT)
      .then(() => {
        openNotificationSuccess('topRight', 'Thành công', 'Mã xác nhận đã gửi vào Email của bạn, Vui lòng kiểm tra!');
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
        marginTop: '100px'
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h2>Login</h2>
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
        <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
      </Form.Item>



      <Form.Item >
        <div style={{ marginBottom: 15 }} className={cx('forgotPass')} >
          <a onClick={showModal}>Forgot password</a>
          <Modal title="Quên mật khẩu " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            <div className={cx('wrapper_modal')}>

              <Input2 data={emailXT} label='Email xác thực' type='text' setData={setEmailXT} />

            </div>

          </Modal>
          <Link to={config.routes.register}>Register now!</Link>

        </div>
        <div style={{ marginBottom: 15 }}>
          <button onClick={loginFacebookHandel} className={cx('button-login-width-social-fb')}>
            <img src={images.facebook} style={{ marginRight: 15 }} />
            <span> Đăng nhập với FaceBook</span>

          </button>
        </div>
        <div style={{ marginBottom: 15 }}>
          <button onClick={loginGoogleHandel} className={cx('button-login-width-social-gg')}>
            <img src={images.google} style={{ marginRight: 15 }} />
            <span> Đăng nhập với Google</span>
          </button>
        </div>






        <Button className={cx('button-sumbit')} type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login;