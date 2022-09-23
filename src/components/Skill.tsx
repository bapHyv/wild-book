import styles from "../css/Skill.module.css";
import { ISkillProps } from "../interfaces/interfaces";

const Skill = ({ name, rate }: ISkillProps) => {
  return (
    <li className={styles.skillLi}>
      {name}
      {rate && <span className={styles.votes}>{rate}</span>}
    </li>
  );
};

export default Skill;
