import { Rule } from "../../classes"


type RuleProps = {rules: Rule[],  clickHandler?: (rule:Rule) => void}

export default function Rules({rules = [], clickHandler}: RuleProps) {


  return <div>
    <h3>Rules {rules.length}</h3>
    <ul>
    {rules.map(rule => <li className="border border-slate-400 my-4" onClick={() => clickHandler && clickHandler(rule)}>
      <div> a: {rule.a}</div>
      <div> b: {rule.b}</div>
      <div> {rule.distance.cols}, {rule.distance.rows} {rule.distanceMask ? '???' : ''}</div>
    </li>)}
    </ul>
  </div>
}