import {forwardRef , useState} from 'react';
import images from '~/assets/images';


function Image({src ,fallBack : currentFallBack = images.noImage, ...props},ref) {

  
    const[fallBack, setFallBack] = useState('');
    const handleError = () =>{
        setFallBack(currentFallBack)
    }

    return ( 
        <img ref={ref} src={fallBack || src} {...props} onError={handleError}/>
     );
}

export default forwardRef(Image)