import classNames from "classnames/bind";
import styles from './Button.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    children,
    primary = false,
    outline = false,
    size,
    text = false,
    disabled =false,
    rounded =false,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
         
    let Compo = 'button';
    const props = {
        onClick,
        ...passProps
    }
    if (to) {
        props.to = to
        Compo = Link

    } else if (href) {
        props.href = href
        Compo = 'a'
    }
    if (disabled) {
        delete props.onClick
    }

    const classnames = cx('wrapper', {
        [size]:size,
        [className]:className,
        primary,
        outline,
        text,
        disabled,
        rounded,

    })

    return <Compo className={classnames} {...props}>
        {
            leftIcon && <span className={cx('icon')}>{leftIcon}</span>
        }
        <span className={cx('title')}>
            {children}
        </span>
        {
            rightIcon && <span className={cx('icon')}>{rightIcon}</span>
        }

    </Compo>
}


export default Button;