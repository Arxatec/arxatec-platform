import { useState } from "react";
import type { User, MediaItem } from "../../types";
import { ChatArea, InfoPanel, SidebarChats } from "../organism";

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<User | null>(null);
  const [openInfo, setOpenInfo] = useState(false);

  const handleOpenInfo = () => setOpenInfo(!openInfo);

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: "image",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/legal-document-1.png",
    },
    {
      id: 2,
      type: "document",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/contract-template.pdf",
    },
  ];

  const users: User[] = [
    {
      id: 1,
      name: "Contratos laborales",
      avatar:
        "https://images.pexels.com/photos/4427816/pexels-photo-4427816.jpeg",
      isGroup: true,
      members: 3,
      online: 2,
      description: "Clientes con consultas sobre contratos laborales.",
    },
    {
      id: 2,
      name: "María López",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      isGroup: false,
      members: 1,
      online: 1,
      description: "Cliente con caso de despido improcedente",
    },
    {
      id: 3,
      name: "Juan Rodríguez",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      isGroup: false,
      members: 1,
      online: 0,
      description: "Cliente con consulta sobre herencia",
    },
    {
      id: 4,
      name: "Ana García",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      isGroup: false,
      members: 1,
      online: 1,
      description: "Cliente con caso de divorcio",
    },
    {
      id: 5,
      name: "Pedro Martínez",
      avatar:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
      isGroup: false,
      members: 1,
      online: 1,
      description: "Cliente con consulta sobre propiedad intelectual",
    },
    {
      id: 6,
      name: "Derecho Familiar",
      avatar:
        "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg",
      isGroup: true,
      members: 4,
      online: 3,
      description: "Grupo de consultas sobre derecho familiar",
    },
    {
      id: 7,
      name: "Laura Sánchez",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      isGroup: false,
      members: 1,
      online: 0,
      description: "Cliente con caso de accidente laboral",
    },
    {
      id: 8,
      name: "Roberto Torres",
      avatar:
        "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg",
      isGroup: false,
      members: 1,
      online: 1,
      description: "Cliente con consulta sobre arrendamiento",
    },
    {
      id: 9,
      name: "Carmen Ruiz",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      isGroup: false,
      members: 1,
      online: 1,
      description: "Cliente con caso de reclamación bancaria",
    },
    {
      id: 10,
      name: "Derecho Mercantil",
      avatar:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      isGroup: true,
      members: 5,
      online: 4,
      description: "Consultas sobre derecho mercantil y empresarial",
    },
  ];

  const chatData = [
    {
      userId: 1,
      messages: [
        {
          id: 1,
          content:
            "Buenos días, necesito asesoría sobre mi contrato laboral. Me han modificado las condiciones sin consultarme.",
          timestamp: "09:00 AM",
          sender: "Elena Vega",
        },
        {
          id: 2,
          content:
            "Buenos días Elena. Por favor, cuéntame qué modificaciones han realizado y desde cuándo.",
          timestamp: "09:05 AM",
          sender: "You",
        },
        {
          id: 3,
          content:
            "Han cambiado mi horario y reducido mi salario un 15%, argumentando dificultades económicas. No me lo notificaron por escrito.",
          timestamp: "09:08 AM",
          sender: "Elena Vega",
        },
        {
          id: 4,
          content:
            "¿Tienes una copia de tu contrato original? También necesitaría saber cuándo se produjeron estos cambios exactamente.",
          timestamp: "09:10 AM",
          sender: "You",
        },
        {
          id: 5,
          content:
            "Sí, aquí está el contrato. Los cambios empezaron hace dos semanas.",
          timestamp: "09:15 AM",
          sender: "Elena Vega",
          attachments: [
            {
              type: "document",
              url: "https://example.com/contract.pdf",
            },
          ],
        },
        {
          id: 6,
          content:
            "Estos cambios constituyen una modificación sustancial de las condiciones de trabajo. Tienes varias opciones legales: puedes aceptar, rescindir el contrato con indemnización, o impugnar la decisión.",
          timestamp: "09:20 AM",
          sender: "You",
        },
      ],
    },
    {
      userId: 2,
      messages: [
        {
          id: 1,
          content:
            "Hola, me han despedido sin justificación después de 5 años en la empresa.",
          timestamp: "11:30 AM",
          sender: "María López",
        },
        {
          id: 2,
          content:
            "Lamento escuchar eso, María. ¿Te entregaron carta de despido? ¿Qué motivos alegaron?",
          timestamp: "11:32 AM",
          sender: "You",
        },
        {
          id: 3,
          content:
            "Sí, aquí está la carta. Alegan bajo rendimiento, pero nunca tuve evaluaciones negativas.",
          timestamp: "11:35 AM",
          sender: "María López",
          attachments: [
            {
              type: "document",
              url: "https://example.com/dismissal-letter.pdf",
            },
          ],
        },
        {
          id: 4,
          content:
            "Tras revisar la carta, veo indicios claros de despido improcedente. ¿Tienes evaluaciones de desempeño anteriores?",
          timestamp: "11:40 AM",
          sender: "You",
        },
        {
          id: 5,
          content:
            "Sí, todas mis evaluaciones fueron positivas en los últimos años.",
          timestamp: "11:42 AM",
          sender: "María López",
        },
        {
          id: 6,
          content:
            "Podemos impugnar el despido. Tienes 20 días hábiles para presentar la demanda. Te propongo preparar la documentación necesaria.",
          timestamp: "11:45 AM",
          sender: "You",
        },
      ],
    },
    {
      userId: 3,
      messages: [
        {
          id: 1,
          content:
            "Necesito ayuda con el testamento de mi padre. Falleció hace un mes y hay disputas familiares.",
          timestamp: "14:00 PM",
          sender: "Juan Rodríguez",
        },
        {
          id: 2,
          content:
            "Siento tu pérdida, Juan. ¿Tu padre dejó un testamento formal? ¿Quiénes son los herederos?",
          timestamp: "14:05 PM",
          sender: "You",
        },
        {
          id: 3,
          content:
            "Gracias. Sí, hay un testamento de hace 5 años. Somos tres hermanos, pero uno dice que hubo un testamento posterior.",
          timestamp: "14:10 PM",
          sender: "Juan Rodríguez",
        },
        {
          id: 4,
          content:
            "¿Podrías compartir el testamento que tienes? También necesitaremos solicitar información al Registro de Últimas Voluntades.",
          timestamp: "14:15 PM",
          sender: "You",
        },
        {
          id: 5,
          content: "Aquí está el testamento que tengo.",
          timestamp: "14:20 PM",
          sender: "Juan Rodríguez",
          attachments: [
            {
              type: "document",
              url: "https://example.com/testament.pdf",
            },
          ],
        },
      ],
    },
    {
      userId: 4,
      messages: [
        {
          id: 1,
          content:
            "Quiero iniciar los trámites de divorcio. No sé por dónde empezar.",
          timestamp: "16:00 PM",
          sender: "Ana García",
        },
        {
          id: 2,
          content:
            "Te ayudo con el proceso, Ana. ¿Es un divorcio de mutuo acuerdo o contencioso? ¿Hay hijos menores?",
          timestamp: "16:05 PM",
          sender: "You",
        },
        {
          id: 3,
          content:
            "Tenemos dos hijos de 7 y 9 años. Mi marido está de acuerdo con el divorcio, pero no con la custodia.",
          timestamp: "16:10 PM",
          sender: "Ana García",
        },
        {
          id: 4,
          content:
            "Entiendo. En estos casos, lo principal es establecer un convenio regulador. ¿Han discutido la posibilidad de custodia compartida?",
          timestamp: "16:15 PM",
          sender: "You",
        },
        {
          id: 5,
          content:
            "Él quiere custodia compartida, pero su trabajo implica muchos viajes. No creo que sea lo mejor para los niños.",
          timestamp: "16:20 PM",
          sender: "Ana García",
        },
      ],
    },
    {
      userId: 5,
      messages: [
        {
          id: 1,
          content:
            "He descubierto que están usando mi software sin licencia. Quiero tomar acciones legales.",
          timestamp: "10:00 AM",
          sender: "Pedro Martínez",
        },
        {
          id: 2,
          content:
            "¿Tienes registrada la propiedad intelectual del software? ¿Puedes demostrar la infracción?",
          timestamp: "10:05 AM",
          sender: "You",
        },
        {
          id: 3,
          content:
            "Sí, está registrado. Tengo capturas de pantalla y logs que demuestran el uso no autorizado.",
          timestamp: "10:10 AM",
          sender: "Pedro Martínez",
          attachments: [
            {
              type: "document",
              url: "https://example.com/evidence.zip",
            },
          ],
        },
        {
          id: 4,
          content:
            "Bien. Podemos enviar un requerimiento de cese y desistimiento como primer paso. Si no responden, procederemos con la demanda.",
          timestamp: "10:15 AM",
          sender: "You",
        },
      ],
    },
    {
      userId: 6,
      messages: [
        {
          id: 1,
          content:
            "Necesito información sobre adopción internacional. ¿Qué países recomiendan?",
          timestamp: "13:00 PM",
          sender: "Isabel Méndez",
        },
        {
          id: 2,
          content:
            "La adopción internacional requiere cumplir requisitos específicos. ¿Son pareja o persona individual? ¿Qué edad tienen?",
          timestamp: "13:05 PM",
          sender: "You",
        },
        {
          id: 3,
          content:
            "Somos matrimonio, 35 y 37 años. Nos interesan países latinoamericanos.",
          timestamp: "13:10 PM",
          sender: "Isabel Méndez",
        },
        {
          id: 4,
          content:
            "Colombia y Chile tienen buenos convenios con España. El proceso suele durar entre 18-24 meses. ¿Quieren que revisemos los requisitos específicos?",
          timestamp: "13:15 PM",
          sender: "You",
        },
      ],
    },
    {
      userId: 7,
      messages: [
        {
          id: 1,
          content:
            "Tuve un accidente en el trabajo. La empresa dice que fue mi culpa.",
          timestamp: "15:30 PM",
          sender: "Laura Sánchez",
        },
        {
          id: 2,
          content:
            "¿Cuándo ocurrió el accidente? ¿Hay informe médico y de prevención de riesgos?",
          timestamp: "15:35 PM",
          sender: "You",
        },
        {
          id: 3,
          content:
            "Hace una semana. Aquí están los informes y fotos del lugar del accidente.",
          timestamp: "15:40 PM",
          sender: "Laura Sánchez",
          attachments: [
            {
              type: "document",
              url: "https://example.com/accident-report.pdf",
            },
          ],
        },
        {
          id: 4,
          content:
            "Veo deficiencias en las medidas de seguridad. Podemos reclamar a la mutua y solicitar una investigación de la Inspección de Trabajo.",
          timestamp: "15:45 PM",
          sender: "You",
        },
      ],
    },
    {
      userId: 8,
      messages: [
        {
          id: 1,
          content: "Mi casero quiere subir el alquiler un 30%. ¿Es legal?",
          timestamp: "12:00 PM",
          sender: "Roberto Torres",
        },
        {
          id: 2,
          content:
            "¿Cuándo firmaste el contrato y qué dice sobre las actualizaciones de renta?",
          timestamp: "12:05 PM",
          sender: "You",
        },
        {
          id: 3,
          content: "Hace dos años. Aquí está el contrato.",
          timestamp: "12:10 PM",
          sender: "Roberto Torres",
          attachments: [
            {
              type: "document",
              url: "https://example.com/rental-agreement.pdf",
            },
          ],
        },
        {
          id: 4,
          content:
            "La subida está limitada por ley. Solo puede incrementar según el IPC. Te preparo un escrito para responder.",
          timestamp: "12:15 PM",
          sender: "You",
        },
      ],
    },
  ];
  return (
    <div
      style={{ height: "calc(100vh - 144px)" }}
      className="flex w-full h-screen rounded-md mx-auto max-w-7xl text-gray-700"
    >
      <SidebarChats
        users={users}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatArea
        messages={
          chatData.find((chat) => chat.userId === selectedChat?.id)?.messages ||
          []
        }
        selectedChat={selectedChat}
        handleOpenInfo={handleOpenInfo}
      />
      {openInfo && <InfoPanel chat={selectedChat} mediaItems={mediaItems} />}
    </div>
  );
}
