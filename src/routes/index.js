import configRoutes from '~/config/routes';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import {HeaderOnly} from '~/components/Layout'
import Search from '~/pages/Search';


// Publish routes
const publishRoutes =[
    { path:configRoutes.home, component: Home },
    { path:configRoutes.following, component: Following },
    { path:configRoutes.profile, component: Profile },
    { path:configRoutes.update, component: Upload, layout: HeaderOnly },
    { path:configRoutes.search, component: Search, layout: null }

]

// Private routes
const privatehRoutes =[

]


export {publishRoutes , privatehRoutes}