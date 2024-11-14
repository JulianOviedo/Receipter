import React from 'react'

interface Props {
  title: string
  subtitle?: string
  className?: string
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Title: React.FC<Props> = ({
  title,
  subtitle,
  className = '',
  component = 'h1'
}) => {
  className = `text-4xl font-bold ${className}`

  return React.createElement(
    component,
    { className },
      <div className='flex flex-col gap-1 text-center'>
        {title}
        {subtitle && <small className='font-light text-sm'>{subtitle}</small>}
        </div>
  )
}
