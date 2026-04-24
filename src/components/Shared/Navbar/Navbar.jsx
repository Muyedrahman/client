import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo (1).png'
import axios from 'axios'
const Navbar = () => {
  const { user, logOut,setLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState([]);
  const [image ,setImage ]=useState({})
   // 🔹 get users from backend
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        const result =data.map(d=>setImage(d.image))
        setUsers(data); // 🔥 dynamic data
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getUsers();
  }, []);
console.log(image)
  return (
<div className='fixed w-full bg-white z-10 shadow-sm'>
  <div className='py-4'>
    <Container>
      <div className='flex items-center justify-between'>
        
        {/* LEFT: Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <img className='rounded-full' src={logo} alt='logo' md:width='200' md:height='100' />
       
        </Link>

        {/* RIGHT: Links + Dropdown */}
        <div className='flex items-center gap-6'>
          
          {/* RIGHT SIDE MAIN LINKS (Desktop Only) */}
          <div className='hidden md:flex items-center gap-6 text-base font-semibold'>
            <Link to='/donation-request' className='hover:text-red-600 transition'>
              Donation Request
            </Link>
            <Link to='/search-page' className='hover:text-red-600 transition'>
              Search Page 
            </Link>

            {user && (
              <Link to='/founding' className='hover:text-red-600 transition'>
                Funding
              </Link>
            )}

            <Link to='/blog' className='hover:text-red-600 transition'>
              Blog
            </Link>
          </div>

          {/* DROPDOWN MENU */}
          <div className='relative'>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className='p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
            >
              <AiOutlineMenu />
              <div className='hidden md:block'>
                <img
                  className='rounded-full'
                  referrerPolicy='no-referrer'
                  src={user?.photoURL ? user?.photoURL || image: avatarImg}
                  // src={users? users?.image || user?.image :avatarImg  }
                  alt='profile'
                  height='30'
                  width='30'
                />
              </div>
            </div>

            {/* Dropdown Items */}
            {isOpen && (
              <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer '>
                  
                  {/* Mobile-only links */}
                  <Link
                    to='/'
                    className='block md:hidden px-4 py-3  transition  hover:text-white hover:bg-red-500 hover:rounded-md font-bold'
                  >
                    Home
                  </Link>

                  <Link
                    to='/donation-request'
                    className='block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md'
                  >
                    Donation Request
                  </Link>
                  <Link
                    to='/search-page'
                    className='block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md'
                  >
                    Search Page
                  </Link>

                  {user && (
                    <Link
                      to='/founding'
                      className='block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md'
                    >
                      Funding
                    </Link>
                  )}

                  <Link
                    to='/blog'
                    className='block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md'
                  >
                    Blog
                  </Link>

                  {/* Auth Options */}
                  {user ? (
                    <>
                      <Link
                        to='/dashboard'
                        className='px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md'
                      >
                        Dashboard
                      </Link>

                      <div
                        onClick={logOut}
                        className='px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md cursor-pointer'
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to='/login'
                        className='px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md '
                      >
                        Login
                      </Link>

                      <Link
                        to='/signup'
                        className='px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md'
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  </div>
</div>



  )
}

export default Navbar
