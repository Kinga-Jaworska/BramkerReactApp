import { useContext } from "react";
import ProfileForm from "./ProfileForm";
import styles from "./UserProfile.module.css";
import CartContext from "../../context/cart-context";

const UserProfile = () => {
  const cartCtx = useContext(CartContext);

  return (
    <section className={styles.profile}>
      <h1>Profil </h1>
      <h3>{`Twój rabat: ${cartCtx.getDiscount()}%`}</h3>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
