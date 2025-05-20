import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { logo } from "~/utilities/assets_utilities";

interface Props {
  maxValue: number;
  value: number;
}
export const Header: React.FC<Props> = ({ maxValue, value }) => {
  return (
    <div className="w-full flex items-center justify-between py-4">
      <img alt="Arxatec" src={logo} className="h-10 w-auto" />
      <div style={{ width: 30, height: 30 }}>
        <CircularProgressbar
          value={value}
          maxValue={maxValue}
          strokeWidth={15}
          styles={buildStyles({
            pathColor: `#2563eb`,
            trailColor: "#dbeafe",
          })}
        />
      </div>
    </div>
  );
};
