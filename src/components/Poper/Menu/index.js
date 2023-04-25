import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Wrapper as PopperWrapper } from "~/components/Poper";
import MenuItem from "./MenuItem";
import Header from "./Header";
import app from '~/firebase';
import { getAuth, signOut } from "firebase/auth";
import { openNotificationSuccess } from '~/components/Notification'

const auth = getAuth(app);



const cx = classNames.bind(styles)
const defaultOnchange = () => { }

function Menu({ items = [], children, hideOnClick = false, onChange = defaultOnchange }) {
    const navigate = useNavigate();

    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length - 1];

    useEffect(() => {
        setHistory([{ data: items }])

    }, [items])

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory(prev => [...prev, item.children])
                } else {
                    if (item.title == 'Log out') {
                        signOut(auth)
                            .then(() => {
                                openNotificationSuccess('topRight', 'Thành công', 'Đăng xuất thành công');
                                window.location.href = '/'

                            })
                            .catch((error) => {
                                console.log(error, 'error')
                                // An error happened.
                            });
                    }
                }
            }} />
        })
    }
    return (
        <Tippy
            placement='bottom-end'
            delay={[0, 700]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
                    <PopperWrapper className={cx('menu-poper')}>
                        {history.length > 1 && <Header title='Languages' onBack={() => {
                            setHistory(prev => prev.slice(0, prev.length - 1))
                        }} />}
                        <div className={cx('wrapper-menu-item')}>
                            {
                                renderItems()
                            }
                        </div>

                    </PopperWrapper>

                </div>
            )}
            onHidden={() => setHistory(prev => prev.slice(0, 1))}
        >


            {children}
        </Tippy>
    );
}

export default Menu;