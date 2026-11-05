import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa6";

import { FaThList } from "react-icons/fa";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { FaPager } from "react-icons/fa";
import { FaUsers, FaBriefcase, FaUmbrellaBeach } from "react-icons/fa";
import { FaRegCommentDots, FaRegBell, FaGift } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";

import { ImShrink2 } from "react-icons/im";
import { RiExpandDiagonal2Fill } from "react-icons/ri";

export const Icons = {
  right_arrow: FaArrowRight,
  admin: FaUser,
  upload: FaArrowUp,
  down: FaChevronDown,
  left_arrow: FaArrowLeft,
  edit: MdOutlineEdit,
  profile_edit: CiEdit,
  three_dot: HiDotsHorizontal,
  plus: FaPlus,
  eye: FaRegEye,
  delete: FaRegTrashAlt,
  search: IoIosSearch,

  // Side Bar Icons
  profile_icon: FaUserGroup,
  dashboard: FaLayerGroup,
  payrol: RiMoneyPoundBoxFill,
  employee_list: FaThList,
  shrink: ImShrink2,
  expand: RiExpandDiagonal2Fill,

  // attendance
  attendance: FaPager,
  filter: IoFilterSharp,
  time: IoTimeOutline,
  employees: FaUsers,
  on_work: FaBriefcase,
  on_leave: FaUmbrellaBeach,
  message: FaRegCommentDots,
  alert: FaRegBell,
  gift: FaGift,
};
