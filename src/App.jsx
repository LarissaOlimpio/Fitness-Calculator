import "./App.css";
import DailyCaloryForm from "./components/DailyCaloryForm";
import LoginForm from "./components/LoginForm";
import { useApi } from "./useApi";



function App() {
  const {userIsAuthenticated} = useApi()

  console.log(userIsAuthenticated)
 
  return (
    <>
      <div>
      
        {userIsAuthenticated ? <DailyCaloryForm/> :<LoginForm/>}

      </div>
    </>
  );
}

export default App;
