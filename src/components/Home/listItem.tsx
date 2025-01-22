import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  text: string
  saved: boolean
}

const ListItem:React.FC<Props> = ({ text,saved }) => {

  const navigate = useNavigate();
  const selectedItem = window.location.pathname.includes(`/${text}`);


  const handleClick = () => {
    navigate(`/${text}`);
  };

  const handleDelete = () => {
  }

  return (
    <div 
      onClick={handleClick}
      className={classNames({'border-[1px] border-[#4690E2]': selectedItem},
        " relative h-full gap-2 hover:bg-[#F1F5F8] flex items-center py-[15px] pl-[20px] pr-[20px]  group"
      )}
      >
      <div className='flex gap-1'>
        <img src="src/assets/window.svg" alt="" className='w-[16px]' />
        {!saved && (<div>{text}</div>) }
      </div>

      {/* This SVG is hidden by default and appears on hover */}
      <img 
        src='src/assets/close.svg' 
        alt=""  
        className="absolute right-[2px] top-[15px] hidden group-hover:inline z-10" 
        onClick={handleDelete}
      />
    </div>
  );
};

export default ListItem;  