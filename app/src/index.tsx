import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import WalletContextProvider from './contexts/WalletContextProvider';
import { AppContext } from './contexts/AppContext';
import theme from './theme/theme';

const defaultContext = {};

ReactDOM.render(
	<AppContext.Provider value={defaultContext}>
	<ChakraProvider theme={theme}>
		<React.StrictMode>
		<WalletContextProvider>
			<HashRouter>
				<Switch>
					<Route path={`/auth`} component={AuthLayout} />
					<Route path={`/admin`} component={AdminLayout} />
					<Route path={`/rtl`} component={RTLLayout} />
					<Redirect from='/' to='/admin' />
				</Switch>
			</HashRouter>
			</WalletContextProvider>
		</React.StrictMode>
	</ChakraProvider></AppContext.Provider>,

	document.getElementById('root')
);
