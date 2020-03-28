import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom'
import './App.css';
import StyledUl from "./models/styled/StyledUl";
import StyledLi from "./models/styled/StyledLi";
import {PATHS, DATASETS_PATHS} from "./utils/constants";
import Country from "./containers/Country";
import Countries from "./containers/Countries";
import {buildRequest, getData} from "./utils/restClient";

const Home = () => <h2>Home</h2>

interface Props {
    isLocal: boolean
}

const App: React.FC<Props> = (props: Props) => {
    const { isLocal } = props

    const [validCountries, setValidCountries] = useState(new Array<string>())
    const [dataPulled, setDataPulled] = useState(true)

    useEffect(() => {
        if (dataPulled) {
            setDataPulled(false)
            getData(buildRequest(DATASETS_PATHS.VALID, isLocal))
                .then((value: string[]) => {
                    setValidCountries(value)
                })
        }
    }, [dataPulled, isLocal, validCountries])

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
              <StyledLi>
                  <Link to={PATHS.COUNTRIES}>Countries</Link>
              </StyledLi>
          </StyledUl>

          <Route path={PATHS.HOME} exact component={Home} />
          <Route path={PATHS.GLOBAL} component={() => <Country isLocal={isLocal} apiUrl={DATASETS_PATHS.GLOBAL} name={'Global'}/>} />
            <Route path={PATHS.COUNTRIES} component={() => <Countries isLocal={isLocal} validCountries={validCountries}/>} />
            <Route path={PATHS.COUNTRY + '/:name' } component={(props: RouteComponentProps) => <Country {...props} isLocal={isLocal} apiUrl={DATASETS_PATHS.COUNTRIES} />} />
        </div>
      </Router>
  );
}

export default App;
