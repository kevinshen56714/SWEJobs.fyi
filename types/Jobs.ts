import { SkillType } from './Skills'

type Job = {
  company: string
  link: string
  loc: string
  remote: boolean
  salary: string
  skills: {
    [SkillType.LANGUAGE]: string[]
    [SkillType.FRONTEND]: string[]
    [SkillType.NATIVE_OR_CROSS]: string[]
    [SkillType.BACKEND]: string[]
    [SkillType.DATABASE]: string[]
    [SkillType.CLOUD_INFRA]: string[]
    [SkillType.DATA_ML]: string[]
    [SkillType.COMPUTING_GRAPHICS]: string[]
  }
  title: string
}

export type Jobs = {
  todayJobs: Job[]
  yesterdayJobs: Job[]
  twoDaysAgoJobs: Job[]
}
