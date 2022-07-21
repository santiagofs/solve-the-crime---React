import { Rule as RuleType } from "../../engine/types"
import ItemIcon from "../../components/item-icon"
import RuleArrow from "../../components/rule-arrow"

type RuleProps = {
  rule: RuleType
}

const Rule = ({rule}:RuleProps) => {

  return <div className="p-4 bg-white inline-flex rounded-md">
    <div className="w-20 aspect-square"><ItemIcon itemKey={rule.a} /></div>
    <div className="w-10 aspect-square text-stone-500"> <RuleArrow cols={rule.distance.cols} rows={rule.distance.rows} /></div>
    <div className="w-20 aspect-square"><ItemIcon itemKey={rule.b} /></div>
  </div>
}

export default Rule