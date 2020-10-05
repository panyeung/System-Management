const menuList = [
  {
    title: "Home", //title
    key: "/home", // path
    icon: "home", // icon
    isPublic: true, //All user can see
  },
  {
    title: "Product",
    key: "/products",
    icon: "appstore",
    children: [
      {
        title: "Category",
        key: "/category",
        icon: "bars",
      },
      {
        title: "Product",
        key: "/product",
        icon: "tool",
      },
    ],
  },

  {
    title: "User",
    key: "/user",
    icon: "user",
  },
  {
    title: "Role",
    key: "/role",
    icon: "safety",
  },
  // {
  //   title: "Charts",
  //   key: "/charts",
  //   icon: "area-chart",
  //   children: [
  //     {
  //       title: "Bar",
  //       key: "/charts/bar",
  //       icon: "bar-chart",
  //     },
  //     {
  //       title: "Line",
  //       key: "/charts/line",
  //       icon: "line-chart",
  //     },
  //     {
  //       title: "Pie",
  //       key: "/charts/pie",
  //       icon: "pie-chart",
  //     },
  //     {
  //       title: "radar",
  //       key: "/charts/map",
  //       icon: "radar-chart",
  //     },
  //   ],
  // },
];

export default menuList;
