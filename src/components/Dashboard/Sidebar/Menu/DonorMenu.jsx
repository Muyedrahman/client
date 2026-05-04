import { BsSendPlusFill, BsListUl, BsCashStack, BsFillSendPlusFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { FaEdit } from "react-icons/fa";

const DonorMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillSendPlusFill}
        label="Create Donation Request"
        address="/dashboard/create-donation-request"
      />
      <MenuItem
        icon={BsListUl}
        label="My Donation Requests"
        address="/dashboard/my-donation-requests"
      />
      <MenuItem
        icon={BsCashStack}
        label="Funding"
        address="/dashboard/funding"
      />
    </>
  );
};

export default DonorMenu;
