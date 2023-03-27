
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input(props) {
    const { type ,inputType, label , data ,disabled ,placeholder, setData, ...paragraph} = props;
   
    return ( 
        <div className={cx('wrapper')}>
            <label>{label}</label>
            
            {
             
                inputType ? 
                <textarea  {...paragraph} disabled={disabled} value={data} type={type} placeholder={placeholder}  onChange={(e)=>{setData(e.target.value)}}></textarea>
                 :  
            
                    <input {...paragraph} disabled={disabled} value={data} type={type} placeholder={placeholder}  onChange={(e)=>{setData(e.target.value)}}/> 

                
            }
           
        </div>
     );
}

export function Input2(props) {
    const { type ,inputType, label , data ,disabled ,placeholder, setData, ...paragraph} = props;
   
    return ( 
        <div className={cx('wrapper')}>
            <label>{label}</label>
            
            {
             
                inputType ? 
                <textarea  {...paragraph} disabled={disabled} value={data} type={type} placeholder={placeholder}  onChange={(e)=>{setData(e.target.value)}}></textarea>
                 :  
            
                    <input {...paragraph} disabled={disabled} value={data} type={type} placeholder={placeholder}  onChange={(e)=>{setData(e.target.value)}}/> 

                
            }
           
        </div>
     );
}

export default Input;

