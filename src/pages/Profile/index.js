import { auth } from '~/firebase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { collection, getFirestore, getDocs } from "firebase/firestore";

import Video from '~/components/Video';

import classNames from 'classnames/bind';
import styles from './AccountID.Module.scss'

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
        }
        fechVideo();

    }, [])



    return (

        <div className={cx('wraaper-account')}>


            <div>Video của user  {user?.account.name_acount} </div>

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

    )
}

export default Profile