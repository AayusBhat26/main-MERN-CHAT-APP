import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
function App() {
  return (
    <div className="App">
      {/* Homepage => singup or login */}
      <Routes>
        <Route  path={"/"} element={<HomePage />} />
        <Route  path={"/chats"} element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
