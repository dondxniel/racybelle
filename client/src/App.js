import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

// Pages components
import Home from './components/pages/Home';
import Portfolio from './components/pages/Portfolio';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import BookAppointment from './components/pages/BookAppointment';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';

// Navigation bar and footer that will be the same accross all the pages.
import NavigationBar from './components/presentational/NavigationBar';
import Footer from './components/presentational/Footer';

// actions
import { setLoggedIn, logout } from './store/actions';

function App() {
  
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(state => state.userLoggedIn)
  
  const [ cookies ] = useCookies(['userToken'])
  
  if(cookies['userToken']){
    dispatch(setLoggedIn());
  }else{
    dispatch(logout());
  }

  return (
    <>

      <Router>
        <NavigationBar />
        <Switch>

          <Route path="/" strict exact>
            <Home />
          </Route>
          <Route path="/portfolio" strict exact>
            <Portfolio />
          </Route>
          <Route path="/about" strict exact>
            <About />
          </Route>
          <Route path="/contact" strict exact>
            <Contact />
          </Route>
          <Route path="/book-appointment" strict exact>
            {!userLoggedIn ? <BookAppointment /> : <Redirect to = "/" /> }
          </Route>
          <Route path="/dashboard" strict exact>
            {/* {userLoggedIn ? <Dashboard /> : <Redirect to = "/" />} */}
            <Dashboard />
          </Route>
          <Route path="*" strict exact>
            <NotFound />
          </Route>

        </Switch>
        <Footer />

      </Router>
    </>
  );
}

export default App;
