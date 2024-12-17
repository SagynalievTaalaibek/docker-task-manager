import ChecklistIcon from '@mui/icons-material/Checklist';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import WebIcon from '@mui/icons-material/Web';
import InventoryIcon from '@mui/icons-material/Inventory';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import TodayIcon from '@mui/icons-material/Today';
export const apiURL = 'http://localhost:8000';

export const STATUS = [
  {
    id: 'status1',
    name: 'Pending',
    value: 'pending',
  },
  {
    id: 'status2',
    name: 'In Progress',
    value: 'in_progress',
  },
  {
    id: 'status3',
    name: 'Completed',
    value: 'completed',
  },
];

export const mainRoutes = [
  {
    id: 'page_1',
    title: 'Inbox',
    tooltip: 'Inbox Panel',
    url: '/inbox',
    icon: InventoryIcon,
  },
  {
    id: 'page_2',
    title: 'Today',
    tooltip: 'Today',
    url: '',
    icon: TodayIcon,
  },
  {
    id: 'page_3',
    title: 'Upcoming Schedule',
    tooltip: 'Next seven day',
    url: '/next-seven',
    icon: SkipNextIcon,
  },
  {
    id: 'page_4',
    title: 'Completed',
    tooltip: 'Completed tasks',
    url: '/completed',
    icon: ChecklistIcon,
  },
];


export const dashboardSuperAdminRoutes = [
  {
    id: 'page_create_active_333',
    title: 'Модераторы',
    tooltip: 'Добавить модератора',
    url: 'admin/moderators',
    icon: PersonAddAltIcon,
  },
  {
    id: 'page_content',
    title: 'Редактор сайта',
    tooltip: 'Prismic',
    url: 'https://prismic.io/dashboard/login',
    icon: WebIcon,
  },
  {
    id: 'page_archive',
    title: 'Архив',
    tooltip: 'Архив',
    url: 'admin/archive',
    icon: InventoryIcon,
  },
];
