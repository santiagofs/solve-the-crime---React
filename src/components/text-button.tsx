import { ReactNode } from "react"

type TextButtonProps = {
  children: ReactNode,
  className?: string,
  action: Function
}

const TextButton = function({children, className='', action}:TextButtonProps) {
  return <button className={`${className} px-4 py-2`} onClick={() => action()}>{children}</button>
}

export default TextButton