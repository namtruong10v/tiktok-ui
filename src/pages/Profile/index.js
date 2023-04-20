import { auth } from '~/firebase';
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

const cx = classNames.bind(styles)


function Profile() {


    let { id } = useParams();


    console.log(auth, 'auth')
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState()

    useEffect(() => {
        const firestore = getFirestore();
        const fechVideo = async () => {
            const q = collection(firestore, "postVideo");
            const data = await getDocs(q);
            setVideos(data.docs.filter((doc) => doc.data().account.id === id));
            setUser(data.docs.find((doc) => doc.data().account.id === id))
        }
        fechVideo();
    }, [])


    return (

        <div className={cx('wraaper-account')}>
            <div className={cx('profile_user')}>
                {user &&
                    <div className={cx('infor_user')}>
                        <div className={cx('avatar_user')}>
                            <Image src={user.data().account.image} />
                        </div>

                        <div className={cx('name_infor')}>
                            <p className={cx('name_infor_name_acount')} >{user.data().account.name_acount} {user.data().tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}</p>
                            <p className={cx('name_infor_nickname')} >{user.data().account.nick_name}</p>
                            <Button primary className={cx('primary', 'large')}  >
                                Follow
                            </Button>
                        </div>

                    </div>}
            </div>


            <div className={cx('title')}>DANH SÁCH VIDEO</div>
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