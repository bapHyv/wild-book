import blank_profile from '../assets/blank_profile.png'

import Skill from './Skill'

import {IWilderProps} from '../interfaces/interfaces'

const Wilder = ({ name, id, description, skills}: IWilderProps) => {
  return (
    <div className="card-container">
      <article className="card">
        <img src={blank_profile} alt="Jane Doe Profile" />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{id}</p>
        <h4>Wild Skills</h4>
        <ul className="skills">
          {skills &&
            skills.map((e, i) => (
              <Skill
                key={i.toString() + e.name + Math.random().toString()}
                id={e.id}
                name={e.name}
                rate={e.rate}
              />
            ))}
        </ul>
      </article>
    </div>
  )
}

export default Wilder