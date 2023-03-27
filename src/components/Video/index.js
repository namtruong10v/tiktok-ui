import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faCheckCircle, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from '../Button';

const cx = classNames.bind(styles)

function Video({id, title, account, music, hastag, src_video,tick}) {
    return (
            <div className={cx('recommend-list-item-container')}>
                    <Link to='@hahaha' className={cx('image-acount')}>
                        <img src={ account.image} />
                    </Link>
                    <div className={cx('video-recomend-box')}>
                            <div className={cx('video-recomend-infor-acount','d-flex-aitems-center')}>
                               <div className={cx('infor-box')}>
                                    <Link id={account.id} className={cx('d-flex-aitems-center')}>
                                        <p className={cx('account_nick_name')}>
                                            {account.nick_name} {tick &&  <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                                        </p>
                                        <span className={cx('account_name')}>{account.name_acount}</span>
                                    </Link>
    
                                    <div className={cx('video-recomend-content')}>
                                       {title}
                                    </div>
                                    {
                                        hastag.map((has,index)=>(
                                            <Link key={index} to={has}>
                                                <strong className={cx('video-recomend-tag')}>{has}</strong>
                                            </Link>
                                        ))
                                    }
                                   
                                    
                                    <div>
                                        <Link to=''>
                                            <FontAwesomeIcon className={cx('icon-music')} icon={faMusic}/>
                                            <strong className={cx('video-recomend-tag')}>Nhạc Nền</strong>
                                        </Link>
                                        </div>
                               </div>
                                <Button outline size='small'>follow</Button> 
                            </div>

                            <div style={{marginTop:15}}>
                                <video id={id} title={title} className={cx('video-play')} preload='true'  src={src_video} controls  playsInline></video>
                            </div>
                           
                    </div>
            </div>
    );
}

export default Video;