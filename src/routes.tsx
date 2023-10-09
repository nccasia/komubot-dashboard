import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import ChannelPage from './pages/ChannelPage';
import LoginPage from './pages/LoginPage';
import MeetingPage from './pages/MeetingPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import UserDiscord from './pages/UserDiscord';
import DailyPage from './pages/DailyPage';
import Penalty from './pages/Penalty';
import Message from './pages/MessageChannel';
import MentionPage from './pages/MentionPage';

export default function Router() {
  const token = localStorage.getItem('token');

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'channel', element: <ChannelPage /> },
        { path: 'meeting', element: <MeetingPage /> },
        { path: 'users', element: <UserDiscord /> },
        { path: 'penalty', element: <Penalty /> },
        { path: 'message', element: <Message /> },
        { path: 'daily', element: <DailyPage /> },
        { path: 'mention', element: <MentionPage /> },
      ],
    },
    {
      path: 'login',
      element:  token ? <Navigate to="/dashboard" />: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}