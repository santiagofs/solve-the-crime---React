import { Rule as RuleType } from "../../engine/types";
import ItemIcon from "../../components/item-icon";
import RuleArrow from "../../components/rule-arrow";
import { gameActions } from "../../store/game-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

type RuleProps = {
  rule: RuleType;
  className?: string;
};

const Rule = ({ rule, className }: RuleProps) => {
  const dispatch = useDispatch();
  const selectedRule = useSelector(
    (state: RootState) => state.game.selectedRule
  );

  const classNames = [
    "p-4 bg-white inline-flex rounded-md border-4 border-solid",
  ];
  if (selectedRule === rule) classNames.push("border-amber-500");
  if (className) classNames.push(className);

  return (
    <div
      className={classNames.join(" ")}
      onClick={() => dispatch(gameActions.selectRule(rule))}
    >
      <div className="w-20 aspect-square">
        <ItemIcon itemKey={rule.a} />
      </div>
      <div className="w-10 aspect-square text-stone-500 ">
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
