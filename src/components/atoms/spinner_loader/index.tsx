import s from "./index.module.css";

interface Props {
  size?: number;
  color?: string;
}

export const SpinnerLoader: React.FC<Props> = ({ size = 48, color }) => {
  return (
    <span
      className={s.loader}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `${size / 10}px solid ${color ?? "#FFF"}`,
        borderBottomColor: "transparent",
      }}
    ></span>
  );
};
