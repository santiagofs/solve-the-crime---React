const loadIcon = async (collection:string, file:string|null = null):Promise<string> => {
  const path = collection + (file ? '/' + file : '')
  try {
    const icon: string = await import("../assets/icons/" + path).then(
      (module) => module.default
    )
    return icon
  } catch(e:unknown) {
    if(typeof e === 'string') {
      console.warn(e)
    } else if(e instanceof Error) {
      console.log(e.message)
    }
    throw(new Error('Unable to load icon for ' + path))
  }

}

export default loadIcon