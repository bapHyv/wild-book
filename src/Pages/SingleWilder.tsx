import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import { ISkillProps, IWilderProps } from "../interfaces/interfaces";

import blank_profile from "../assets/blank_profile.png";

import Skill from "../components/Skill";
import Modal from "../components/Modal";

import styles from "../css/SingleWilder.module.css";

const SingleWilder = () => {
  const [wilder, setWilder] = useState<IWilderProps>();
  const [inputValues, setInputValues] = useState<{
    name: IWilderProps["name"];
    description: IWilderProps["description"];
    skills: IWilderProps["skills"];
  }>({
    name: "",
    description: "",
    skills: [],
  });
  const [disabledInput, setDisabledInput] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [skills, setSkills] = useState<ISkillProps[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<ISkillProps["name"]>("");
  const [gradeSkill, setGradeSkill] = useState<ISkillProps["rate"]>(0);
  const [selectedAndGradeSkills, setSelectedAndGradeSkill] = useState<
    {
      name: string;
      rate: number;
    }[]
  >([]);

  const { id: wilderIdFromUrlParams } = useParams();
  const navigate = useNavigate();

  const fetchWilder = async () => {
    // fetch data
    const wilderData = await axios.get(
      `http://localhost:5000/api/wilder/${wilderIdFromUrlParams}`
    );

    // set the wilder
    setWilder(wilderData.data);
  };

  const fetchSkills = async () => {
    const skillsData = await axios.get("http://localhost:5000/api/skill");
    setSkills(skillsData.data);
  };

  useEffect(() => {
    fetchWilder();
    fetchSkills();
  }, []);

  useEffect(() => {
    // set the input values to deal with inputs when modifying wilder informations
    if (wilder !== undefined) {
      setInputValues({
        name: wilder.name,
        description: wilder.description,
        skills: wilder.skills,
      });
    }
  }, [wilder]);

  const handleReturnToWilder = () => {
    navigate("/wilders");
  };

  // HANDLE ALL INPUT CHANGE RELATED TO WILDER UPDATE
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // HANDLE TEXTAREA CHANGE RELATED TO WILDER UPDATE
  const handleOnChangeTextArea: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // ABLE AND DISABLE INPUT AND TEXTAREA TO UPDATE WILDER
  const switchDisabled = () => {
    setDisabledInput(!disabledInput);
  };

  // DELETE WILDER FUNCTION
  const handleDeleteWilder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = window.confirm(
      `Do you really want to delete the wilder ${wilder && wilder.name} ?`
    );
    if (answer) {
      e.preventDefault();
      await axios.delete("http://localhost:5000/api/wilder", {
        data: { id: wilderIdFromUrlParams },
      });
      navigate("/wilders");
    } else {
    }
  };

  // UPDATE WILDER FUNCTION
  const handleUpdateWilder = async () => {
    if (!disabledInput) {
      await axios.put("http://localhost:5000/api/wilder", {
        id: wilderIdFromUrlParams,
        name: inputValues.name,
        description: inputValues.description,
      });
      fetchWilder();
      setDisabledInput(true);
    }
  };

  // DELETE WILDER'S SKILL FUNCTION
  const handleDeleteSkill = async (
    e: React.MouseEvent<HTMLButtonElement>,
    skill: ISkillProps
  ) => {
    const answer = window.confirm(
      `Do you really want to delete the skill ${skill && skill.name} ?`
    );
    if (answer) {
      await axios.delete("http://localhost:5000/api/ratingSkill", {
        data: { wilderId: wilderIdFromUrlParams, skillId: skill.id },
      });
      fetchWilder();
    }
  };

  const handleSelectSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value);
  };

  const handleGradeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGradeSkill(parseInt(e.target.value));
  };

  const handleAddSkill = (selectedSkill: string, gradeSkill: number) => {
    if (wilder !== undefined) {
      if (
        wilder.skills.find((e) => e.name === selectedSkill) === undefined &&
        selectedAndGradeSkills.find((e) => e.name === selectedSkill) ===
          undefined
      ) {
        setSelectedAndGradeSkill([
          ...selectedAndGradeSkills,
          { name: selectedSkill, rate: gradeSkill },
        ]);
        setSelectedSkill("");
        setGradeSkill(0);
      } else {
        alert(
          `Can't add skill "${selectedSkill}" because the wilder already has this skill`
        );
        setSelectedSkill("");
        setGradeSkill(0);
      }
    }
  };

  // DISPLAY THE ADD SKILL MODAL
  const handleShowModal = () => {
    setShowModal(true);
  };

  // CLOSE THE ADD SKILL MODAL
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSkill("");
    setGradeSkill(0);
    setSelectedAndGradeSkill([]);
  };

  // ADD SKILL TO WILDER FUNCTION
  const handleSubmitModal = async (
    wilderName: IWilderProps["name"]
  ): Promise<void> => {
    if (selectedAndGradeSkills.length > 0) {
      console.log("updating wilder's skill");
      await Promise.all(
        selectedAndGradeSkills.map((e) => {
          return axios.put("http://localhost:5000/api/wilder/addRateToSkill", {
            name: wilderName,
            skillName: e.name,
            rate: e.rate,
          });
        })
      );
      handleCloseModal();
      fetchWilder();
    }
  };


  return (
    <div className={styles.infosContainer}>
      <Modal
        show={showModal}
        wilderName={wilder && wilder.name ? wilder.name : "No wilder selected"}
        handleCloseModal={handleCloseModal}
        handleSubmitModal={handleSubmitModal}
      >
        <div className={styles.skillAndGradeElements}>
          <select value={selectedSkill} onChange={handleSelectSkill}>
            border-radius: 10px;
            <option value="" disabled>
              Default
            </option>
            {skills.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <input
            value={gradeSkill}
            onChange={handleGradeSkill}
            type="number"
            name="grade"
            id="grade"
            min="0"
            max="10"
          />
          <button
            className={styles.btnSingleWilder + " " + styles.cyanColor}
            onClick={() => handleAddSkill(selectedSkill, gradeSkill)}
          >
            Add skill and grade
          </button>
        </div>
        <div className={styles.selectedAndGradeAddedContainer}>
          {selectedAndGradeSkills.length > 0 &&
            selectedAndGradeSkills.map((e, i, a) => (
              <Skill
                key={i.toString() + Math.random().toString}
                name={e.name}
                rate={e.rate}
              />
            ))}
        </div>
      </Modal>
      <button
        onClick={() => handleReturnToWilder()}
        className={
          styles.btnSingleWilder +
          " " +
          styles.blackColor +
          " " +
          styles.btnReturnToWilder
        }
      >
        Return to wilders
      </button>
      <div className={styles.imgAndInputsContainer}>
        <img
          className={styles.imgProfil}
          src={blank_profile}
          alt="Jane Doe Profile"
        />

        <div className={styles.inputsContainer}>
          <div className={styles.btnsContainer}>
            <button
              className={styles.btnSingleWilder + " " + styles.primaryColor}
              onClick={() => switchDisabled()}
            >
              Modify Wilder
            </button>
            <button
              className={styles.btnSingleWilder + " " + styles.dangerColor}
              onClick={(e) => handleDeleteWilder(e)}
            >
              Delete Wilder
            </button>
          </div>
          <div className={styles.labelsAndInputs}>
            <label htmlFor="name">Name:</label>
            <input
              onChange={handleOnChange}
              value={inputValues.name}
              type="text"
              name="name"
              id="name"
              disabled={disabledInput}
            />
          </div>
          <div className={styles.labelsAndInputs}>
            <label htmlFor="description">Description:</label>
            <textarea
              onChange={handleOnChangeTextArea}
              value={inputValues.description}
              name="description"
              id="description"
              rows={10}
              cols={30}
              disabled={disabledInput}
            ></textarea>
          </div>
          <button
            onClick={() => handleUpdateWilder()}
            className={styles.btnSingleWilder + " " + styles.validateColor}
          >
            Update Wilder
          </button>
        </div>
      </div>
      <div className={styles.btnAddSkillAndSkillsContainer}>
        <button
          onClick={handleShowModal}
          className={
            styles.btnSingleWilder +
            " " +
            styles.cyanColor +
            " " +
            styles.btnAddSkill
          }
        >
          Add Skill
        </button>
        <ul className={styles.ulSingleWilder}>
          {wilder &&
            wilder.skills &&
            wilder.skills.map((e, i) => (
              <div
                className={styles.skillsAndBtnContainer}
                key={i.toString() + e.name + Math.random().toString()}
              >
                <Skill id={e.id} name={e.name} rate={e.rate} />
                <button onClick={(event) => handleDeleteSkill(event, e)}>
                  x
                </button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleWilder;
