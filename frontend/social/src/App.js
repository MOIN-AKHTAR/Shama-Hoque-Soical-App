import {BrowserRouter} from 'react-router-dom';
import MainRoute from './MainRoute';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme'

function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
        <MainRoute/>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
