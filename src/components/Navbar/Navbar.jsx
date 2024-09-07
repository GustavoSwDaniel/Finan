import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Company' },
    { id: 3, text: 'Resources' },
    { id: 4, text: 'About' },
    { id: 5, text: 'Contact' },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-24  mx-auto px-4 text-white'>
      <a href="/">
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>ADMINISTRATIVO.</h1>
      </a>
    </div>
  );
};

export default Navbar;