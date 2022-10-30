import { SkillType } from '../types/Skills'
import classNames from 'classnames'

export const SkillBadge = ({ children, type }) => {
  if (type === SkillType.LANGUAGE) return
  return (
    <span
      className={classNames(
        {
          'bg-[#cbf3f0] text-black':
            type === SkillType.FRONTEND || type === SkillType.NATIVE_OR_CROSS,
          'bg-[#2ec4b5a3] text-black': type === SkillType.BACKEND,
          'bg-[#ffbf69] text-black': type === SkillType.DATABASE,
          'bg-[#ff9f1c] text-black': type === SkillType.CLOUD_INFRA,
          'bg-[#bde6ff] text-black': type === SkillType.AI_ML || type === SkillType.GRAPHICS,
        },
        'my-0.5 mr-2 rounded-lg px-1.5 py-[1px] text-xs font-medium'
      )}
    >
      {children}
    </span>
  )
}
