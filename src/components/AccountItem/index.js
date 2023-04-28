
import { Link } from "react-router-dom";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';
import Image from "~/components/Image";

const cx = classNames.bind(styles)


function AccountItem({ data }) {

    return <Link to={`/account/${data.user.uid}`} className={cx('wrapper')}>
        <Image className={cx('avatar')} src={data.user.photoURL} alt={data.user.displayName} />
        <div className={cx('info')}>
            <p className={cx('name')}>
                <span>{data.user.displayName}</span>
                {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}

            </p>
            <span className={cx('ussername')}>{data.user.email}</span>
        </div>
    </Link>
}

export default AccountItem;