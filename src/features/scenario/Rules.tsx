import { useSelector } from "react-redux";
import { getActiveRules } from "../../store/game-slice";
import Rule from "./Rule";

const Rules = () => {
  const rules = useSelector(getActiveRules);

  const enabledRules = rules ? rules : [];
  return (
    <div className="p-4 text-center">
      {enabledRules.map((rule, i) => (
        <Rule rule={rule} key={i} className="mb-2" />
      ))}
    </div>
  );
};

export default Rules;
