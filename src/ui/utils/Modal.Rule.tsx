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
  import useOutsideClick from "../../hooks/useOutsideClick";
  
  interface ModalProps {
    children: ReactNode;
  }
  
  interface OpenProps {
    children: ReactNode;
    opens: string;
  }
  
  interface WindowProps {
    children: ReactNode | ((props: { onClose?: () => void }) => ReactNode);
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
  
  /**
   * Modal component that provides context and methods to manage modals within the application.
   * This component allows nested components to open and close modals using the `ModalContext`.
   *
   * @component
   * @example
   * <Modal>
   *   <Modal.Open opens="exampleModal">
   *     <button>Open Modal</button>
   *   </Modal.Open>
   *   <Modal.Window name="exampleModal">
   *     <div>Modal Content</div>
   *   </Modal.Window>
   * </Modal>
   *
   * @returns {JSX.Element} The rendered Modal component with context provider.
   */
  
  const ModalContext = createContext<ModalContextType | undefined>(undefined);
  
  /**
   * Modal component to manage and provide modal context.
   * It exposes two child components: `Modal.Open` to trigger modal opening,
   * and `Modal.Window` to render the modal content.
   *
   * @param {Object} props - The props for the Modal component.
   * @param {ReactNode} props.children - The child components that are wrapped within the Modal context.
   *
   * @returns {JSX.Element} The rendered Modal context provider.
   */
  
  const Modal2: ModalType = ({ children }) => {
    const [openName, setOpenName] = useState<string>("");
    const close = () => setOpenName("");
    const openModal = (name: string) => setOpenName(name);
  
    return (
      <ModalContext.Provider value={{ openModal, close, openName }}>
        {children}
      </ModalContext.Provider>
    );
  };
  
  /**
   * Open component that triggers the opening of a modal when clicked.
   * It uses the modal context to open a modal with the specified `opens` prop.
   *
   * @param {Object} props - The props for the Open component.
   * @param {ReactNode} props.children - The content that triggers the modal open when clicked.
   * @param {string} props.opens - The name of the modal to open.
   *
   * @returns {JSX.Element} The rendered Open component with a click handler to open the modal.
   */
  
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
  
  /**
   * Window component that renders the modal content if the modal's name matches the open modal name.
   * It uses the modal context to check if the current modal should be opened.
   *
   * @param {Object} props - The props for the Window component.
   * @param {string} props.name - The name of the modal to match.
   * @param {ReactNode | Function} props.children - The content to render inside the modal.
   * @returns {JSX.Element} The rendered modal window content, or null if the modal isn't open.
   */
  
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
              className="px-10 md:px-20 py-14 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 w-11/12 lg:w-1/2 max-h-[95%] overflow-y-auto"
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
  
  Modal2.Open = Open;
  Modal2.Window = Window;
  
  export default Modal2;
  