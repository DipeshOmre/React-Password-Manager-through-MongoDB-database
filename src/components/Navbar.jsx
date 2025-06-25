import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='mycontainer flex items-center justify-between px-4 h-14 py-5'
      >

        <div className='logo font-bold text-2xl'>
          <span className='text-green-700'>
            &lt;
          </span>
          Pass
          <span className='text-green-700'>
            OP/&gt;
          </span>
        </div>

        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button className='text-white cursor-pointer'>
          <img className='invert p-5 w-20' src="/public/icons/github.svg" alt="" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
