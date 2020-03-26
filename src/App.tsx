import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import StyledUl from "./models/styled/StyledUl";
import StyledLi from "./models/styled/StyledLi";
import {PATHS} from "./utils/constants";
import Global from "./containers/Global";

const Home = () => <h2>Home</h2>

function App() {
  return (
      <Router>
        <div>
          <StyledUl>
            <StyledLi>
              <Link to={PATHS.HOME}>Home</Link>
            </StyledLi>
            <StyledLi>
              <Link to={PATHS.GLOBAL}>Global</Link>
            </StyledLi>
          </StyledUl>

          <Route path={PATHS.HOME} exact component={Home} />
          <Route path={PATHS.GLOBAL} component={Global}/>
        </div>
      </Router>
  );
}

export default App;
