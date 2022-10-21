import { SkillType } from '../types/Skills'

const languages = [
  'APL',
  'Assembly',
  ['Bash/Shell', 'Bash'],
  ['C/C++', 'C', 'C++'],
  'C#',
  'Clojure',
  'COBOL',
  'Delphi',
  'Dart',
  'Elixir',
  'Erlang',
  'F#',
  'Fortran',
  ['Go', 'Golang'],
  'Groovy',
  'Haskell',
  ['HTML/CSS', 'HTML', 'HTML5', 'CSS3'],
  'Java',
  ['JavaScript', 'ECMAScript'],
  'Julia',
  'Kotlin',
  'LISP',
  'Lua',
  'MATLAB',
  ['Objective-C', 'Objective C'],
  'Perl',
  'PowerShell',
  'Python',
  'R',
  'Ruby',
  'Rust',
  'Scala',
  'Solidity',
  'SQL',
  'Swift',
  'Tcl',
  'TypeScript',
  'VBA',
  'VBScript',
  'Visual Basic',
]

const frontendStack = [
  ['Angular', 'AngularJS', 'Angular.js'],
  'jQuery',
  ['NextJS', 'Next.js'],
  ['Nuxt', 'NuxtJS', 'Nuxt.js'],
  ['React', 'ReactJS', 'React.js'],
  'Redux',
  'SASS',
  ['Svelte', 'SvelteJS', 'Svelte.js'],
  'Tailwind',
  ['Vue', 'VueJS', 'Vue.js'],
  ['WASM', 'Web Assembly', 'WebAssembly'],
]

const backendStack = [
  'ASP.NET',
  'Apache',
  'Blazor',
  'Django',
  ['ExpressJS', 'Express.js', 'Express'],
  'FastAPI',
  'Flask',
  'Gatsby',
  'GraphQL',
  'gRPC',
  'Laravel',
  ['Memcached','Memcache'],
  ['NodeJS', 'Node.js', 'Node'],
  'PHP',
  'Ruby on Rails',
  'Symfony',
]

const databaseStack = [
  'Cassandra',
  'CockroachDB',
  'Couchbase',
  'CouchDB',
  ['DynamoDB', 'Dynamo'],
  'Elasticsearch',
  ['Firebase', 'Firestore', 'Realtime Database'],
  ['IBM Db2', 'Db2'],
  'MariaDB',
  ['MSSQL', 'Microsoft SQL'],
  ['MongoDB', 'Mongo'],
  'MySQL',
  'Neo4j',
  'Oracle',
  ['PostgreSQL', 'Postgres'],
  'Redis',
  'SQLite',
]

const cloudInfraStack = [
  'Ansible',
  'AWS',
  'Azure',
  'BigTable', // put it under GCP?
  'BigQuery', // put it under GCP?
  'DataFlow', // put it under GCP?
  'Docker',
  'EC2', // put it under AWS?
  ['GCP', 'Google Cloud'],
  'Heroku',
  'Jenkins',
  ['Kubernetes', 'K8s'],
  'Kafka',
  'Lambda', // put it under AWS?
  'Nginx',
  'RabbitMQ',
  'S3', // put it under AWS?
  'TerraForm',
]

const dataMLStack = [
  ['D3.js', 'D3js', 'D3'],
  'Dask',
  'Databricks',
  'Hadoop',
  'Keras',
  'Numpy',
  'Pandas',
  'Presto',
  'PyTorch',
  ['Scikit-learn', 'Scikit learn'],
  'Spark',
  'TensorFlow',
]

const mobileAndOthersStack = [
  '.NET',
  'Android',
  'Cordova',
  'CUDA',
  ['Electron', 'ElectronJS', 'Electron.js'],
  'Flutter',
  'Ionic',
  'iOS',
  ['OpenMP/MPI', 'OpenMP', 'MPI'],
  ['OpenGL', 'Open GL'],
  ['React Native', 'ReactNative'],
  ['three.js', 'threeJS'], 
  'Unity',
  'Uno',
  ['Unreal Engine', 'Unreal'],
  ['WebGL', 'Web GL'],
  'Xamarin',
]

const skillsByType = {
  [SkillType.LANGUAGE]: languages,
  [SkillType.FRONTEND]: frontendStack,
  [SkillType.BACKEND]: backendStack,
  [SkillType.DATABASE]: databaseStack,
  [SkillType.CLOUD_INFRA]: cloudInfraStack,
  [SkillType.DATA_ML]: dataMLStack,
  [SkillType.MOBILE_OTHER]: mobileAndOthersStack,
}

const checkIfSkillInDescription = (skill: string | string[], description: string): boolean => {
  // recursively check all the aliases if skill is an array of alias names
  if (skill instanceof Array) {
    const aliasExistArr = skill.map((skillAlias) =>
      checkIfSkillInDescription(skillAlias, description)
    )
    // return true if any of the aliases is in the description
    return aliasExistArr.some((aliasExist) => aliasExist === true)
  }
  // escape + character for regex on C++
  const skillRaw = skill.replaceAll('+', String.raw`\+`)
  const re = new RegExp(`([ /(]${skillRaw}[ /,):])`, 'gim')
  return re.test(description)
}

export const getSkillsInJobDescription = (description: string) => {
  const allMatchedSkills = {}
  Object.keys(skillsByType).map((type) => {
    const matchedSkills = []
    skillsByType[type].map((skill) => {
      if (checkIfSkillInDescription(skill, description)) {
        if (skill instanceof Array) skill = skill[0]
        matchedSkills.push(skill)
      }
    })
    allMatchedSkills[type] = matchedSkills
  })
  return allMatchedSkills
}
