import { SkillType } from './Skills'

export type Job = {
  bigTech: boolean
  city: string
  company: string
  createdAt: number
  link: string
  loc: string
  remote: boolean
  hybrid: boolean
  salary: string
  skills: JobSkills
  startup: boolean
  title: string
}

export type JobSkills = { [type in SkillType]: string[] }
