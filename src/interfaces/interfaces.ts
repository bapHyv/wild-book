export type id = string | number;

export interface IWilderProps {
  id: id;
  name: string;
  description: string;
  skills: ISkillProps[];
}

export interface ISkillProps {
  id?: id;
  name: string;
  rate: number;
}

export interface ISkill {
  name: string;
}

export interface IModal {
  children: React.ReactNode;
  show: boolean;
  handleCloseModal: () => void;
  handleSubmitModal?: (wilderName: IWilderProps["name"]) => Promise<void>;
  handleSubmitModalSkill?: (skillName: ISkillProps["name"], skillId: ISkillProps["id"]) => Promise<void>;
  wilderName?: string;
  skillName?: string;
  skillId?: id
}
