// import logo from './logo.svg';

import { Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import Homepage from "./Pages/Homepage";

import './App.css';
function App() {
  return (
    <div className="App">
      {/* hi, this is app.
       */}
      <Route path="/" exact component={Homepage} />
      <Route path="/chats" exact component={ChatPage} />
    </div>
    // <ChakraProvider></ChakraProvider>
  );
}

export default App;
