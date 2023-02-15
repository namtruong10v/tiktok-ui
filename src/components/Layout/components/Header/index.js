import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faEarListen, faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Poper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Poper/Menu';


const MENU_ITEMS = [
    {
        title:'English', 
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        children:{
            title:'Languages',
            data:[
                {
                    code:'en',
                    title:'English',
                    type:'language'
                }, 
                {
                    code:'vi',
                    title:'Tiếng Việt',
                    type:'language'
                }
            ]
        }
    },
    {
        title:'Feedback and help', 
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        to:'/feeback'
    },
    {
        title:'Keyboard shortcuts', 
        icon: <FontAwesomeIcon icon={faKeyboard} />
        
    },

]

const cx = classNames.bind(styles)

function Header() {
    const [resultSearch, setResultSearch] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setResultSearch([])
        }, 0)
    }, [])

    const handleMenuChange = (menuItem) =>{
        switch(menuItem.type){
            case 'language':
            ///
             break;

            default:

        }
    }

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt='Tiktok' />
            </div>
            <Tippy
                visible={resultSearch.length > 0}
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
                <Button primary size=''  >Log in </Button>
                <Menu onChange={handleMenuChange} items={MENU_ITEMS}>
                    <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                </Menu>

            </div>
        </div>
    </header>
}

export default Header;