import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomSelector } from "~/components/atoms";
import { LANG, useLanguageHelper } from "~/lang/lang_enum";

export const LanguageSelector = () => {
  const { getLangLocaleKey } = useLanguageHelper();
  const languages = [
    { name: getLangLocaleKey(LANG.ES), id: LANG.ES },
    { name: getLangLocaleKey(LANG.EN), id: LANG.EN },
    { name: getLangLocaleKey(LANG.QU), id: LANG.QU },
  ];
  const [selected, setSelected] = useState(languages[0]);
  const { i18n } = useTranslation();

  const handleOnChangeSelector = (select: { name: string; id: LANG }) => {
    i18n.changeLanguage(select.id);
    setSelected(select);
  };

  return (
    <div className="flex items-center justify-end w-full py-2">
      <CustomSelector
        options={languages}
        selected={selected}
        onChange={handleOnChangeSelector}
        buttonWidth="w-[150px]"
      />
    </div>
  );
};
