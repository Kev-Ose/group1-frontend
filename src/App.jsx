import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Posts from './pages/Posts/Posts';
import PostDetails from './pages/PostDetails/PostDetails';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import EditPost from './pages/EditPost/EditPost';

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
                { path: 'post/:id/edit', element: <EditPost /> }
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={Router} />
        </>
    );
}

export default App;
