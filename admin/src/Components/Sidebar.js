import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ImportExportIcon from "@material-ui/icons/ImportExport"
import PostAddIcon from "@material-ui/icons/PostAdd"
import AddIcon from "@material-ui/icons/Add"
import ListAltIcon from "@material-ui/icons/ListAlt"
import DashboardIcon from "@material-ui/icons/Dashboard"
import PeopleIcon from "@material-ui/icons/People"


function Sidebar() {
  return (
    <SidebarContainer>
        <div className="sidebar">
      <Link to="/">
        <h2>Cosmetics</h2>
      </Link>
      <Link to="/">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/">
      <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      </div>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
h2{
    text-align: center;
    /* filter: drop-shadow(rgb(199, 131, 67)); */
}
.sidebar {
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
}

.sidebar > a:first-child {
  padding: 0;
}
.sidebar > a > img {
  width: 100%;
  transition: all 0.5s;
}

.sidebar a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.493);
  font: 200 1rem "Roboto";
  padding: 2rem;
  transition: all 0.5s;
}
.sidebar a:hover {
  color: rgb(112, 151, 177);
  transform: scale(1.1);
}

.sidebar a > P {
  display: flex;
  align-items: center;
}
.sidebar a > p > svg {
  margin-right: 0.5rem;
}

.MuiTypography-root {
  background-color: #fff !important;
}
`;

export default Sidebar;
