import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import {Wrapper as PopperWrapper} from "~/components/Poper";
import MenuItem from "./MenuItem";

const cx= classNames.bind(styles)

function Menu({dataMenu =[] ,children}) {
    console.log(dataMenu,'hahaha')
    const renderItems = () =>{
        return dataMenu.map((item,index) =>(
            <MenuItem key={index} data={item} />
        ))
    }
    return ( 
        <Tippy
            placement='bottom-end'
            delay={[0,700]}
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
                    <PopperWrapper className={cx('menu-poper')}>
                        {renderItems()}
                    </PopperWrapper>

                </div>
            )} >

        
           {children}
        </Tippy>
     );
}

export default Menu;