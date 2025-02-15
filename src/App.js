import './App.css';
import LoginPage from './Components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from './Components/HomePage';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const appRouter = createBrowserRouter([
    {
      children: [
        {
          path: "/",
          element: <LoginPage />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/home",
          element: <HomePage />
        },

      ]
    }
  ]);

  return (
    <div className="App">
      <Provider store={appStore}>  
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
