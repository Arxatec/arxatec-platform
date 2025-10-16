export const HorizontalLines = () => {
  const generateTimeSlots = () => {
    const slots = [];

    // Primer slot vacío para el header
    slots.push(<div key="header" className="row-end-1 h-7" />);

    for (let hour = 0; hour < 24; hour++) {
      for (let quarter = 0; quarter < 4; quarter++) {
        const isMainHour = quarter === 0; // Solo mostrar la hora en el primer slot de cada hora

        if (isMainHour) {
          const timeLabel =
            hour === 0
              ? "12AM"
              : hour < 12
              ? `${hour}AM`
              : hour === 12
              ? "12PM"
              : `${hour - 12}PM`;

          slots.push(
            <div key={`${hour}-${quarter}`}>
              <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                {timeLabel}
              </div>
            </div>
          );
        } else {
          // Slots vacíos para los otros 15 minutos de la hora
          slots.push(<div key={`${hour}-${quarter}`} />);
        }
      }
    }

    return slots;
  };

  return (
    <div
      style={{ gridTemplateRows: "repeat(96, minmax(50px, 1fr))" }}
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-muted"
    >
      {generateTimeSlots()}
    </div>
  );
};
