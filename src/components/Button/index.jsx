import styles from './Button.module.css'

export function Button({children, type}){
    return(
        <div className={styles.divButton}>
            <button className={styles.button} type={type}>{children}</button>
        </div>
    )
}