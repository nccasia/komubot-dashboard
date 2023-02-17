import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import ChannelPage from './pages/ChannelPage';
import LoginPage from './pages/LoginPage';
import MeetingPage from './pages/MeetingPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserDiscord from './pages/UserDiscord';
import DailyPage from './pages/DailyPage';
import Penalty from './pages/Penalty';
import Message from './pages/MessageChannel';

// ----------------------------------------------------------------------

export default function Router() {
  
  const routes = useRoutes([
    {
      
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'channel', element: < ChannelPage/> },
        { path: 'meeting', element: < MeetingPage/> },
        { path: 'userdiscord', element: <UserDiscord /> },
        { path: 'penalty', element: <Penalty /> },
        { path: 'message', element: <Message /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'daily', element: <DailyPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
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
