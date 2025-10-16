import { useDroppable } from "@dnd-kit/core";

interface Props {
  slotId: string;
  children?: React.ReactNode;
}

export const TimeSlot: React.FC<Props> = ({ slotId, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: slotId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`absolute w-full h-[50px] ${
        isOver
          ? "bg-neutral-100 bg-opacity-50 border-2 border-neutral-300 border-dashed"
          : ""
      }`}
      style={{
        top: `${(parseInt(slotId) - 1) * 50 + 28}px`, // slotId es 1-96, ajustamos por header
        zIndex: 5,
      }}
    >
      {children}
    </div>
  );
};
