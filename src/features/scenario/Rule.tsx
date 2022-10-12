import { Rule as RuleType } from "../../engine/types";
import ItemIcon from "../../components/item-icon";
import RuleArrow from "../../components/rule-arrow";

type RuleProps = {
  rule: RuleType;
  className?: string;
};

const Rule = ({ rule, className }: RuleProps) => {
  const classNames = ["p-4 bg-white inline-flex rounded-md"];
  if (className) classNames.push(className);

  return (
    <div className={classNames.join(" ")}>
      <div className="w-20 aspect-square">
        <ItemIcon itemKey={rule.a} />
      </div>
      <div className="w-10 aspect-square text-stone-500">
        {" "}
        <RuleArrow cols={rule.distance.cols} rows={rule.distance.rows} />
        {/* {rule.distance.cols}, {rule.distance.rows} */}
      </div>
      <div className="w-20 aspect-square">
        <ItemIcon itemKey={rule.b} />
      </div>
    </div>
  );
};

export default Rule;
