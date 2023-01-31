import React from 'react';
import '../public/scss/style.scss';
import { TodoListProvider } from './Contexts/TodoList';
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  RouteObject,
} from 'react-router-dom';

import List from './Pages/List';
import Add from './Pages/Add';
import Detail from './Pages/Detail';
import PageHeader from './Components/PageHeader';
import NotFound from './Pages/NotFound';

const Root = () => {
  return (
    <React.Fragment>
      <PageHeader />
      <Outlet />
    </React.Fragment>
  );
};

export const routes: RouteObject[] = [
  { errorElement: <NotFound /> },
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <List /> },
      { path: '/add', element: <Add /> },
      { path: '/detail/:id', element: <Detail /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <React.StrictMode>
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    </React.StrictMode>
  );
};

export default App;
