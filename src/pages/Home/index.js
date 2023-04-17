import { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './Home.Module.scss'

import Video from "~/components/Video"
import { collection, getFirestore, getDocs } from "firebase/firestore";

import { Mousewheel } from "swiper";

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
    return (
        <div className="wrapper">

            {/* <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}

                modules={[Mousewheel]}
                className="mySwiper"
                style={{ height: '100vh', minHeight: '1000px' }}
            > */}
            {
                videos.map((item, index) => (
                    // <SwiperSlide key={index}>
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

                    // </SwiperSlide>

                ))
            }
            {/* </Swiper> */}




        </div>
    )
}

export default Home