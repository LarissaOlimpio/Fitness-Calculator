import { useState } from "react";
import styles from "./LoginForm.module.css";
import { TextField } from "../TextField";
import { useApi } from "../../useApi";
import { Button } from "../Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [apiKey, setApikey] = useState("");
  const { authenticated } = useApi();

  const handleBlur = (event) => {
    setApikey(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(apiKey);

    authenticated(apiKey);
  };
  return (
    <section>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <TextField
          htmlFor="inputApiKey"
          id="inputApiKey"
          type="password"
          onBlur={handleBlur}
        >
          Digite Sua Chave Api:
        </TextField>

        <Button type="submit">Enviar</Button>
      </form>
      <h3>
          Se ainda não possui a chave API, fazer cadastro{" "}
          <a href="https://rapidapi.com/malaaddincelik/api/fitness-calculator">
            aqui
          </a>
        </h3>
      <ToastContainer />
    </section>
  );
};
export default LoginForm;
