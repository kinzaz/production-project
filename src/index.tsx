import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider';
import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary/intex';
import '@/shared/config/i18n/i18n';
import '@/app/styles/index.scss';
import { StoreProvider } from '@/app/providers/StoreProvider';

const root = ReactDom.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
