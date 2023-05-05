import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { collection, getFirestore, getDocs } from "firebase/firestore";

import Video from '~/components/Video';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './AccountID.Module.scss'
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { openNotificationErorr } from '~/components/Notification';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles)


function Profile() {

    const { t } = useTranslation('common');
    let { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState([])

    useEffect(() => {
        const firestore = getFirestore();
        const fechVideo = async () => {
            const q = collection(firestore, "postVideo");
            const data = await getDocs(q);
            setVideos(data.docs.filter((doc) => doc.data().account.id === id));

        }
        const fechUser = async () => {
            const q = collection(firestore, "Users");
            const data = await getDocs(q);
            setUser(data.docs.filter((doc) => doc.data().user.uid === id));
        }
        fechUser();
        fechVideo();
    }, [id])

    console.log(user)



    // handle follow 
    const handleFollow = () => {
        openNotificationErorr('topRight', `${t('notification.failed')}`, `${t('page_live.doingUpdate')}`);
    }

    return (

        <div className={cx('wraaper-account')}>
            <div className={cx('profile_user')}>
                {user?.map((item, index) => (
                    <div key={index} className={cx('infor_user')}>
                        <div className={cx('avatar_user')}>
                            <Image src={item.data().user.photoURL} />
                        </div>

                        <div className={cx('name_infor')}>
                            <p className={cx('name_infor_name_acount')} >{item.data().user.displayName} <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} /></p>
                            <p className={cx('name_infor_nickname')} >{item.data().user.email}</p>
                            <Button onClick={handleFollow} primary className={cx('primary', 'large')}  >
                                {t('page_home_video_component.follow')}
                            </Button>
                        </div>

                    </div>
                ))



                }


            </div>


            <div className={cx('title')}>{t('page_profile_user.list_video')}</div>
            <div className={cx('video-flex-box')}>


                {videos.map((item, index) => (
                    <Video
                        key={index}
                        id={item.id}
                        account={item.data().account}
                        title={item.data().title}
                        music={item.data().music}
                        hastag={item.data().hastag}
                        src_video={item.data().src_video}
                        tick={item.data().tick}
                        hearts={item.data().heart}
                        comments={item.data().comments}
                    />
                ))}
            </div>
        </div>

    )
}

export default Profile