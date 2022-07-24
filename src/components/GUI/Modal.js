import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
// import ButtonModal from "./ButtonModal";
import Button from "./Button";

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHide={props.onHide} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          children={props.children}
          isError={props.isError}
          onHide={props.onHide}
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          id={props.id}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onHide} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        {props.isError && <div className="error">{props.isError}</div>}
        <p>{props.message}</p>
        {props.children}
      </div>
      <footer className={styles.actions}>
        <Button
          onClick={(e) => props.onConfirm(e.target.value)}
          id={props.id}
          value={props.id}
          className='modal-btn'
        >
          Okay
        </Button>
        <Button onClick={props.onHide} className='modal-btn-cancel'>Cancel</Button>
      </footer>
    </div>
  );
};

export default Modal;
