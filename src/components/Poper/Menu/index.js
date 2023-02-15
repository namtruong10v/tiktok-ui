import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import { useState } from "react";

import {Wrapper as PopperWrapper} from "~/components/Poper";
import MenuItem from "./MenuItem";
import Header from "./Header";

const cx= classNames.bind(styles)
const defaultOnchange = ()=>{}

function Menu({items =[] ,children ,onChange = defaultOnchange}) {
    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length -1 ]

    const renderItems = () =>{
        return current.data.map((item,index) =>{
            const isParent = !!item.children
           return   <MenuItem key={index} data={item} onClick={()=>{
               if(isParent){
                setHistory(prev => [...prev,item.children])
               }else{
                onChange(item)
               }
           }} />
        })
    }
    return ( 
        <Tippy
           
            placement='bottom-end'
            delay={[0,700]}
            offset={[12, 8]}
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
                    <PopperWrapper className={cx('menu-poper')}>
                      { history.length > 1 &&   <Header title='Languages' onBack={()=>{
                          setHistory(prev =>prev.slice(0,prev.length-1))
                      }}/>}
                        {renderItems()}
                    </PopperWrapper>

                </div>
            )}
            onHidden ={()=> setHistory(prev => prev.slice(0,1))}
            >

        
           {children}
        </Tippy>
     );
}

export default Menu;