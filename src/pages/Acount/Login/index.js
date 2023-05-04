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
import { addUsertoDB } from '~/firebase';
import { Input2 } from '~/components/Input';
import { useTranslation } from 'react-i18next';

const auth = getAuth(app);
const cx = classNames.bind(styles)

function Login() {
  const { t } = useTranslation('common')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailXT, setEmailXT] = useState()

  const navigate = useNavigate();


  const onFinish = (values) => {

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user, 'user');
        const dataUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        }
        addUsertoDB(dataUser)

        openNotificationSuccess('topRight', `${t('notification.logged_successful')}`, `${t('page_login.welcome_back')}`);
        navigate('/')

      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/user-not-found':
            openNotificationErorr('topRight', `${t('page_login.email_not_found')}`, `${t('page_login.email_not_registered')}`);
            break;
          case 'auth/wrong-password':
            openNotificationErorr('topRight', `${t('page_login.wrong_password')}`, `${t('page_login.your_password_is_not_correcty')}`);
            break;
          default:
            openNotificationErorr('topRight', `${t('page_login.email_or_password_is_incorrect')}`, `${t('page_login.email_or_password_is_incorrect_again')}`);
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

        const dataUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        }
        addUsertoDB(dataUser)

        openNotificationSuccess('topRight', `${t('notification.logged_successful')}`, `${t('page_login.login_with_account_google_success')}`);

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
        openNotificationSuccess('topRight', `${t('notification.succeed')}`, `${t('page_login.verification_code_sent_to_your_email')}`);
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
          <a onClick={showModal}>{t('page_login.forgot_password')}</a>
          <Modal title={t('page_login.forgot_password')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            <div className={cx('wrapper_modal')}>

              <Input2 data={emailXT} label={t('page_login.verification_email')} type='text' setData={setEmailXT} />

            </div>

          </Modal>
          <Link to={config.routes.register}>{t('page_login.register_now')}</Link>

        </div>
        <div style={{ marginBottom: 15 }}>
          <button onClick={loginFacebookHandel} className={cx('button-login-width-social-fb')}>
            <img src={images.facebook} style={{ marginRight: 15 }} />
            <span>{t("page_login.sign_in_with_facebook")}</span>

          </button>
        </div>
        <div style={{ marginBottom: 15 }}>
          <button onClick={loginGoogleHandel} className={cx('button-login-width-social-gg')}>
            <img src={images.google} style={{ marginRight: 15 }} />
            <span>{t('page_login.sign_in_with_google')}</span>
          </button>
        </div>






        <Button className={cx('button-sumbit')} type="primary" htmlType="submit">
          {t('header.login')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login;