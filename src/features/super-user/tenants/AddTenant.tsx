import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import CreateTenantModal from "./CreateTenantModal";

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
