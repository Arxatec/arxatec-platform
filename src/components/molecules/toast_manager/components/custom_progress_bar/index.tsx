interface Props {
  progress: number;
  color: string;
}

export const CustomProgressBar = ({ progress, color }: Props) => {
  return (
    <div className="w-full h-1 bg-gray-300 rounded overflow-hidden mt-2 absolute left-0 bottom-0">
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          transition: "width 5.5s linear",
        }}
      />
    </div>
  );
};
