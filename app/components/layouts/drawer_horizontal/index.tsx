import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import type { ReactNode } from "react";
import Scrollbars from "react-custom-scrollbars-2";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
}
export default function DrawerHorizontal({ open, setOpen, children }: Props) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col p-2">
                <div className="bg-white  shadow-xl h-full rounded-lg overflow-hidden">
                  <Scrollbars autoHide>{children}</Scrollbars>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
