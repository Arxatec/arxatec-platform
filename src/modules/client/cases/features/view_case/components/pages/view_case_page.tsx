import {
  CalendarDaysIcon,
  ClockIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  HashtagIcon,
  PaperClipIcon,
  SignalIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon,
  DocumentMinusIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  CustomAvatar,
  CustomDropdown,
  CustomInput,
  CustomStatusState,
  FileIcon,
  PrimaryButton,
} from "~/components/atoms";
import { CustomHeader, FileViewer } from "~/components/molecules";
import { useTitle } from "~/hooks";
import { ROUTES } from "~/routes/routes";
import {
  usePersonalCase,
  usePersonalCaseAttachments,
  useSocketMessages,
} from "../../hooks";
import s from "~/styles/editor_rich/index.module.css";
import { useUserStore } from "~/store";
import { useArchiveCase } from "../../hooks/use_archive_case";
import { useLawyer } from "../../hooks/use_lawyer";
import { useSendMessage } from "../../hooks/use_send_message";
import { ToastManager } from "~/components/molecules/toast_manager";
import { twMerge } from "tailwind-merge";
import Chatbot from "../molecules/chatbot";
import type { ChatbotProps } from "../molecules/chatbot/types";

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
const ViewCaseLoaderState = () => {
  const navigate = useNavigate();
  const onBack = () => navigate(ROUTES.Client.CasesPersonal);
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto w-full h-[800px] px-4">
        <CustomHeader title=" " onBack={onBack} />

        <div className="grid grid-cols-1 lg:grid-cols-[auto_400px] h-full gap-2 mt-2">
          <div className="h-full flex flex-col">
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
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between p-2 bg-slate-300 rounded-md max-w-[300px] h-[80px]">
                  <div className="w-32 h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Description skeleton */}
            <div className="bg-slate-200 rounded-md animate-pulse p-4 mt-2 h-full flex flex-col">
              <div className="w-24 h-5 bg-slate-300 rounded animate-pulse mb-2"></div>
              <div className="bg-slate-300 rounded-md p-4 h-full"></div>
            </div>
          </div>

          <div className="grid grid-rows-[auto_1fr_auto]">
            {/* Activity header skeleton */}
            <div className="bg-slate-200 rounded-md animate-pulse px-4 py-2">
              <div className="w-16 h-6 bg-slate-300 rounded animate-pulse"></div>
            </div>

            {/* Messages skeleton */}
            <div className="bg-slate-200 rounded-md animate-pulse p-4 mt-2">
              <div className="space-y-3">
                <div className="border-b border-slate-300 pb-2 last:border-b-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-20 h-4 bg-slate-300 rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-slate-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-full h-4 bg-slate-300 rounded animate-pulse"></div>
                </div>
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
};

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
      className: "text-slate-600 bg-slate-100",
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

// Función para convertir Attachment a formato FileViewer
const attachmentToFileData = (attachment: Attachment) => ({
  id: attachment.id.toString(),
  category_id: attachment.category_id.toString(),
  label: attachment.label,
  description: attachment.description,
  url: attachment.url,
});

export default function ViewCase() {
  const user = useUserStore((state) => state.user);
  const [lawyerId, setLawyerId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { changeTitle } = useTitle();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError } = usePersonalCase(id as string);
  const {
    data: attachments,
    isPending: isPendingAttachments,
    isError: isErrorAttachments,
  } = usePersonalCaseAttachments(id as string);

  const {
    data: lawyer,
    isPending: isPendingLawyer,
    refetch: refetchLawyer,
    isError: isErrorLawyer,
  } = useLawyer(lawyerId);

  const {
    mutate: sendMessage,
    isPending: isPendingSendMessage,
    isError: isErrorSendMessage,
  } = useSendMessage();

  const { mutate: archiveCase } = useArchiveCase();

  const handleArchiveCase = () => {
    archiveCase(id as string);
  };

  const handleSendMessage = () => {
    const newMessage: Message[] = [
      ...messages,
      {
        id: Math.floor(Math.random() * 1000000),
        content: message,
        created_at: new Date().toISOString(),
        sender_name: user?.name,
      },
    ];
    setMessages(newMessage);
    setMessage("");
    sendMessage({ idCase: id as string, message });
  };

  const sections = [
    {
      items: [
        {
          id: "close",
          label: "Archivar caso",
          icon: <ArchiveBoxIcon className="size-4 text-slate-500" />,
          onClick: handleArchiveCase,
        },
      ],
    },
  ];
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

  useSocketMessages(user?.id, (data) => {
    console.log("📩 Nuevo mensaje recibido:", data);
    const newMessage: Message[] = [
      ...messages,
      {
        id: Math.floor(Math.random() * 1000000),
        content: data.content,
        created_at: new Date().toISOString(),
        sender_name: data.sender_name,
      },
    ];
    setMessages(newMessage);
    // Aquí puedes hacer: actualizar mensajes, notificaciones, etc.
  });

  useEffect(() => {
    if (isErrorSendMessage) {
      ToastManager.error(
        "Error al enviar el mensaje",
        "Sucedio un error inesperado, por favor intenta nuevamente. Si el error persiste, contacta al administrador o soporte."
      );
    }
  }, [isErrorSendMessage]);

  useEffect(() => {
    if (!isPending && data?.data?.case) {
      const lawyerId = data.data.case.service.lawyer_id?.toString();
      if (lawyerId) {
        setLawyerId(lawyerId);
        refetchLawyer();
      }
    }
  }, [isPending, data]);

  useEffect(() => {
    console.log(lawyer);
  }, [lawyer]);

  if (isPending || isPendingAttachments) return <ViewCaseLoaderState />;
  if (isPendingLawyer && lawyerId) return <ViewCaseLoaderState />;
  if (isError || isErrorAttachments) {
    return (
      <CustomStatusState
        title="Error al cargar el caso"
        message="Sucedió un error inesperado, por favor intenta nuevamente. Si el error persiste, contacta al administrador o soporte."
        icon={<ExclamationCircleIcon className="size-10 text-slate-300 mb-2" />}
      />
    );
  }
  if (isErrorLawyer && lawyerId) {
    return (
      <CustomStatusState
        title="Error al cargar el abogado"
        message="Sucedió un error inesperado, por favor intenta nuevamente. Si el error persiste, contacta al administrador o soporte."
      />
    );
  }

  const caseData = data?.data?.case;

  if (!caseData) {
    return (
      <CustomStatusState
        title="Caso no encontrado"
        message="No se pudo encontrar la información del caso solicitado."
        icon={<ExclamationCircleIcon className="size-10 text-slate-300 mb-2" />}
      />
    );
  }

  const chatProps: ChatbotProps = {
    name: "Asistente Legal",
    title: "¿Cómo puedo ayudarte?",
    you: "Tú",
    context:
      JSON.stringify(caseData) +
      JSON.stringify(lawyer) +
      JSON.stringify(attachments) +
      JSON.stringify(messages), // ¡Nuevo!

    questions: {
      question1: "¿Qué documentos necesito?",
      question2: "¿Cuáles son mis derechos?",
      question3: "¿Cómo procedo legalmente?",
    },
  };

  const urgencyDisplay = getUrgencyDisplay(caseData.urgency);

  return (
    <div className="min-h-screen">
      <div
        className={twMerge(
          "flex flex-col h-[800px] mx-auto w-full px-4",
          lawyer && lawyerId ? "max-w-6xl" : "max-w-4xl"
        )}
      >
        <CustomHeader
          onBack={onBack}
          title={caseData.title}
          action={
            <CustomDropdown
              buttonIcon={
                <EllipsisVerticalIcon className="size-5 text-slate-500" />
              }
              buttonClassName="w-full bg-white w-full shadow hover:shadow-md p-2.5 rounded-md"
              sections={sections}
              position="right"
            />
          }
        />

        <div
          className={twMerge(
            "grid flex-1 grid-cols-1  gap-2",
            lawyer && lawyerId ? "lg:grid-cols-[auto_400px]" : ""
          )}
        >
          <div className="flex flex-col h-full">
            <div className="shadow hover:shadow-md bg-white w-full p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <HashtagIcon className="size-4 text-slate-500" />
                  <h3 className="text-slate-900 font-medium text-sm">
                    Identificador
                  </h3>
                </div>
                <p className="text-sm text-slate-500">
                  {caseData.reference_code}
                </p>
              </div>

              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <ClockIcon className="size-4 text-slate-500" />
                  <h3 className="text-slate-900 font-medium text-sm">
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
                  <CalendarDaysIcon className="size-4 text-slate-500" />
                  <h3 className="text-slate-900 font-medium text-sm">
                    Fecha de inicio
                  </h3>
                </div>
                <p className="text-sm text-slate-500">
                  {formatDate(caseData.created_at)}
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <TagIcon className="size-4 text-slate-500" />
                  <h3 className="text-slate-900 font-medium text-sm">
                    Categoria
                  </h3>
                </div>
                <p className="text-sm text-slate-500">
                  {caseData.category?.name}
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 w-[130px]">
                  <SignalIcon className="size-4 text-slate-500" />
                  <h3 className="text-slate-900 font-medium text-sm">Estado</h3>
                </div>
                <p className="text-xs text-green-700 px-2 py-1 rounded-md bg-green-100 uppercase font-medium">
                  {caseData.status?.name}
                </p>
              </div>
              {lawyer && lawyerId && (
                <div className="flex items-center justify-start gap-2">
                  <div className="flex items-center gap-2 w-[130px]">
                    <UserIcon className="size-4 text-slate-500" />
                    <h3 className="text-slate-900 font-medium text-sm">
                      Abogado
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <CustomAvatar
                      username={lawyer?.data?.firstName}
                      avatar={lawyer?.data?.profilePicture}
                      size={"1.5rem"}
                    ></CustomAvatar>
                    <p className="text-sm text-slate-500">
                      {lawyer?.data?.firstName} {lawyer?.data?.lastName}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2 shadow hover:shadow-md bg-white w-full py-4 rounded-md">
              <div className="flex items-center justify-between gap-2 px-4">
                <div className="flex items-center gap-2">
                  <PaperClipIcon className="size-4 text-slate-900" />
                  <h3 className="text-slate-900 font-medium text-sm">
                    Archivos adjuntos
                  </h3>
                  <span className="text-xs text-slate-500">
                    ({attachments?.data?.attachments?.length || 0})
                  </span>
                </div>
              </div>
              <div className="mt-4 ">
                {!attachments?.data?.attachments?.length ? (
                  <div className="px-4">
                    <div className="flex items-center justify-center flex-col w-full h-full bg-slate-50 border-slate-200 border rounded-md p-4">
                      <DocumentMinusIcon className="size-6 text-slate-500" />
                      <p className="text-sm text-slate-500 text-center mt-2 font-medium">
                        No hay archivos adjuntos
                      </p>
                    </div>
                  </div>
                ) : (
                  <Scrollbars
                    style={{ width: "100%", height: "80px" }}
                    autoHide={true}
                  >
                    <div className="w-full max-w-[900px] md:max-w-[720px] px-4">
                      <div
                        className="flex items-center gap-2"
                        style={{ minWidth: "max-content" }}
                      >
                        {attachments.data.attachments.map(
                          (attachment: Attachment) => {
                            const extension = getFileExtension(attachment.url);

                            return (
                              <button
                                onClick={() => handleViewAttachment(attachment)}
                                key={attachment.id}
                                className="flex p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors border border-slate-100 w-[300px] flex-shrink-0"
                              >
                                <div className="flex items-center justify-start gap-3">
                                  <div className="flex-shrink-0">
                                    <div className="size-10 bg-slate-100 rounded-md flex items-center justify-center">
                                      <FileIcon fileType={extension} />
                                    </div>
                                  </div>
                                  <div className="flex flex-col w-full min-w-0 justify-start">
                                    <p className="text-sm font-medium text-slate-900 truncate w-full text-left">
                                      {attachment.label}
                                    </p>
                                    {attachment.description && (
                                      <p className="text-xs text-slate-500 truncate w-full text-left">
                                        {attachment.description}
                                      </p>
                                    )}
                                    <p className="text-xs text-slate-400 w-full text-left">
                                      {extension.toUpperCase()} •{" "}
                                      {formatDate(attachment.created_at)}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </Scrollbars>
                )}
              </div>
            </div>
            <div className="mt-2 shadow hover:shadow-md bg-white w-full p-4 rounded-md h-full flex flex-col">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="size-4 text-slate-900" />
                <h3 className="text-slate-900 font-medium text-sm">
                  Descripción
                </h3>
              </div>
              <div className="bg-slate-50 mt-2 border border-slate-100 rounded-md w-full text-sm text-slate-700 p-4 h-full">
                <div
                  className={`${s.richTextContent} prose`}
                  dangerouslySetInnerHTML={{ __html: caseData.description }}
                />
              </div>
            </div>
          </div>
          {lawyer && lawyerId && (
            <div className="h-full grid grid-rows-[auto_1fr_auto]">
              <div className="shadow hover:shadow-md bg-white w-full px-4 py-2 rounded-md">
                <h2 className="text-slate-900 font-semibold text-base">
                  Mensajes
                </h2>
              </div>
              <div className="shadow hover:shadow-md bg-white w-full p-4 rounded-md mt-2">
                {(!caseData.service?.messages ||
                  caseData.service.messages.length === 0) &&
                messages.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center gap-2 w-full">
                      <span className="flex-1 h-[1px] bg-slate-200"></span>
                      <p className="text-xs text-slate-500 italic text-center whitespace-nowrap px-1">
                        No hay mensajes aún
                      </p>
                      <span className="flex-1 h-[1px] bg-slate-200"></span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {(caseData.service?.messages || []).map(
                      (message: Message, index: number) => (
                        <div
                          key={index}
                          className=" border-slate-100  last:border-b-0 bg-slate-50 p-4 rounded-md mt-2 border"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-slate-900">
                              {message.sender_name || "Usuario"}
                            </span>
                            <span className="text-xs text-slate-500">
                              {formatDate(message.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700">
                            {message.content}
                          </p>
                        </div>
                      )
                    )}
                    {messages.map((message: Message, index: number) => (
                      <div
                        key={index}
                        className=" border-slate-100  last:border-b-0 bg-slate-50 p-4 rounded-md mt-2 border"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-slate-900">
                            {message.sender_name || "Usuario"}
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatDate(message.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">
                          {message.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-[auto_100px] mt-2 items-center gap-2 w-full">
                <CustomInput
                  placeholder="Agrega un comentario"
                  className="ring-0 py-2.5 flex shadow hover:shadow-md"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <PrimaryButton
                  className="gap-2 py-2.5"
                  onClick={handleSendMessage}
                  loader={isPendingSendMessage}
                  disabled={isPendingSendMessage || !message}
                >
                  <PaperAirplaneIcon className="size-4 text-white" />
                  Enviar
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </div>

      <FileViewer
        file={selectedFileData}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        canDownload={false}
      />

      <Chatbot props={chatProps} />
    </div>
  );
}
