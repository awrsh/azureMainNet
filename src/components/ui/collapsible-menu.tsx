import React, { useState, useEffect } from 'react';
// @ts-ignore
import { motion } from "framer-motion/dist/framer-motion"
import cn from 'classnames';
import { useMeasure } from '../../hooks/use-measure';
import { ChevronDown } from '../Icon/chevron-down';
import { useDrawer } from '../drawer-views/context';

type MenuItemProps = {
  name?: string;
  icon: React.ReactNode;
  href: string;
  dropdownItems?: DropdownItemProps[];
  active?: boolean,
  closeSideBar?: () => void
};

type DropdownItemProps = {
  name: string;
  href: string;
};

export function MenuItem({ name, icon, href, dropdownItems, active, closeSideBar}: MenuItemProps) {

  const { closeDrawer } = useDrawer();
  const close = () => {
    if(closeSideBar && typeof closeSideBar != undefined){
      closeSideBar()
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure<HTMLUListElement>();
  const isChildrenActive = active
  // dropdownItems && dropdownItems.some((item) => item.href === pathname);
  useEffect(() => {
    if (isChildrenActive) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mb-2 min-h-[48px] list-none last:mb-0 cursor-pointer" onClick={close}>
      {(dropdownItems?.length) || active ? (
        <>
          <div
            className={cn(
              'relative flex h-12 cursor-pointer items-center justify-between whitespace-nowrap  rounded-lg px-4 text-sm transition-all',
              isChildrenActive
                ? 'text-white'
                : 'text-gray-500 hover:text-brand dark:hover:text-white'
            )}
            onClick={() => {
              setIsOpen(!isOpen);
              close()
            }}
          >
            <span className="z-[1] flex items-center ltr:mr-3 rtl:ml-3">
              <span className="ltr:mr-3 rtl:ml-3">{icon}</span>
              <span className="relative z-[1] px-3"> {name}</span>
            </span>
            <span
              className={`z-[1] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                }`}
            >
              {(dropdownItems?.length) && <ChevronDown /> || null}
            </span>

            {isChildrenActive && (
              <span
                
                className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand-gradient shadow-large"
              />
            )}          </div>

          <div
            style={{
              height: isOpen ? height : 0,
            }}
            className="ease-[cubic-bezier(0.33, 1, 0.68, 1)] overflow-hidden transition-all duration-[350ms]"
          >
            <ul ref={ref}>
              {dropdownItems?.map((item, index) => (
                <li className="first:pt-2" key={index} onClick={close}>
                  <a
                  onClick={close}
                    className="flex items-center rounded-lg p-3 text-sm text-gray-500 transition-all before:h-1 before:w-1 before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-6 before:ltr:mr-5 rtl:pr-6 before:rtl:ml-5 dark:hover:text-white"
                  >

                    <span className="relative z-[1] px-3" onClick={close}>  {name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <a
          href={href}
          onClick={close}
          className="relative flex h-12 items-center whitespace-nowrap rounded-lg px-4 text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white"
        >
          <span className="relative z-[1] ltr:mr-3 rtl:ml-3">{icon}</span>
          <span className="relative z-[1] px-3" onClick={close}> {name}</span>
        </a>
      )}
    </div>
  );
}
