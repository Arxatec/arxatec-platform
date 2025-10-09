import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { FolderIcon, MessageCircleIcon } from "lucide-react";
import { Messages, Documents, Information } from "..";
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
            <TabsTrigger value="messages">
              <MessageCircleIcon />
              Comunicación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <Documents id={id} />
          </TabsContent>
          <TabsContent value="messages">
            <Messages id={id} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
