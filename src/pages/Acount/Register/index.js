import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from '../../Acount/Acount.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import { openNotificationSuccess, openNotificationErorr } from '~/components/Notification'
import images from '~/assets/images';
import config from '~/config'
import app from '~/firebase';
import { addUsertoDB } from '~/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, FacebookAuthProvider, updateProfile } from "firebase/auth";
import { Input2 } from '~/components/Input';
import { useTranslation } from 'react-i18next';


const auth = getAuth(app);



const cx = classNames.bind(styles)

function Register() {
  const { t } = useTranslation('common')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailXT, setEmailXT] = useState()
  const navigate = useNavigate();


  const onFinish = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        openNotificationSuccess('topRight', `${t('page_register.sign_up_success')}`, `${'page_register.congratulations_on_your_successful_registration'}`)
        const user = userCredential.user;

        // Update photoURL and displayName for use Registered
        updateProfile(user, {
          displayName: `user-${user.uid}`,
          photoURL: 'https://statics.pancake.vn/web-media/72/ca/04/e2/ad95f064b86d4fdc639e9ff81fe9190b324cdee233d76a89854ede23.png',
        })



        setTimeout(() => {
          window.location.href = '/'
        }, 2000);

        // ...
      })
      .catch((error) => {
        console.log(error, 'error');
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            openNotificationErorr('topRight', `${t('notification.failed')}`, `${t('page_register.email_already_exists')}`)
            break;
          default:
            openNotificationErorr('topRight', `${t('notification.failed')}`, `${t('notification.something_went_wrong')}`)
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
          <Link to={config.routes.login}>{t('page_register.login_now')}</Link>
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
          {t('page_register.register')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Register;