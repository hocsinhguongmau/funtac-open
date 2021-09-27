import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <ul className='flex'>
      <li className='mr-6'>
        <Link className='text-blue-500 hover:text-blue-800' to='/'>
          blogs
        </Link>
      </li>
      <li className='mr-6'>
        <Link className='text-blue-500 hover:text-blue-800' to='/create'>
          create blogs
        </Link>
      </li>
      <li className='mr-6'>
        <Link className='text-blue-500 hover:text-blue-800' to='/users'>
          users
        </Link>
      </li>
    </ul>
  )
}
