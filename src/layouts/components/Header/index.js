
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import app from '~/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Poper/Menu';
import { MesengerIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '~/components/Search';
import config from '~/config';


import { useTranslation } from "react-i18next";



const cx = classNames.bind(styles)

const auth = getAuth(app);



function Header() {

    const { t } = useTranslation('common');


    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(true)

            } else {
                setIsLogin(false)
            }
        });

    }, [auth.currentUser])









    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':

                ///
                break;

            default:

        }

    }

    const MENU_ITEMS = [
        {
            title: `${t('header.language')}`,
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            children: {
                title: `${t('header.language')}`,
                data: [
                    {
                        code: 'en',
                        title: 'English',
                        type: 'language'
                    },

                    {
                        code: 'vn',
                        title: 'Tiếng Việt',
                        type: 'language'
                    },


                ]
            }
        },
    ]

    const userMenu = [
        {
            title: `${t('header.viewProfile')}`,
            icon: <FontAwesomeIcon icon={faUser} />,
            to: '/profile'
        },
        ...MENU_ITEMS,
        {
            title: `${t('header.logout')}`,
            icon: <FontAwesomeIcon icon={faSignOut} />,

            separate: true
        },
    ]





    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('logo')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt='Tiktok' />
                </Link>
            </div>


            <Search />


            <div className={cx('actions')}>
                {
                    isLogin ?
                        <>
                            <Tippy
                                delay={[0, 300]}
                                content='Upload video'
                                placement='bottom'
                            >
                                <Link to='/upload'>
                                    <button className={cx('action-btn', 'action-outline')}>
                                        <UploadIcon />
                                        {t('header.upload')}
                                    </button>
                                </Link>
                            </Tippy>

                            <Tippy
                                delay={[0, 300]}
                                content='Messenger'
                                placement='bottom'
                            >
                                <button className={cx('action-btn')}>
                                    <MesengerIcon />
                                </button>
                            </Tippy>
                        </>
                        :
                        <>
                            <Button text to='/login'  > {t('header.upload')}</Button>

                            <button onClick={() => { navigate('/login') }} className={cx('primary', 'large')}  >
                                {t('header.login')}
                            </button>


                        </>

                }
                <Menu onChange={handleMenuChange} items={isLogin ? userMenu : MENU_ITEMS}>

                    {isLogin ?
                        (
                            <Image
                                src={auth.currentUser.photoURL ? auth.currentUser.photoURL : images.noImage}
                                className={cx('user-avatar')}
                                alt=''
                            // fallBack='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
                            />
                        )
                        :
                        (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}

                </Menu>

            </div>

        </div>
    </header>
}

export default Header;