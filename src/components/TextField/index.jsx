import styles from "./TextField.module.css"

export const TextField = ({htmlFor,type,children,onBlur}) => {
  return (
    <div className={styles.textField}>
      <label htmlFor={htmlFor}>{children}</label>
      <input type={type} id={htmlFor} onBlur={onBlur} autoComplete="off" required/>
    </div>
  );
};

