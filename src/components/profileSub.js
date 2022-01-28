import React from 'react';

const ProfileSub = ({text, subtext, icon, onClick}) => {
  return (
  <div className='flex border items-center border-gray-300 rounded-md py-2 px-5 hover:bg-gray-100 cursor-pointer h-full' onClick={onClick}>
    <div className='bg-amazon_blue-light p-2 mr-3 rounded-full w-15 h-15'>
      {icon}
    </div>
  <div>
  <p>{text}</p>
  <p className='text-gray-500'>{subtext}</p>
  </div>
  </div>
  )
  ;
};

export default ProfileSub;
