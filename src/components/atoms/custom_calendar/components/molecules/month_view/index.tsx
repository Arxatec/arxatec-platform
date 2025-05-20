type Props = {
  currentDate: Date;
  onSelect: (month: number) => void;
};

export const MonthView: React.FC<Props> = ({ currentDate, onSelect }) => {
  const months = [
    { name: "ene", value: 0 },
    { name: "feb", value: 1 },
    { name: "mar", value: 2 },
    { name: "abr", value: 3 },
    { name: "may", value: 4 },
    { name: "jun", value: 5 },
    { name: "jul", value: 6 },
    { name: "ago", value: 7 },
    { name: "sep", value: 8 },
    { name: "oct", value: 9 },
    { name: "nov", value: 10 },
    { name: "dic", value: 11 },
  ];

  const currentMonth = currentDate.getMonth();

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {months.map((month) => (
        <button
          key={month.value}
          onClick={() => onSelect(month.value)}
          className={`rounded-md py-2 text-center text-sm transition-colors ${
            currentMonth === month.value
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {month.name}
        </button>
      ))}
    </div>
  );
};
