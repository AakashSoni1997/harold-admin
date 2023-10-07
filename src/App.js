// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { setCurrentUser } from './redux/actions/AuthAction';
import store from './redux/store';
import './app.css'
import './custom.css'

// ----------------------------------------------------------------------

export default function App() {
  if (localStorage.security_auth) {
    const token = JSON.parse(localStorage.security_auth);
    store.dispatch(setCurrentUser(token));
  }
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}



// https://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@github.com/AakashSoni1997/React-admin.git