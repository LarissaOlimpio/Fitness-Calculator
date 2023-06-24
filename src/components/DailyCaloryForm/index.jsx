import { useState } from "react";
import { TextField } from "../TextField";
import { useApi } from "../../useApi";
import { Button } from "../Button";
import styles from "./DailyCaloryForm.module.css";
import axios from "axios";

export default function DailyCaloryForm() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setAcitivityLevel] = useState("");
  const { clearDatas,token } = useApi();
  const [dataUser, setDatauser] = useState([])
  
 const getDatasUser = async(age, gender, height, weight, activityLevel)  => 
 {
   await axios
      .get("https://fitness-calculator.p.rapidapi.com/dailycalorie", {
        params: {
          age: age,
          gender: gender,
          height: height,
          weight: weight,
          activitylevel: activityLevel,
        },
        headers: {
          "X-RapidAPI-Key": token,
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      })
      .then(response => {
        const data = response.data
        setDatauser(data)
      })
      .catch(error => console.log(error))
    
 }

  const handleSubmit = (event) => {
    event.preventDefault();
    getDatasUser(age, gender, height, weight, activityLevel)
   console.log(dataUser.data)

   
  };

  const handleLogout = () => {
    clearDatas();
    location.reload();

  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        htmlfor="inputAge"
        id="inputAge"
        type="Number"
        onBlur={(event) => setAge(event.target.value)}
      >
        Idade:
        
      </TextField>

      <TextField
        htmlfor="inputWeight"
        id="inputWeight"
        type="Number"
        onBlur={(event) => setWeight(event.target.value)}
      >
        Peso (kg):
      </TextField>

      <TextField
        htmlfor="inputHeight"
        id="inputHeight"
        type="Number"
        onBlur={(event) => setHeight(event.target.value)}
      >
        Altura (cm):
      </TextField>

      <label htmlFor="gender"> Qual seu sexo?</label>
      <select
        name="gender"
        id="gender"
        onChange={(event) => setGender(event.target.value)}
      >
        <option value="">Selecione uma opção</option>
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
      </select>

      <label htmlFor="activityLevel">Qual seu nível de atividade física?</label>
      <select
        name="activityLevel"
        id="activityLevel"
        onChange={(event) => setAcitivityLevel(event.target.value)}
      >
        <option value="">Selecione seu nível de atividade</option>
        <option value="level_1">
          Sedentário, pouco ou nenhuma atividade física
        </option>
        <option value="level_2"> Exercício 1-3 vezes na semana</option>
        <option value="level_3">Exercício 4-5 vezes na semana</option>
        <option value="level_4">
          Exercício todos os dias ou intenso 3-4 vezes na semana
        </option>
        <option value="level_5">Intenso 6-7 vezes na semana </option>
        <option value="level_6">
          Todos os dias e muito intenso ou trabalha com atividade física
        </option>
      </select>

      <Button type="submit">Enviar</Button>

      <div onClick={handleLogout}>
        <Button type="button">Logout</Button>
      </div>
    
      
    </form>
  );
}
