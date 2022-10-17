import { SkillType } from "./Skills"

type Job = {
  companyName: string
  companyLocation: string
  jobLink: string
  jobTitle: string
  salary: string
  skills: {
    [SkillType.LANGUAGE]: string[]
    [SkillType.FRONTEND]: string[]
    [SkillType.BACKEND]: string[]
    [SkillType.DEVOPS]: string[]
    [SkillType.DATAML]: string[]
  }
}

export type Jobs = {
  todayJobs: Job[]
  yesterdayJobs: Job[]
  twoDaysAgoJobs: Job[]
}
