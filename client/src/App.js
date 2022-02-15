import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import Header from './components/Header'
import Login from './pages/Login';
import Home from './pages/Home'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AddGame from './pages/AddGame'
import SingleGame from './pages/SingleGame';

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const useStyles = makeStyles({
  background: {
    height: '100vh',
    backgroundColor: "#af8c9d",
    backgroundImage: "linear-gradient(315deg, #af8c9d 0%, #8cacac 74%)"
  }
})

function App() {
  const classes = useStyles()
  return (
    <ApolloProvider client={client}>
      <div className={classes.background}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addGame" component={AddGame} />
            <Route exact path="/singleGame" component={SingleGame} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
