import { CustomInput } from "~/components/atoms";
import { Multimedia, SaveLinks, Tabs } from "../../molecules";
import { useState } from "react";
import { TextRich } from "~/components/organisms";

const CreatePostForm = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const tabs = [
    {
      name: "Texto",
      component: (
        <div className="mt-2">
          <label
            htmlFor="content"
            className="text-sm font-medium text-gray-900"
          >
            Contenido de la publicación
          </label>
          <TextRich
            value={content}
            onChange={setContent}
            minHeight="250px"
            maxHeight="600px"
            className="mt-2"
            showHeadingSelector={false}
            showAlignmentMenu={false}
            showColorMenu={false}
            showHighlightMenu={false}
            showListMenu={false}
            showImageMenu={false}
            showLinkMenu={false}
            showTableMenu={false}
            showYoutubeMenu={false}
            showFontSelector={false}
          />
        </div>
      ),
    },
    { name: "Multimedia", component: <Multimedia /> },
    { name: "Enlace", component: <SaveLinks /> },
  ];

  return (
    <>
      <Tabs
        tabs={tabs}
        selectedTab={tabs[selectedTab]}
        setSelectedTab={(tab) =>
          setSelectedTab(tabs.findIndex((t) => t.name === tab.name))
        }
      />
      <div className="grid gap-4 mt-4">
        <CustomInput
          label="Título de la publicación"
          type="text"
          placeholder="Ej. Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {tabs[selectedTab].component}
      </div>
    </>
  );
};

export default CreatePostForm;
