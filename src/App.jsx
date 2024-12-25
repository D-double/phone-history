import React from 'react'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Api from './pages/Api'
import Partnership from './pages/Partnership'
import RefferalProgram from './pages/RefferalProgram'
import SmsActive from './pages/SmsActive'
import TemporaryMail from './pages/TemporaryMail'
import Registor from './pages/Registor'
import Login from './pages/Login'
import PhoneHistory from './pages/phoneHistory/PhoneHistory'
import Profile from './pages/profile/Profile'
import TopUpHistory from './pages/TopUpHistory/TopUpHistory'
import { Paths } from './Paths'




const App = () => {
  return (
    <div>
      <Navbar>
      </Navbar>
      <Routes>
        {
          import.meta.env.MODE === 'development' && 
          <>
            <Route path='/' element={<Main/>}/>
            <Route path='/api' element={<Api/>}/>
            <Route path='/popularactivations' element={<Partnership/>}/>
            <Route path='/temporaryMail' element={<RefferalProgram/>}/>
            <Route path='/partnership' element={<SmsActive/>}/>
            <Route path='/referralProgram' element={<TemporaryMail/>}/>
            <Route path='/registration' element={<Registor/>}/>
            <Route path='/login' element={<Login/>}/>
          </>
        }
        <Route path={Paths.phonehistory} element={<PhoneHistory/>}/>
        <Route path={Paths.profile} element={<Profile/>}/>
        <Route path={Paths.topuphistory} element={<TopUpHistory/>}/>
      </Routes>
    </div>
  )
}

export default App
