import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import {
  BotIcon,
  CalendarIcon,
  CheckSquareIcon,
  FolderIcon,
  MessageCircleIcon,
  UserIcon,
} from "lucide-react";
import {
  Client,
  Messages,
  Documents,
  ExternalClient,
  Information,
  Assistant,
} from "..";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCase } from "../../services";
import { useTitle } from "@/hooks/use_title";

interface Props {
  id: string;
}

export const CaseDetail: React.FC<Props> = ({ id }) => {
  const { changeTitle } = useTitle();
  const { data, isPending, isError } = useQuery({
    queryKey: ["case", id],
    queryFn: () => getCase(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      changeTitle(`${data?.title} - Arxatec`);
      return;
    }
    changeTitle("Ver caso - Arxatec");
  }, [data, isPending]);
  return (
    <>
      <Information isPending={isPending} isError={isError} data={data} />
      <div className="mt-4">
        <Tabs defaultValue="documents" className="w-full">
          <TabsList>
            <TabsTrigger value="documents">
              <FolderIcon />
              Documentos
            </TabsTrigger>
            {data?.client_id && (
              <>
                <TabsTrigger value="client">
                  <UserIcon />
                  Cliente
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageCircleIcon />
                  Comunicación
                </TabsTrigger>
              </>
            )}
            {data?.external_client_id && (
              <TabsTrigger value="external_client">
                <UserIcon />
                Cliente externo
              </TabsTrigger>
            )}
            <TabsTrigger value="assistant">
              <BotIcon />
              Asistente
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <CheckSquareIcon />
              Tareas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <Documents id={id} />
          </TabsContent>
          {data?.client_id && (
            <>
              <TabsContent value="messages">
                <Messages id={id} />
              </TabsContent>
              <TabsContent value="client">
                <Client id={data.client_id} />
              </TabsContent>
            </>
          )}
          {data?.external_client_id && (
            <TabsContent value="external_client">
              <ExternalClient id={data.external_client_id} />
            </TabsContent>
          )}
          <TabsContent value="assistant">
            <Assistant />
          </TabsContent>
          <TabsContent value="calendar">
            <h2>Calendario</h2>
          </TabsContent>
          <TabsContent value="tasks">
            <h2>Tareas</h2>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
