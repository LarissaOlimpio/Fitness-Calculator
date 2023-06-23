import axios from "axios"
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const apiContext = createContext({})

const API_URL = 'https://fitness-calculator.p.rapidapi.com'

export const ApiProvider = ({children}) =>{
  const [ userIsAuthenticated, setUserIsAuthenticated] = useState(()=>{
    if (document.cookie){
      return true
    }else{
      return false
    }
  })


  const [token, setToken] = useState(() => {
    if (localStorage.getItem('apiKey')) {
      return localStorage.getItem('apiKey');
    }

    return '';
  });
 
  const authenticated = async (apiKey) =>{
    
    let success = true
    await axios.get(`${API_URL}/foodids/tablenames`,{
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
      }
    }).then(response => console.log(response.data))
      .catch((error) =>{
        if(error.response.status === 403 || error.response.status == 401){
          toast.error("Usuário não autorizado")
          success = false
        }
      })
  
      if(success){
        toast.success("Usuário logado com sucesso")
        setToken(apiKey)
        localStorage.setItem('apiKey', apiKey)
        Cookies.set('apikey',apiKey,{expires:7})
      }
    
    setUserIsAuthenticated(success)
      
  }
  const clearDatas = () => {
  
    const cookies = document.cookie.split(";");
  
    cookies.forEach(cookie => {
      const cookieParts = cookie.split("=");
      const name = cookieParts[0].trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    localStorage.removeItem("apiKey")
  
  }

  const recommendedDailyCalories = async (age,gender,height,weight,activityLevel) =>{
     const response= await axios.get(`${API_URL}/dailycalorie`,{
        params: {
          age: age,
          gender: gender,
          height: height,
          weight: weight,
          activitylevel: activityLevel
        },
        headers: {
          'X-RapidAPI-Key': token,
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
      }).then(response => console.log(response))
        .catch((error) => console.log(error))

      
  }
  

  return(
    <apiContext.Provider value={{authenticated,userIsAuthenticated,recommendedDailyCalories,clearDatas}}>
        {children}
    </apiContext.Provider>
  )
}
export const useApi = () =>{
  const context = useContext(apiContext)
  return context
}
