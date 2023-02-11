import React from 'react'
import { HomeIcon } from 'src/components/Icon/home';
import { DiskIcon } from 'src/components/Icon/disk';
import { PlusCircle } from 'src/components/Icon/plus-circle';
import { BookIcon } from 'src/components/Icon/book';
import { Unlocked } from 'src/components/Icon/unlocked';
import { ExchangeIcon } from 'src/components/Icon/exchange';
import { VoteIcon } from 'src/components/Icon/vote-icon';
import { CompassIcon } from 'src/components/Icon/compass';
import { HistoryIcon } from 'src/components/Icon/history';
import { Liquid } from 'src/components/Icon/liquid';
import { Telegram } from 'src/components/Icon/telegram';



export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: "https://azurswap.org",
  },
  {
    name: 'Swap',
    icon: <ExchangeIcon />,
    href: "/#/swap",
  },
  {
    name: 'Liquidity ',
    icon: <Liquid />,
    href: "#",
  },
 
  {
    name: 'Lock Token',
    icon: <Unlocked />,
    href: "#",
  },
  {
    name: 'Private Sell',
    icon: <DiskIcon />,
    href: "#",
  },
  {
    name: 'Presale Token',
    icon: <VoteIcon />,
    href: "#",
  },

  {
    name: 'Telegram Bot',
    // icon: <HistoryIcon />,
    icon: <Telegram />,
    href: "https://t.me/AzurSwap_bot",
  },

  {
    name: 'Airdrop',
    icon: <CompassIcon />,
    href: "#",
  },

  {
    name: 'Your Adv',
    icon: <PlusCircle />,
    href: "#",
  },
  {
    name: 'Document',
    icon: <BookIcon />,
    href: "#",
  },
];
