import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Listitem } from '../../types/item';

interface Props {
  item: Listitem
  handletoggleItem: (item: Listitem, toSave: boolean) => void
  isDragging: boolean
}

const ListItem:React.FC<Props> = ({ item,handletoggleItem,isDragging }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const {text, save,id} = item;

  const navigate = useNavigate();
  const selectedItem = window.location.pathname.includes(`/${text}`);


  const handleClick = () => {
    // navigate(`/${text}`);
  };

  const handleDelete = () => {
  }

  return (
    <div 
      onClick={handleClick}
      className={classNames({'border-[1px] border-[#4690E2]': selectedItem},
        "relative h-full gap-2 hover:bg-[#F1F5F8] flex items-center py-[15px] pl-[20px] pr-[20px]  group"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex gap-1'>
        <img src="src/assets/window.svg" alt="" className='w-[16px]' />
        {!save && (<div>{text}</div>) }
      </div>

      <img 
        src='src/assets/close.svg' 
        alt=""  
        className="absolute right-[2px] top-[15px] hidden group-hover:inline z-10" 
        onClick={handleDelete}
      />
      
      {isHovered && !isDragging && (
        <div 
          className='flex items-center gap-1 absolute w-full left-0 bottom-[-44px] h-[44px] hover:cursor-pointer border-[1px] border-[#7B7F9112] rounded-md'
          onClick={() => handletoggleItem(item, !save)}
        >
          <img src="src/assets/pin.svg" alt=""  className='w-[16px] h-[16px]'/>
          {save ? 'unpin': 'pin'}
        </div>
      )}
    </div>
  );
};

export default ListItem;  