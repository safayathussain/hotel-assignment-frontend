import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from 'react-hot-toast';
import CustomNavbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Toaster position='top-center'
      />
      <div className='d-flex-col align-items-center container p-2 p-md-5'>
        <CustomNavbar />

        <RouterProvider router={router}>
        </RouterProvider>
      </div>
    </div>
  );
}

export default App;
