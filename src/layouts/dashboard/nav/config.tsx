import SvgColor from "../../../components/svg-color";

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
    title: "users",
    path: "/dashboard/users",
    icon: icon("ic_user"),
  },
  {
    title: 'channel',
    path: '/dashboard/channel',
    icon: icon('ic_channel'),
  },
  {
    title: 'meeting',
    path: '/dashboard/meeting',
    icon: icon('ic_meeting'),
  },
  {
    title: "penalty",
    path: "/dashboard/Penalty",
    icon: icon("ic_penalty"),
  },
  {
    title: "message",
    path: "/dashboard/Message",
    icon: icon("ic_message"),
  },
  {
    title: "daily",
    path: "/dashboard/daily",
    icon: icon("ic_daily"),
  },
  {
    title: "mention",
    path: "/dashboard/mention",
    icon: icon("ic_mention"),
  },
];

export default navConfig;
