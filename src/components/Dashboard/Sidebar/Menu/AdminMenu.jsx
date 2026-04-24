// import { FaUserCog } from "react-icons/fa";
// import MenuItem from "./MenuItem";
// import { MdOutlineManageHistory } from "react-icons/md";

// const AdminMenu = () => {
//   return (
//     <>
//       <MenuItem icon={FaUserCog} label="All Users" address="all-users" />
//       <MenuItem
//         icon={MdOutlineManageHistory}
//         label="All-Donation-Request"
//         address="all-users"
//       />
//     </>
//   );
// };

// export default AdminMenu;

import {
  BsFillPeopleFill,
  BsFillDropletFill,
  BsCashStack,
} from "react-icons/bs";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillPeopleFill}
        label="All Users"
        address="/dashboard/all-users"
      />
      <MenuItem
        icon={BsFillDropletFill}
        label="All Donation Requests"
        address="/dashboard/all-blood-donation-request"
      />
      <MenuItem
        icon={BsCashStack}
        label="All Funding"
        address="/dashboard/funding"
      />
    </>
  );
};

export default AdminMenu;