import Scrollbars from "react-custom-scrollbars-2";
import { FilePreview } from "../../atoms";

type UploadedFile = {
  id: string;
  category_id: number;
  label: string;
  description: string;
  file: File;
  preview?: string;
};

interface Props {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onView: (file: UploadedFile) => void;
}

export const FilePreviewList: React.FC<Props> = ({
  files,
  onRemove,
  onView,
}) => {
  if (files.length === 0) return null;
  return (
    <div className="mt-2 h-[100px]">
      <Scrollbars
        autoHide
        universal
        style={{ width: "100%", height: "100%" }}
        renderView={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              overflowY: "hidden",
              marginBottom: "-17px",
              whiteSpace: "nowrap",
            }}
          />
        )}
      >
        <div className="flex gap-2 h-full items-center px-4">
          {files.map((f) => (
            <FilePreview
              key={f.id}
              id={f.id}
              name={f.label}
              type={f.file.type}
              onRemove={onRemove}
              onView={() => onView(f)}
            />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};
