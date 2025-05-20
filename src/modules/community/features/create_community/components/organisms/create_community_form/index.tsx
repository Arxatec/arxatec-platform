import { CustomInput, CustomTextArea } from "~/components/atoms";
import { Multimedia, SaveLinks, Tabs } from "../../molecules";
import { useState } from "react";

const tabs = [
  {
    name: "Texto",
    component: (
      <CustomTextArea
        label="Contenido de tu publicación"
        placeholder="Escribe el contenido de tu publicación aquí..."
      />
    ),
  },
  { name: "Multimedia", component: <Multimedia /> },
  { name: "Enlace", component: <SaveLinks /> },
];

export const CreateCommunityForm = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="grid gap-4 mt-4">
        <CustomInput
          label="Título de la publicación"
          type="text"
          placeholder="Ej. Título"
        />
        {selectedTab.component}
      </div>
    </>
  );
};
