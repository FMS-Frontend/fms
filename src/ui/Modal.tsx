import {
  cloneElement,
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import CloseButton from "./CloseButton";
import useOutsideClick from "../hooks/useOutsideClick";

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  children: ReactNode;
  opens: string;
}

interface WindowProps {
  children: ReactNode | ((props: { onClose: () => void }) => ReactNode);
  name: string;
}

interface ModalContextType {
  openModal: (name: string) => void;
  close: () => void;
  openName: string;
}

interface ModalType extends FC<ModalProps> {
  Open: FC<OpenProps>;
  Window: FC<WindowProps>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const Modal: ModalType = ({ children }) => {
  const [openName, setOpenName] = useState<string>("");
  const close = () => setOpenName("");
  const openModal = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openModal, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: FC<OpenProps> = ({ children, opens: opensModalName }) => {
  const context = useContext(ModalContext);

  // Check if context is defined, throw an error if it isn't
  if (!context) {
    throw new Error("Window must be used within a Modal");
  }

  const { openModal } = context;

  return cloneElement(children as ReactElement, {
    onClick: () => openModal(opensModalName),
  });
};

const Window: FC<WindowProps> = ({ children, name }) => {
  const context = useContext(ModalContext);

  // Check if context is defined, throw an error if it isn't
  if (!context) {
    throw new Error("Window must be used within a Modal");
  }

  const { openName, close } = context;

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  const modalContainer = document.querySelector(".modal");

  return modalContainer
    ? createPortal(
        <div className="fixed inset-0 w-full h-screen bg-opacity-40 bg-gray-600 backdrop-blur-sm  z-[1000] transition-all duration-500">
          <div
            ref={ref}
            className="px-20 py-14 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 w-[40rem]"
          >
            <span className="absolute right-12 top-12">
              <CloseButton onClick={close} />
            </span>
            {/* {children({ onClose: close })} */}
            {typeof children === "function"
              ? children({ onClose: close })
              : children}
          </div>
        </div>,
        modalContainer
      )
    : null;
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
