// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  {
    title: 'channel',
    path: '/dashboard/channel',
    icon: icon('ic_user'),
  },
  {
    title: 'meeting',
    path: '/dashboard/meeting',
    icon: icon('ic_user'),
  },
  {
    title: "userdiscord",
    path: "/dashboard/userdiscord",
    icon: icon("ic_user"),
  },
  {
    title: "daily",
    path: "/dashboard/daily",
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/dashboard/products",
    icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
  },
];

export default navConfig;
