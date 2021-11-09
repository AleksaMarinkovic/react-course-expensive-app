import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import './firebase/firebase';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import './numeral/numeral_setup';
import { startSetExpenses } from './actions/expenses';
import { login, logout} from './actions/auth';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const auth = getAuth();

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
      ReactDOM.render(jsx, document.getElementById('app'));
      hasRendered = true;
    }
};

const jsx = (
    <Provider store = {store}>
     <AppRouter />
    </Provider>
);

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {  
      renderApp();
      if(history.location.pathname === '/') {
        history.push('/dashboard')
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});