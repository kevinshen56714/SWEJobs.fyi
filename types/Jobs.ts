import { SkillType } from './Skills'

type Job = {
  company: string
  link: string
  loc: string
  remote: boolean
  salary: string
  skills: {
    [type in SkillType]: string[]
  }
  title: string
}

export type Jobs = {
  todayJobs: Job[]
  yesterdayJobs: Job[]
  twoDaysAgoJobs: Job[]
}
