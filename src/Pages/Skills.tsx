import { useState, useEffect } from "react";

import axios from "axios";
import { ISkillProps, ISkill, id } from "../interfaces/interfaces";

import Modal from "../components/Modal";

import styles from "../css/Skills.module.css";

const Skills = () => {
  const [skills, setSkills] = useState<ISkillProps[]>([]);
  const [modifiedSkills, setModifiedSkills] = useState<ISkillProps[]>([]);
  const [addedSkills, setAddedSkills] = useState<ISkillProps[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [skillNameClicked, setSkillNameClicked] =
    useState<ISkillProps["name"]>("");
  const [skillIdClicked, setSkillIdClicked] = useState<ISkillProps["id"]>(0);
  const [addSkillName, setAddSkillName] = useState<ISkillProps["name"]>("");

  const fetchSkills = async () => {
    const skillsData = await axios.get("http://localhost:5000/api/skill");
    setSkills(skillsData.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDeleteSkill = async (name: ISkillProps["name"]) => {
    if (name !== undefined) {
      await axios.delete("http://localhost:5000/api/skill", { data: { name } });
      fetchSkills();
    } else {
      alert("You need an id to delete the skill !!");
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  // CLOSE THE ADD SKILL MODAL
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitModal = async (
    skillName: ISkillProps["name"],
    skillId: ISkillProps["id"]
  ): Promise<void> => {
    await axios.put("http://localhost:5000/api/skill", {
      name: skillName,
      id: skillId,
    });
    handleCloseModal();
    fetchSkills();
  };

  const handleClickSkill = (
    skillName: ISkillProps["name"],
    skillId: ISkillProps["id"]
  ) => {
    setSkillNameClicked(skillName);
    setSkillIdClicked(skillId);
    handleShowModal();
  };

  const handleAddSkill = async (
    event: React.SyntheticEvent,
    skillName: ISkillProps["name"]
  ) => {
    event.preventDefault();
    await axios.post("http://localhost:5000/api/skill", { name: skillName });
    fetchSkills();
    setAddSkillName("");
  };

  return (
    <div>
      <Modal
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmitModalSkill={handleSubmitModal}
        skillName={skillNameClicked}
        skillId={skillIdClicked !== undefined ? skillIdClicked : 0}
      >
        <input
          type="text"
          onChange={(e) => setSkillNameClicked(e.target.value)}
          value={skillNameClicked}
          name={skillNameClicked}
          id={skillNameClicked}
        />
      </Modal>
      <h2>Skills</h2>
      <ul className={styles.ulSkills}>
        {skills.map((e) => (
          <div
            className={styles.skillAndBtnContainer}
            key={e.id?.toString() + Math.random().toString()}
          >
            <li
              onClick={() => handleClickSkill(e.name, e.id)}
              className={styles.skillStyle}
            >
              {e.name}
            </li>
            <button
              onClick={() => handleDeleteSkill(e.name)}
              className={styles.btnDeleteSkill}
            >
              X
            </button>
          </div>
        ))}
      </ul>
      <h3 className={styles.addSkillTitle}>Add Skill</h3>

      <form
        className={"card" + " " + styles.formStyle}
        onSubmit={(e) => {
          handleAddSkill(e, addSkillName);
        }}
      >
        <div className={styles.formElement}>
          <label className={styles.label} htmlFor="name">
            Skill name:
          </label>
          <input
            onChange={(e) => setAddSkillName(e.target.value)}
            value={addSkillName}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <input
          className={styles.btnValidateForm + " " + styles.validateColor}
          type="submit"
          value="Add Skill"
        />
      </form>
    </div>
  );
};

export default Skills;
