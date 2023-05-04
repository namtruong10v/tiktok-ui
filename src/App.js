import { Fragment, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publishRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import ScrollToTop from './components/ScrollToTop';



function App() {
  const appcurrent = useRef();


  return (

    <Router>
      <ScrollToTop />
      <div id="App_dnt_reacjs" className="App">
        <Routes>
          {publishRoutes.map((route, index) => {

            const Page = route.component;
            let Layout = DefaultLayout

            if (route.layout) {
              Layout = route.layout

            } else if (route.layout === null) {
              Layout = Fragment

            }

            return (
              <Route
                key={index}
                path={route.path}
                element=
                {
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          }
          )}
        </Routes>
      </div>
    </Router>

  );
}

export default App;
