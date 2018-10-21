import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    hashHistory 
  } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import Home from './scenes/Home';
import Carrer from './scenes/Carrer';
import Nav from './components/Nav';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

var client = new ApolloClient({
    uri: 'http://localhost:52478/GraphQL/'
});

class App extends React.Component {
    render () {
        return ( 
            <ApolloProvider client={client}>
                <Router history={hashHistory}>
                    <div>
                        <Nav />
                        <div styleName="Container">
                            <div styleName="content">
                                <Route exact path="/" component={Home} />
                                <Route path="/kariera" component={Carrer} />
                            </div>
                        </div>
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}
export default CSSModules(App, styles);