import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Posts from './pages/Posts/Posts';
import PostDetails from './pages/PostDetails/PostDetails';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import UserProfile from './pages/Userprofile/Userprofile';
import Dashboard from './pages/Dashboard/Dashboard';
import Favorites from './pages/Favorites/Favorites';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import AuthContextProvider from './context/AuthContext';

import './App.css';

function App() {
    const Router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Home /> },
                { path: 'posts', element: <Posts /> },
                { path: 'post/:id', element: <PostDetails /> },
                { path: 'register', element: <Register /> },
                { path: 'login', element: <Login /> },
                { path: 'create', element: <CreatePost /> },
                { path: 'profile/:id', element: <UserProfile /> },
                { path: 'myposts/:id', element: <Dashboard /> },
                { path: 'myfavorites/:id', element: <Favorites /> },
                { path: 'about', element: <About /> },
                { path: 'contact', element: <Contact /> }
            ]
        }
    ]);

    return (
        <>
            <AuthContextProvider>
                <RouterProvider router={Router} />
            </AuthContextProvider>
        </>
    );
}

export default App;
