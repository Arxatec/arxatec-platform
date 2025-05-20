type Props = {
  currentDate: Date;
  onSelect: (year: number) => void;
};

export const YearView: React.FC<Props> = ({ currentDate, onSelect }) => {
  const currentYear = currentDate.getFullYear();
  const decade = Math.floor(currentYear / 10) * 10;

  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(decade + i);
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onSelect(year)}
          className={`rounded-md py-2 text-center text-sm transition-colors ${
            currentYear === year
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
};
