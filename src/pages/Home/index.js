import { useState, useEffect } from 'react';
import Video from "~/components/Video"

import { collection,getFirestore, getDocs } from "firebase/firestore";



function Home(){

    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        const firestore = getFirestore();
            const fechVideo = async () =>{
                const q = collection(firestore, "postVideo");
                const data = await getDocs(q);
                setVideos(data.docs.map((doc)=> ({...doc.data()})))
                
          
            }
            fechVideo();
    },[])
 
    return (
        <div className="wrapper">

            {
                videos.map((item)=>(
                    <Video 
                    key={item.id} 
                    id={item.id} 
                    account={item.account}
                    title ={item.title}  
                    music={item.music}
                    hastag={item.hastag} 
                    src_video={item.src_video}
                    tick={item.tick}
                    />
                ))
            }

           
            
        </div>
    )
}

export default Home