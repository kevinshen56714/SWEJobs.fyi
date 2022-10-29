import { SkillType } from './Skills'

export type Job = {
  company: string
  createdAt: number
  link: string
  loc: string
  remote: boolean
  salary: string
  skills: {
    [type in SkillType]: string[]
  }
  title: string
}
