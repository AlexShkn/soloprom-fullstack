import React from 'react'

interface ButtonProps {
  onClick?: () => void
  classNames: string
  iconClass?: string
}

const CloseButton: React.FC<ButtonProps> = ({
  onClick,
  classNames,
  iconClass,
}) => {
  return (
    <button className={classNames} onClick={onClick}>
      <svg className={iconClass}>
        <use xlinkHref="/img/sprite-default.svg#close"></use>
      </svg>
    </button>
  )
}

export default CloseButton
