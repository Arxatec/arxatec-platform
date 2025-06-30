import {
  CalendarDaysIcon,
  ClockIcon,
  DocumentIcon,
  DocumentTextIcon,
  EyeIcon,
  HashtagIcon,
  PaperClipIcon,
  SignalIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import {
  ExclamationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CustomInput,
  CustomStatusState,
  PrimaryButton,
} from "~/components/atoms";
import { CustomHeader, FileViewer } from "~/components/molecules";
import { useTitle } from "~/hooks";
import { ROUTES } from "~/routes/routes";
import { usePersonalCase, usePersonalCaseAttachments } from "../../hooks";
import s from "~/styles/editor_rich/index.module.css";

// Types for API response data
interface Attachment {
  id: number;
  label: string;
  description: string;
  category_id: number;
  uploaded_by: string;
  created_at: string;
  url: string;
}

interface Message {
  id?: number;
  content: string;
  sender_name?: string;
  created_at: string;
  sender_id?: number;
}

// ViewCase Loader State Component
const ViewCaseLoaderState = () => (
  <div className="min-h-screen">
    <div className="max-w-6xl mx-auto w-full min-h-[800px] px-4">
      <CustomHeader title="" />

      <div className="grid grid-cols-1 lg:grid-cols-[auto_400px] gap-2 mt-2">
        <div>
          {/* Case info skeleton */}
          <div className="bg-slate-200 rounded-md animate-pulse p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-[130px] h-5 bg-slate-300 rounded animate-pulse"></div>
                  <div className="w-20 h-5 bg-slate-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments skeleton */}
          <div className="bg-slate-200 rounded-md animate-pulse p-4 mt-2">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="w-32 h-5 bg-slate-300 rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-slate-300 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-slate-300 rounded-md"
                >
                  <div className="w-32 h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Description skeleton */}
          <div className="bg-slate-200 rounded-md animate-pulse p-4 mt-2">
            <div className="w-24 h-5 bg-slate-300 rounded animate-pulse mb-2"></div>
            <div className="bg-slate-300 rounded-md p-4">
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-4 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
                <div className="w-3/4 h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Activity header skeleton */}
          <div className="bg-slate-200 rounded-md animate-pulse px-4 py-2">
            <div className="w-16 h-6 bg-slate-300 rounded animate-pulse"></div>
          </div>

          {/* Messages skeleton */}
          <div className="bg-slate-200 rounded-md animate-pulse p-4 mt-2">
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="border-b border-slate-300 pb-2 last:border-b-0"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-20 h-4 bg-slate-300 rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-slate-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-full h-4 bg-slate-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Input skeleton */}
          <div className="grid grid-cols-[auto_100px] mt-2 items-center gap-2 w-full">
            <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Helper function to format urgency
const getUrgencyDisplay = (urgency: string) => {
  const urgencyMap: Record<string, { label: string; className: string }> = {
    baja: { label: "Baja", className: "text-green-600 bg-green-100" },
    media: { label: "Media", className: "text-yellow-600 bg-yellow-100" },
    alta: { label: "Alta", className: "text-orange-600 bg-orange-100" },
    "muy alta": { label: "Muy alta", className: "text-red-600 bg-red-100" },
  };
  return (
    urgencyMap[urgency.toLowerCase()] || {
      label: urgency,
      className: "text-gray-600 bg-gray-100",
    }
  );
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Helper function to get file extension from URL
const getFileExtension = (url: string): string => {
  const urlWithoutQuery = url.split("?")[0];
  const extension = urlWithoutQuery.split(".").pop()?.toLowerCase() || "";
  return extension;
};

// Helper function to get file type from extension
const getFileType = (extension: string): string => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const pdfExtensions = ["pdf"];
  const textExtensions = ["txt", "json", "csv", "md"];
  const documentExtensions = ["doc", "docx", "xls", "xlsx"];

  if (imageExtensions.includes(extension)) return "image";
  if (pdfExtensions.includes(extension)) return "pdf";
  if (textExtensions.includes(extension)) return "text";
  if (documentExtensions.includes(extension)) return "document";
  return "unknown";
};

// Función para convertir Attachment a formato FileViewer
const attachmentToFileData = (attachment: Attachment) => ({
  id: attachment.id.toString(),
  category_id: attachment.category_id.toString(),
  label: attachment.label,
  description: attachment.description,
  url: attachment.url,
});

export default function ViewCase() {
  const { changeTitle } = useTitle();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError } = usePersonalCase(id as string);
  const {
    data: attachments,
    isPending: isPendingAttachments,
    isError: isErrorAttachments,
  } = usePersonalCaseAttachments(id as string);
  const onBack = () => navigate(ROUTES.Client.CasesPersonal);

  // Estado para manejar el archivo seleccionado
  const [selectedFileData, setSelectedFileData] = useState<{
    id: string;
    category_id: string;
    label: string;
    description: string;
    file?: File;
    preview?: string;
    url?: string;
  } | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewAttachment = (attachment: Attachment) => {
    console.log(attachment);
    setSelectedFileData(attachmentToFileData(attachment));
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedFileData(null);
  };

  useEffect(() => {
    changeTitle("Ver caso - Arxatec");
  }, []);

  useEffect(() => {
    console.log(attachments);
  }, [attachments, isPendingAttachments, isErrorAttachments]);

  if (isPending || isPendingAttachments) return <ViewCaseLoaderState />;

  if (isError) {
    console.log(isError);
    return (
      <CustomStatusState
        title="Error al cargar el caso"
        message="Sucedió un error inesperado, por favor intenta nuevamente. Si el error persiste, contacta al administrador o soporte."
        icon={<ExclamationCircleIcon className="size-10 text-gray-300 mb-2" />}
      />
    );
  }
  const caseData = data?.data?.case;

  if (!caseData) {
    return (
      <CustomStatusState
        title="Caso no encontrado"
        message="No se pudo encontrar la información del caso solicitado."
        icon={<ExclamationCircleIcon className="size-10 text-gray-300 mb-2" />}
      />
    );
  }

  const urgencyDisplay = getUrgencyDisplay(caseData.urgency);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col h-[800px] max-w-6xl mx-auto w-full px-4">
        <CustomHeader onBack={onBack} title={caseData.title} />

        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[auto_400px] gap-2">
          <div className="flex flex-col h-full">
            <div className="shadow hover:shadow-md bg-white w-full p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <HashtagIcon className="size-4 text-gray-500" />
                  <h3 className="text-gray-900 font-medium text-sm">
                    Identificador
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {caseData.reference_code}
                </p>
              </div>

              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <ClockIcon className="size-4 text-gray-500" />
                  <h3 className="text-gray-900 font-medium text-sm">
                    Urgencia
                  </h3>
                </div>
                <p
                  className={`text-xs px-2 py-1 rounded-md ${urgencyDisplay.className}`}
                >
                  {urgencyDisplay.label}
                </p>
              </div>

              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <CalendarDaysIcon className="size-4 text-gray-500" />
                  <h3 className="text-gray-900 font-medium text-sm">
                    Fecha de inicio
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(caseData.created_at)}
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <TagIcon className="size-4 text-gray-500" />
                  <h3 className="text-gray-900 font-medium text-sm">
                    Categoria
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {caseData.category?.name}
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <SignalIcon className="size-4 text-gray-500" />
                  <h3 className="text-gray-900 font-medium text-sm">Estado</h3>
                </div>
                <p className="text-xs text-green-700 px-2 py-1 rounded-md bg-green-100 uppercase font-medium">
                  {caseData.status?.name}
                </p>
              </div>
            </div>
            <div className="mt-2 shadow hover:shadow-md bg-white w-full p-4 rounded-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <PaperClipIcon className="size-4 text-gray-900" />
                  <h3 className="text-gray-900 font-medium text-sm">
                    Archivos adjuntos
                  </h3>
                  <span className="text-xs text-gray-500">
                    ({attachments?.data?.attachments?.length || 0})
                  </span>
                </div>
              </div>
              <div className="mt-4">
                {!attachments?.data?.attachments?.length ? (
                  <p className="text-sm text-gray-500 italic">
                    No hay archivos adjuntos
                  </p>
                ) : (
                  <div className="space-y-2">
                    {attachments.data.attachments.map(
                      (attachment: Attachment) => {
                        const extension = getFileExtension(attachment.url);
                        const fileType = getFileType(extension);

                        return (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="flex-shrink-0">
                                {fileType === "image" && (
                                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                                    <span className="text-green-600 text-xs font-medium">
                                      IMG
                                    </span>
                                  </div>
                                )}
                                {fileType === "pdf" && (
                                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                                    <span className="text-red-600 text-xs font-medium">
                                      PDF
                                    </span>
                                  </div>
                                )}
                                {(fileType === "text" ||
                                  fileType === "document" ||
                                  fileType === "unknown") && (
                                  <DocumentIcon className="size-8 text-gray-500" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {attachment.label}
                                </p>
                                {attachment.description && (
                                  <p className="text-xs text-gray-500 truncate">
                                    {attachment.description}
                                  </p>
                                )}
                                <p className="text-xs text-gray-400">
                                  {extension.toUpperCase()} •{" "}
                                  {formatDate(attachment.created_at)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleViewAttachment(attachment)}
                              className="ml-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            >
                              <EyeIcon className="size-4" />
                              Ver
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 shadow hover:shadow-md bg-white w-full p-4 rounded-md h-full flex flex-col">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="size-4 text-gray-900" />
                <h3 className="text-gray-900 font-medium text-sm">
                  Descripción
                </h3>
              </div>
              <div className="bg-gray-50 mt-2 border border-gray-100 rounded-md w-full text-sm text-gray-700 p-4 h-full">
                <div
                  className={`${s.richTextContent} prose`}
                  dangerouslySetInnerHTML={{ __html: caseData.description }}
                />
              </div>
            </div>
          </div>
          <div className="h-full grid grid-rows-[auto_1fr_auto]">
            <div className="shadow hover:shadow-md bg-white w-full px-4 py-2 rounded-md">
              <h2 className="text-gray-900 font-semibold text-base">
                Mensajes
              </h2>
            </div>
            <div className="shadow hover:shadow-md bg-white w-full p-4 rounded-md mt-2">
              {caseData.service?.messages?.length === 0 ? (
                <div className="flex items-center justify-center gap-2 w-full">
                  <span className="flex-1 h-[1px] bg-gray-200"></span>
                  <p className="text-xs text-gray-500 italic text-center whitespace-nowrap px-1">
                    No hay mensajes aún
                  </p>
                  <span className="flex-1 h-[1px] bg-gray-200"></span>
                </div>
              ) : (
                <div className="space-y-3">
                  {caseData.service.messages.map(
                    (message: Message, index: number) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 pb-2 last:border-b-0"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {message.sender_name || "Usuario"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {message.content}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-[auto_100px] mt-2 items-center gap-2 w-full">
              <CustomInput
                placeholder="Agrega un comentario"
                className="ring-0 py-2.5 flex shadow hover:shadow-md"
              />
              <PrimaryButton className="gap-2 py-2.5">
                <PaperAirplaneIcon className="size-4 text-white" />
                Enviar
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <FileViewer
        file={selectedFileData}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        canDownload={false}
      />
    </div>
  );
}
