type splashIconProps = {
  src:string,
  alt:string,
  highlight?:boolean
}
export function SplashIcon({ src, alt, highlight }: splashIconProps) {
  let className = 'w-1/12 h-1/6 flex p-2 transition-all duration-500'
  if(highlight) className += ' bg-amber-300'

  // let opacitiy = highlight ? 'opacity-1' : 'opacity-0'
  // className += ' ' + opacitiy
  return <div className={className}>
      <img src={src} alt={alt} className="w-full" />
    </div>
}

export default SplashIcon