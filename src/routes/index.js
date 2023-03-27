import config from '~/config';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import {HeaderOnly} from '~/layouts'
import Search from '~/pages/Search';
import Login from '~/pages/Acount/Login';
import Register from '~/pages/Acount/Register';
import Profile from '~/pages/Acount/Profile';
import Admin from '~/pages/Admin';


// Publish routes
const publishRoutes =[
    { path:config.routes.home, component: Home },
    { path:config.routes.following, component: Following },
    { path:config.routes.profile, component: Profile },
    { path:config.routes.upload, component: Upload },
    { path:config.routes.search, component: Search, layout: null },
    { path:config.routes.login, component: Login},
    { path:config.routes.register, component: Register},
    { path:config.routes.admin, component: Admin, layout:null},
    
    

]

// Private routes
const privatehRoutes =[

]


export {publishRoutes , privatehRoutes}