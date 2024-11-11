import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Loading } from '@/components/Loading';
import AppRoot from './root';
import dayjs from 'dayjs';
import '@/services/i18n';
import '@/api/firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'dayjs/locale/cs';

dayjs.locale('cs');

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <Router>
            <Suspense fallback={<Loading />}>
                <ToastContainer position="top-right" />
                <AppRoot />
            </Suspense>
        </Router>
    );
}
