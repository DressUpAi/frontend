import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import { UserProvider } from './Context';
import AxiosSetup from './AxiosSetup';
import Login from './Login';

export default function App(){
  return(
    <>
      <UserProvider>
        <AxiosSetup/>
        <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}
