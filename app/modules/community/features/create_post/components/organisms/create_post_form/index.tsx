import { CustomInput } from "~/components/atoms";
import { Multimedia, SaveLinks, Tabs } from "../../molecules";
import { useState } from "react";
import BlogEditor from "~/components/organisms/editorRich/BlogEditor";

const CreatePostForm = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const tabs = [
    {
      name: "Texto",
      component: (
        <BlogEditor 
          value={content}
          onChange={setContent}
          minHeight="250px"
          maxHeight="400px"
          className="mt-4"
        />
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
        setSelectedTab={(tab) => setSelectedTab(tabs.findIndex(t => t.name === tab.name))}
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
