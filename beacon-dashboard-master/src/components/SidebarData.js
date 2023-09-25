import React, { useEffect } from "react";
import * as RiIcons from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation, locationSelector } from "slices/locations";


export const SidebarData = [
  {
    id: 1,
    title: "LED",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [],
  },
  {
    id: 2,
    title: "Gantries",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [],
  },
  {
    id: 3,
    title: "Billboard",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [],
  },
];

