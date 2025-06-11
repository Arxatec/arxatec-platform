import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ClipboardDocumentIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { PrimaryButton } from "~/components/atoms";
import FacebookIcon from "~/assets/images/social/facebook.png";
import LinkedinIcon from "~/assets/images/social/linkedin.png";
import WhatsAppIcon from "~/assets/images/social/whatsapp.png";
import TelegramIcon from "~/assets/images/social/telegram.png";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ModalShare: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <Dialog as="div" className="relative z-50" open={open} onClose={setOpen}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <XMarkIcon className="size-5 text-gray-800" />
              </button>
              <div className=" flex size-10 items-center justify-center rounded-full bg-blue-100">
                <ShareIcon
                  aria-hidden="true"
                  className="size-5 text-blue-600"
                />
              </div>
              <div className="text-left mt-3">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Compartir publicación
                </DialogTitle>
                <div className="mt-1">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur amet labore.
                  </p>
                </div>
                <div className="mt-5">
                  <PrimaryButton className="w-full mt-2 bg-white border-gray-200 border text-sm text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50">
                    <img src={FacebookIcon} alt="Facebook" className="size-5" />
                    Compartir en Facebook
                  </PrimaryButton>
                  <PrimaryButton className="w-full mt-2 bg-white border-gray-200 border text-sm text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50">
                    <img src={LinkedinIcon} alt="Linkedin" className="size-5" />
                    Compartir en LinkedIn
                  </PrimaryButton>
                  <PrimaryButton className="w-full mt-2 bg-white border-gray-200 border text-sm text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50">
                    <img
                      src={TelegramIcon}
                      alt="Instagram"
                      className="size-5"
                    />
                    Compartir en Telegram
                  </PrimaryButton>
                  <PrimaryButton className="w-full mt-2 bg-white border-gray-200 border text-sm text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50">
                    <img src={WhatsAppIcon} alt="WhatsApp" className="size-5" />
                    Compartir en WhatsApp
                  </PrimaryButton>
                </div>
                <div className="my-3 flex items-center justify-center gap-2">
                  <span className="flex w-full h-px bg-gray-200"></span>
                  <span className="text-sm text-gray-500">o</span>
                  <span className="flex w-full h-px bg-gray-200"></span>
                </div>
                <div className="flex px-4 py-2 bg-gray-100 rounded-lg relative">
                  <input
                    type="text"
                    placeholder="URL"
                    value="https://www.google.com"
                    className="w-full outline-none text-sm text-gray-900 bg-transparent"
                  />
                  <button className=" flex items-center justify-center bg-white border-gray-200 border px-3 py-1.5 text-gray-900 text-xs rounded-lg  absolute top-1 bottom-1 my-auto right-1 gap-2 hover:bg-gray-50">
                    <ClipboardDocumentIcon className="size-4 text-gray-900" />
                    Copiar
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
