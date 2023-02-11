import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Poper';
import AccountItem from '~/components/AccountItem';




const cx = classNames.bind(styles)

function Header() {
    const [resultSearch, setResultSearch] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setResultSearch([])
        }, 0)
    }, [])

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt='Tiktok' />
            </div>
            <Tippy
               visible={resultSearch.length >0}
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex='-1' {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accout</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>

                    </div>
                )} >

                <div className={cx('search')}>
                    <input placeholder='Search accout and videos ' />
                    <button className={cx('clear-search')}>

                        <FontAwesomeIcon icon={faCircleXmark} />

                    </button>

                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />



                    <button className={cx('search-btn')}>

                        <FontAwesomeIcon icon={faMagnifyingGlass} />

                    </button>

                </div>
            </Tippy>
            <div className={cx('actions')}>
                    <Button text >Upload</Button>
                    <Button primary  >Log in </Button>
            </div>
        </div>
    </header>
}

export default Header;