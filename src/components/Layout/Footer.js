import styles from "./Footer.module.css";
import bramkerLogo from "../../assets/bramker.PNG";
const Footer = () => {


    const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <section className={styles['foot-section']}>
        <p>Kuki Studio</p>
        <p>{`${currentYear} ©`}</p>
      </section>
    </div>
  );
};

export default Footer;
