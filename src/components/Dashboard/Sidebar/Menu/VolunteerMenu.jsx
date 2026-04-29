import { BsFillDropletFill, BsCashStack } from "react-icons/bs";
import MenuItem from "./MenuItem";


const VolunteerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillDropletFill}
        label="All Donation Requests"
        address="/dashboard/all-blood-donation-request"
      />
      <MenuItem
        icon={BsCashStack}
        label="Funding"
        address="/dashboard/funding"
      />
    </>
  );
};

export default VolunteerMenu;
