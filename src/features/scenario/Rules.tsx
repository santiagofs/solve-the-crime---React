import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Rule from "./Rule"

const Rules = () => {
  const rules = useSelector((state:RootState) => state.game.level?.rules)

  const enabledRules = rules ? rules : []
  console.log(rules)
  return (
    <div className="p-4 text-center">
      { enabledRules.map(rule => <Rule rule={rule} />)}
    </div>
  )
}

export default Rules