import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import ListItem from './listItem';
import { Outlet } from 'react-router-dom';
import DropDown from './dropDown';

interface TabItem {
  id: number;
  text: string;
  save: boolean;  // Add privilege property to each item
}

const Home: React.FC = () => {
  const tabsrRef = useRef<HTMLDivElement | null>(null);
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const lol = [
    { id: 1, text: 'lol 1', save: false },
    { id: 2, text: 'lol 2', save: false },
    { id: 6, text: 'lol 4', save: false },
    { id: 7, text: 'lol 5', save: false },
  ];

  useEffect(() => {
    const savedOrder = localStorage.getItem('tabsOrder');
    if (savedOrder) {
      setTabs(JSON.parse(savedOrder));
    } else {
      setTabs(lol);
    }
  }, []);

  useEffect(() => {
    // Sort tabs by privilege with privileged items first
    const sortedTabs = [...tabs].sort((a, b) => b.save ? -1 : 0);

    if (tabsrRef.current) {
      const sortable = new Sortable(tabsrRef.current, {
        animation: 150,
        delay: 2000,
        delayOnTouchOnly: true,
        group: 'shared',
        onEnd: (event) => {
          const updatedTabs = [...sortedTabs];
          const movedItem = updatedTabs[event.oldIndex!];

          if (movedItem.save && event.from !== event.to) {
            console.log('Cannot move privileged items outside their group');
            return; // Do not move
          }

          const [item] = updatedTabs.splice(event.oldIndex!, 1);
          updatedTabs.splice(event.newIndex!, 0, item);

          setTabs(updatedTabs);
          localStorage.setItem('tabsOrder', JSON.stringify(updatedTabs));
        },
      });

      return () => {
        sortable.destroy();
      };
    }
  }, [tabs]);

  return (
    <div className=' w-1/1 box-border'>
      <div className="flex flex-row w-1/1 h-[48px] border-[#AEB6CE33] border-[1px]">
        <div ref={tabsrRef} className='flex flex-row'>
          {tabs.map((tab, i) => (
            <ListItem key={`${tab.id}-${i}`} text={tab.text} saved={tab.save}/>
          ))}
        </div>
        <DropDown />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
