import { DocumentPlusIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { PrimaryButton } from "~/components/atoms";
import { useCreateArticleMutation } from "../../services/mutations";
import { useArticleForm } from "../../hooks/useArticleForm";
import { TitleInput } from "../fields/TitleInput";
import { CategorySelector } from "../fields/CategorySelector";
import { BannerUploader } from "../fields/BannerUploader";
import { ContentEditor } from "../fields/ContentEditor";
import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useLocation } from "wouter";
import { APP_PATHS } from "~/routes/routes";

export default function CreateArticlePage() {
  const {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    reset,
  } = useArticleForm();
  const { changeTitle } = useTitle();
  const [location, setLocation] = useLocation();
  const mutation = useCreateArticleMutation();

  const onBack = () => setLocation(APP_PATHS.ARTICLES);

  const onSubmit = (formData: typeof form) => {
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("categoryId", String(formData.category?.id));
    fd.append("banner", formData.banner!);
    fd.append(
      "content",
      new Blob([formData.content], { type: "text/html" }),
      "index.html"
    );
    mutation.mutate(fd, {
      onSuccess: () => {
        reset();
        alert("Artículo creado correctamente");
      },
    });
  };

  useEffect(() => {
    changeTitle("Crear artículo - Arxatec");
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="items-center mb-2 gap-2 grid grid-cols-[40px_1fr_auto]">
        <button
          onClick={onBack}
          className=" bg-white rounded-lg flex items-center justify-center h-full shadow-sm hover:shadow-md  transition-all hover:bg-gray-50"
        >
          <ArrowLeftIcon className="size-4 text-gray-500" strokeWidth={2} />
        </button>
        <div className="bg-white px-4 py-2 w-full h-full rounded-lg flex items-center justify-start shadow-sm hover:shadow-md transition-all">
          <h2 className="text-base font-bold">Crear artículo</h2>
        </div>
        <PrimaryButton className="w-full h-full">
          <DocumentPlusIcon className="size-4 mr-2 text-white" />
          Crear artículo
        </PrimaryButton>
      </div>
      <div className="bg-white rounded-lg p-4 mt-2 space-y-4">
        <TitleInput
          value={form.title}
          onChange={(v) => handleChange("title", v)}
          onBlur={() => handleBlur("title")}
          error={errors.title}
          touched={touched.title}
        />
        <CategorySelector
          value={form.category}
          onChange={(v) => handleChange("category", v)}
          onBlur={() => handleBlur("category")}
          error={errors.category}
          touched={touched.category}
        />
      </div>
      <div className="bg-white rounded-lg p-4 mt-2 space-y-4">
        <BannerUploader
          value={form.banner}
          onChange={(f) => handleChange("banner", f)}
          onBlur={() => handleBlur("banner")}
          error={errors.banner}
          touched={touched.banner}
        />
        <ContentEditor
          value={form.content}
          onChange={(v) => handleChange("content", v)}
          onBlur={() => handleBlur("content")}
          error={errors.content}
          touched={touched.content}
        />
      </div>
    </div>
  );
}
