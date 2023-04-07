import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faCheckCircle, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';

const cx = classNames.bind(styles)

function Video({ id, title, account, music, hastag, src_video, tick }) {
    const [heart, setHeart] = useState(0);
    const [active, setActive] = useState(false)

    const handleHeart = () => {
        setActive(!active);
        if (!active) {
            setHeart(heart + 1)
        } else {
            setHeart(heart - 1)
        }
    }

    return (
        <div className={cx('recommend-list-item-container')}>
            <Link to='@hahaha' className={cx('image-acount')}>
                <img src={account.image} />
            </Link>
            <div className={cx('video-recomend-box')}>
                <div className={cx('video-recomend-infor-acount', 'd-flex-aitems-center')}>
                    <div className={cx('infor-box')}>
                        <Link id={account.id} className={cx('d-flex-aitems-center')}>
                            <p className={cx('account_nick_name')}>
                                {account.nick_name} {tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                            </p>
                            <span className={cx('account_name')}>{account.name_acount}</span>
                        </Link>

                        <div className={cx('video-recomend-content')}>
                            {title}
                        </div>
                        {
                            hastag.map((has, index) => (
                                <Link key={index} to={has}>
                                    <strong className={cx('video-recomend-tag')}>{has}</strong>
                                </Link>
                            ))
                        }


                        <div>
                            <Link to=''>
                                <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
                                <strong className={cx('video-recomend-tag')}>Nhạc Nền</strong>
                            </Link>
                        </div>
                    </div>
                    <Button outline size='small'>follow</Button>
                </div>

                <div className={cx('video-box')} style={{ marginTop: 15 }}>
                    <video id={id} title={title} className={cx('video-play')} preload='true' src={src_video} controls playsInline></video>
                    <div className={cx('action-of-video')}>
                        <button onClick={handleHeart} className={cx('btn-action-heart')}>
                            {active ?
                                (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path style={{ fill: 'red' }} d="M12.8197 5.57961L11.999 6.40211L11.1757 5.57886C9.07663 3.4798 5.67337 3.4798 3.5743 5.57886C1.47523 7.67793 1.47523 11.0812 3.5743 13.1803L11.4697 21.0756C11.7626 21.3685 12.2374 21.3685 12.5303 21.0756L20.4318 13.1788C22.5262 11.0728 22.5298 7.67906 20.4303 5.57961C18.3274 3.47672 14.9226 3.47672 12.8197 5.57961Z" fill="#323130" />
                                </svg>) :
                                (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8197 5.57961L11.999 6.40211L11.1757 5.57886C9.07663 3.4798 5.67337 3.4798 3.5743 5.57886C1.47523 7.67793 1.47523 11.0812 3.5743 13.1803L11.4697 21.0756C11.7626 21.3685 12.2374 21.3685 12.5303 21.0756L20.4318 13.1788C22.5262 11.0728 22.5298 7.67906 20.4303 5.57961C18.3274 3.47672 14.9226 3.47672 12.8197 5.57961ZM19.3682 12.1211L12 19.4846L4.63496 12.1196C3.12168 10.6063 3.12168 8.15281 4.63496 6.63952C6.14824 5.12624 8.60176 5.12624 10.115 6.63952L11.4725 7.99697C11.7703 8.29483 12.255 8.28903 12.5457 7.98412L13.8803 6.64027C15.3974 5.12317 17.8526 5.12316 19.3697 6.64027C20.8833 8.15391 20.8807 10.6001 19.3682 12.1211Z" fill="#323130" />
                                </svg>)
                            }
                        </button>
                        <strong>
                            {heart}
                        </strong>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Video;