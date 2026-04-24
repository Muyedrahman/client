import { BsSendPlusFill, BsListUl, BsCashStack } from "react-icons/bs";
import MenuItem from "./MenuItem";

const DonorMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsSendPlusFill}
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
