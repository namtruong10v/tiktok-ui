import { useState, useEffect } from 'react';
import Video from "~/components/Video"

import { collection, getFirestore, getDocs } from "firebase/firestore";



function Home() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const firestore = getFirestore();
        const fechVideo = async () => {
            const q = collection(firestore, "postVideo");
            const data = await getDocs(q);
            setVideos(data.docs.map((doc) => doc))


        }
        fechVideo();
    }, [])
    console.log(videos, 'hahah')
    return (
        <div className="wrapper">

            {
                videos.map((item, index) => (
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
                    />
                ))
            }



        </div>
    )
}

export default Home