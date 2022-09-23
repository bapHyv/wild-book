import axios from "axios";
import React, { useState } from "react";
import { IWilderProps, ISkillProps } from "../interfaces/interfaces";

import styles from "../css/Form.module.css";

interface IForm {
  fetchWilders: () => Promise<void>
}

const Form = ({fetchWilders}: IForm) => {

  const [name, setName] = useState<IWilderProps["name"]>("");
  const [description, setDescription] = useState<IWilderProps["description"]>("");

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    setDescription(e.target.value);
  };

  const handleAddWilder = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/api/wilder", {name, description})
    fetchWilders()
  }

  return (
    <div>
      <form
        className={"card" + " " + styles.formStyle}
        onSubmit={(e) => handleAddWilder(e)}
      >
        <div className={styles.formElement}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            onChange={handleChangeName}
            value={name}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className={styles.formElement}>
          <label className={styles.label} htmlFor="description">
            Description:
          </label>
          <textarea
            onChange={handleChangeDescription}
            value={description}
            name="description"
            id="description"
            rows={10}
          ></textarea>
        </div>
        <input
          className={styles.btnValidateForm + " " + styles.validateColor}
          type="submit"
          value="Add Wilder"
        />
      </form>
    </div>
  );
};

export default Form;
