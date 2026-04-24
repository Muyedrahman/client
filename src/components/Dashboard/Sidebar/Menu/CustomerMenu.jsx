import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { MdAddComment } from 'react-icons/md'

const CustomerMenu = () => {


  return (
    <>
    
      <MenuItem icon={BsFingerprint} label='My Donation Request' address='my-donation-request' />

   <MenuItem
        icon={MdAddComment }
        label='Create-Donation'//Add Plant
        address='add-plant'
      />
     
    </>
  )
}

export default CustomerMenu
// EXXXXXXXXXXX