import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './context/authContext';

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
              
            <Route exact path="/">
              <Signup/>
            </Route>
            
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
