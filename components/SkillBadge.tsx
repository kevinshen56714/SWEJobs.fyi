import { Dispatch, SetStateAction } from 'react'

import { SkillType } from '../types/Skills'
import classNames from 'classnames'
import { skillsByType } from '../utils/analysis'

export const SkillBadge = (props: {
  skill: string
  onClickCallBack?: Dispatch<SetStateAction<string>>
  children?: React.ReactNode
}) => {
  const { skill, onClickCallBack, children } = props
  const type = Object.keys(skillsByType).find((type) => skillsByType[type].flat().includes(skill))
  return (
    <span
      onClick={() => onClickCallBack && onClickCallBack(skill)}
      className={classNames(
        {
          'bg-[#e6e6e6b2] text-black': type === SkillType.LANGUAGE,
          'bg-[#cbf3f0] text-black':
            type === SkillType.FRONTEND || type === SkillType.NATIVE_OR_CROSS,
          'bg-[#2ec4b5a3] text-black': type === SkillType.BACKEND,
          'bg-[#ffbf69] text-black': type === SkillType.DATABASE,
          'bg-[#ff9f1c] text-black': type === SkillType.CLOUD_INFRA,
          'bg-[#bde6ff] text-black': type === SkillType.AI_ML || type === SkillType.GRAPHICS,
          'cursor-pointer': onClickCallBack,
        },
        'my-0.5 mr-2 flex items-center gap-1 rounded-lg px-1.5 py-[1px] text-xs font-medium'
      )}
    >
      {skill}
      {children}
    </span>
  )
}
