'use client'
import 'material-symbols'
import type { MaterialSymbol } from 'material-symbols'

export type MaterialSymbolProps = {
  type?: 'outlined' | 'rounded' | 'sharp'
  name: MaterialSymbol
  size?: number
  className?: string
  fill?: boolean
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  grade?: -25 | 0 | 200
  opticalSize?: 20 | 24 | 40 | 48
  color?: string
}

export default function Icon({
  type = 'outlined',
  name,
  size,
  className,
  fill = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
  color
}: MaterialSymbolProps) {
  const fontSize = size && size + 'px'

  return (
    <>
      <style jsx>
        {`
          .material-symbols-${type} {
            font-variation-settings:
              'FILL' ${fill ? 1 : 0},
              'wght' ${weight},
              'GRAD' ${grade},
              'opsz' ${opticalSize};
          }
        `}
      </style>
      <span
        className={`material-symbols-${type} ${className}`}
        style={{
          color,
          fontSize
        }}
      >
        {name}
      </span>
    </>
  )
}
