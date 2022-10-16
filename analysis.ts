const languages = [
  'Bash',
  'BASIC',
  'C',
  `C++`,
  'C#',
  'Cython',
  'ECMAScript',
  'Erlang',
  'F#',
  'Fortran',
  'Fortress',
  'FoxBase',
  'Go',
  'Golang',
  'Java',
  'JavaScript',
  'Kotlin',
  'MATLAB',
  'Objective-C',
  'Objective C',
  'OpenCL',
  'Perl',
  'PHP',
  'PowerShell',
  'Python',
  'R',
  'Ruby',
  'Rust',
  'Scala',
  'Swift',
  'Tcl',
  'TypeScript',
  'UNITY',
  'Unix shell',
  'Vala',
  'VBA',
  'VBScript',
  'Visual Basic',
  'WebQL',
]

const webStack = [
  'Angular',
  'Apache',
  'CSS',
  'Express',
  'ExpressJS',
  'Firebase',
  'GraphQL',
  'HTML',
  'Kafka',
  'MongoDB',
  'MySQL',
  'NodeJS',
  'PostgreSQL',
  'React',
  'Redux',
  'Remix',
  'Svelte',
  'Vue',
]

export const getSkillsInJobDescription = (description: string) => {
  const skills = []
  ;[...languages, ...webStack].map((skill) => {
    // escape + character for regex on C++
    const skillRaw = skill.replaceAll('+', String.raw`\+`)
    const re = new RegExp(`([ /(]${skillRaw}[ /,)])`, 'gim')
    if (re.test(description)) {
      skills.push(skill)
    }
  })

  return skills
}
