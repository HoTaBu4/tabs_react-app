import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import ListItem from './listItem';
import { Outlet } from 'react-router-dom';
import DropDown from './dropDown';
import { initialTabs } from '../../data/tabs';

interface TabItem {
  id: number;
  text: string;
  save: boolean; 
}

const Home: React.FC = () => {
  const tabsrRef = useRef<HTMLDivElement | null>(null);
  const savedTabsRef = useRef<HTMLDivElement | null>(null);
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [savedTabs, setSavedTabs] = useState<TabItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedOrder = localStorage.getItem('tabsOrder');
    const savedTabsOrder = localStorage.getItem('savedTabsOrder');

    if (savedOrder) {
      setTabs(JSON.parse(savedOrder));
    } else {
      setTabs(initialTabs);
    }

    if (savedTabsOrder) {
      setSavedTabs(JSON.parse(savedTabsOrder));
    } else {
      setSavedTabs(initialTabs);
    }
  }, []);

  useEffect(() => {
    if (savedTabsRef.current) {
      const sortableSaved = new Sortable(savedTabsRef.current, {
        animation: 150,
        delay: 2000,
        delayOnTouchOnly: true,
        group: {
          name: 'shared',
          pull: 'clone',
          put: false
        },
        onStart: () => setIsDragging(true),
        onEnd: (event) => {
          setIsDragging(false); 
          const updatedSavedTabs = [...savedTabs];

          const [item] = updatedSavedTabs.splice(event.oldIndex!, 1);
          updatedSavedTabs.splice(event.newIndex!, 0, item);

          setSavedTabs(updatedSavedTabs);
          localStorage.setItem('savedTabsOrder', JSON.stringify(updatedSavedTabs));
        },
      });

      return () => {
        sortableSaved.destroy();
      };
    }
  }, [savedTabs]); 
  useEffect(() => {
    if (tabsrRef.current) {
      const sortable = new Sortable(tabsrRef.current, {
        animation: 150,
        delay: 2000,
        delayOnTouchOnly: true,
        group: {
          name: 'shared',
          pull: 'clone',
          put: false
        },
        onStart: () => setIsDragging(true),
        onEnd: (event) => {
          setIsDragging(false); 
          const updatedTabs = [...tabs];

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
  }, [tabs])
  const handletoggleItem = (item: TabItem, toSave: boolean) => {
    if (toSave) {
      const updatedTabs = tabs.filter((tab) => tab.id !== item.id);
      const updatedSavedTabs = [...savedTabs, {...item,save: true}];

      setTabs(updatedTabs);
      setSavedTabs(updatedSavedTabs);
      localStorage.setItem('tabsOrder', JSON.stringify(updatedTabs));
      localStorage.setItem('savedTabsOrder', JSON.stringify(updatedSavedTabs));
    } else {
      const updatedSavedTabs = savedTabs.filter((tab) => tab.id !== item.id);
      const updatedTabs = [...tabs, {...item,save: false}];

      setTabs(updatedTabs);
      setSavedTabs(updatedSavedTabs);
      localStorage.setItem('tabsOrder', JSON.stringify(updatedTabs));
      localStorage.setItem('savedTabsOrder', JSON.stringify(updatedSavedTabs));
    }
  };
  

  return (
    <div className=' w-1/1 box-border'>
      <div className="flex flex-row w-1/1 h-[48px] border-[#AEB6CE33] border-[1px]">
        <div ref={savedTabsRef} className='flex flex-row'>
          {savedTabs.map((tab, i) => (
            <ListItem 
              key={`${tab.id}-${i}`} 
              item={tab} 
              handletoggleItem={handletoggleItem}
              isDragging={isDragging}
            />
          ))}
        </div>
        <div ref={tabsrRef} className='flex flex-row'>
          {tabs.map((tab, i) => (
            <ListItem 
              key={`${tab.id}-${i}`} 
              item={tab} 
              handletoggleItem={handletoggleItem} 
              isDragging={isDragging}
            />
          ))}
        </div>
        <DropDown />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
