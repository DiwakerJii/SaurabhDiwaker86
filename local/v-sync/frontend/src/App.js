// import './App.css';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import {
  Home,
} from './components/index'
import GameType from './components/GameType';
import Login from './components/Login';
import Testing from './components/Testing';
import ClickPic from './components/ClickPic';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';
import InstantUserInfo from './components/InstantUserInfo';
import FinalResult from './components/FinalResult';
import FinalResultInstant from './components/FinalResultInstant'
import Error from './components/Error';
import Loader from './components/Loader';
import Payment from './components/dashboard/Payment';
import PaymentRedirection from './components/dashboard/PaymentRedirection';
import SpectrogramDetails from './components/dashboard/SpectrogramDetails';
// import useAuth from '../hooks/useAuth'

function App() {
  const ref = useRef(null)
  const [selfieComponent, setSelfieComponent] = useState(null)
  const [questionComponent, setQuestionComponent] = useState(null)
  const [audioComponent, setAudioComponent] = useState(null)
  const [resultComponent, setResultComponent] = useState(null)

  const [loginIsVisible, toggleVisibilityLogin] = useState(false)
  const [logoutIsVisible, toggleVisibilityLogout] = useState(false)
  const [imgSrc, setImgSrc] = useState('');
  const [roomId, setRoomId] = useState('')

  // useEffect(() => {
  //   if (auth?.accessToken) {

  //   }
  // }, [])


  return (

    <Routes>
      <Route path='/' exact element={<Home refer={ref} loginIsVisible={loginIsVisible} toggleVisibilityLogin={toggleVisibilityLogin} logoutIsVisible={logoutIsVisible} toggleVisibilityLogout={toggleVisibilityLogout} />} />

      <Route path='/test' exact element={<Testing imgSrc={imgSrc} setImgSrc={setImgSrc} />} />
      <Route path='/spectrogram' exact element={<SpectrogramDetails />} />
      {/* there must be authentication for going this forward */}
      {/* requireauth */}
      <Route element={<RequireAuth />}>
        <Route path='/:cat/gametype' exact element={<GameType setRoomId={setRoomId} logoutIsVisible={logoutIsVisible} toggleVisibilityLogout={toggleVisibilityLogout} />} />

        <Route path='/:cat/instant/info' exact element={<InstantUserInfo logoutIsVisible={logoutIsVisible} toggleVisibilityLogout={toggleVisibilityLogout} />} />

        <Route path='/:cat/:type/selfie' exact element={<ClickPic imgSrc={imgSrc} setImgSrc={setImgSrc} roomId={roomId} logoutIsVisible={logoutIsVisible} toggleVisibilityLogout={toggleVisibilityLogout} />} />

        <Route path='/:cat/:type/dashboard' exact element={<Dashboard imgSrc={imgSrc} roomId={roomId} selfieComponent={selfieComponent} setSelfieComponent={setSelfieComponent} questionComponent={questionComponent} setQuestionComponent={setQuestionComponent} audioComponent={audioComponent} setAudioComponent={setAudioComponent} resultComponent={resultComponent} setResultComponent={setResultComponent} />} />
        <Route path='/:cat/:type/payment' exact element={<Payment />} />
      </Route>

      <Route path='/:cat/:type/paymentRedirect/:status/:roomId' exact element={<PaymentRedirection />} />
      <Route path='/:cat/notInstant/result' exact element={<FinalResult />} />
      <Route path='/:cat/:type/loading' exact element={<Loader />} />
      <Route path='/:cat/instant/result' exact element={<FinalResultInstant imgSrc={imgSrc} />} />
      <Route path='*' element={<Error />} />
      {/* <Route path='/health' element={<HealthQuestions />} /> */}
    </Routes>



  );
}

export default App;
