import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { History } from './views/History/History';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ProtectedRoute from './middlewares/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/bg.png'})`
        }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/history/:type" component={History} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
