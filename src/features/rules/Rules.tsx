import { Rule } from "../../classes"


type RuleProps = {rules: Rule[],  clickHandler?: (rule:Rule) => void}

export default function Rules({rules = [], clickHandler}: RuleProps) {


  return <div>
    <h3>Rules {rules.length}</h3>
    <ul>
    {rules.map((rule, ndx) => <li className="border border-slate-400 my-4" onClick={() => clickHandler && clickHandler(rule)} key={ndx}>
      <div> a: {rule.a}</div>
      <div> b: {rule.b}</div>
      <div> axis: {rule.axis}</div>
      <div> distance: {rule.distance}</div>
      <div> sameOtherAxis: {rule.sameOtherAxis ? 'yes' : 'no'}</div>
    </li>)}
    </ul>
  </div>
}