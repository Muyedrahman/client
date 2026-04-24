import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { MdAddComment } from "react-icons/md";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdAddComment}
        label="Create-Donation" //Add Plant
        address="add-plant"
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label="All-Donation-Request" //Manage Orders
        address="all-users"
      />
    </>
  );
};

export default SellerMenu;
// EXXXXXXXX