import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import CreateTenantModal from "./CreateTenantModal";

/**
 * AddTenant is a React functional component that renders a button to open
 * a modal for adding a new tenant. It uses a Modal component to handle the
 * display and functionality of the modal window.
 *
 * @component
 * @returns {JSX.Element} The rendered component with a button to add a new tenant.
 *
 * @example
 * return (
 *   <AddTenant />
 * );
 */

const AddTenant: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-tenant">
        <PrimaryButton>
          <FiPlus />
          Add New Tenant
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-tenant">
        <CreateTenantModal />
      </Modal.Window>
    </Modal>
  );
};

export default AddTenant;

// const AddTenant: FC = () => {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

//   return (
//     <>
//       <PrimaryButton onClick={() => setIsOpenModal((show) => !show)}>
//         <FiPlus />
//         Add New Tenant
//       </PrimaryButton>
//       {isOpenModal && (
//         <Modal>
//           <CreateTenant onClose={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// };
