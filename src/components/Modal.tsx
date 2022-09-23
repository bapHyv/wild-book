import { CSSTransition } from "react-transition-group";

import styles from "../css/Modal.module.css";

import {IModal} from "../interfaces/interfaces"

const Modal = ({ children, show, handleCloseModal, handleSubmitModal, handleSubmitModalSkill, wilderName, skillName, skillId }: IModal) => {

  const computedShow = (show: boolean) => (show ? styles.show : "");

  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div
        className={styles.modal + " " + computedShow(show)}
        onClick={(e) => handleCloseModal()}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {/*HEADER*/}
          <div className={styles.modalHeader}>
            <h4 className={styles.modalTitle}>Modal Title</h4>
          </div>

          {/*CONTENT*/}
          <div className={styles.modalBody}>{children}</div>

          {/*FOOTER*/}
          <div className={styles.modalFooter}>
            <button
              onClick={() => handleCloseModal()}
              className={styles.modalCloseBtn}
            >
              Close
            </button>
            {wilderName && handleSubmitModal ? (<button
              onClick={() => handleSubmitModal(wilderName)}
              className={styles.modalValidateBtn}
            >
              Update wilder's skill
            </button>) : skillName && handleSubmitModalSkill ? (<button
              onClick={() => handleSubmitModalSkill(skillName, skillId)}
              className={styles.modalValidateBtn}
            >
              Update skill
            </button>) : null}
            
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
