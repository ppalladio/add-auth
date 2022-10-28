import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthCOntextProvider } from './store/auth-context';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthCOntextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthCOntextProvider>,
);
