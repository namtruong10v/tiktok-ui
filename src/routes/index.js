import config from '~/config';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import {HeaderOnly} from '~/layouts'
import Search from '~/pages/Search';


// Publish routes
const publishRoutes =[
    { path:config.routes.home, component: Home },
    { path:config.routes.following, component: Following },
    { path:config.routes.profile, component: Profile },
    { path:config.routes.update, component: Upload, layout: HeaderOnly },
    { path:config.routes.search, component: Search, layout: null }

]

// Private routes
const privatehRoutes =[

]


export {publishRoutes , privatehRoutes}