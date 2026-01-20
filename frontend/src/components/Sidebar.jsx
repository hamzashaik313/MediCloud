// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

// const drawerWidth = 240;

// export default function Sidebar() {
//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       <Toolbar>
//         <strong>MediCloud</strong>
//       </Toolbar>

//       <List>
//         <ListItem button>
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </ListItem>

//         <ListItem button>
//           <ListItemIcon>
//             <PeopleIcon />
//           </ListItemIcon>
//           <ListItemText primary="Patients" />
//         </ListItem>

//         <ListItem button>
//           <ListItemIcon>
//             <MedicalServicesIcon />
//           </ListItemIcon>
//           <ListItemText primary="Doctors" />
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// }
