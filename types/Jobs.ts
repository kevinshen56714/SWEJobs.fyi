import { SkillType } from './Skills'

export type Job = {
  bigTech: boolean
  company: string
  createdAt: number
  link: string
  loc: string
  remote: boolean
  salary: string
  skills: {
    [type in SkillType]: string[]
  }
  startup: boolean
  title: string
}
