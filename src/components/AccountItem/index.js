import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';
const cx = classNames.bind(styles)


function AccountItem() {
    return <div className={cx('wrapper')}>
            <img className={cx('avatar')} src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/0a2255f3d250ea3862d864d5582f1edc~c5_300x300.webp?x-expires=1676188800&x-signature=tH3Ee6LWoW70Msk6hYNnaUJpAFY%3D' alt="Hoas" />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span> Nguyen van am</span>
                    <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />
                </p>
                <span className={cx('ussername')}>nguyenvana</span>
            </div>
    </div>
}

export default AccountItem;