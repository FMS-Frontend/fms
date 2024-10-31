// import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineUsers,
} from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
import { PiBuildings, PiIntersectFill } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";

import styled from "styled-components";
import { checkUserRole } from "../utils/helpers";

/**
 * MainNav component renders a navigation menu with links based on the user's role.
 *
 * @component
 * @returns {JSX.Element} A navigation element containing role-specific links and general links
 * for dashboard, reporting, settings, and logout.
 *
 * The menu displays:
 * - For "superuser": Links to "Dashboard," "Tenant," and "Administrator."
 * - For "admin": Links to "Admin Dashboard," "Users," and "Integration."
 * - General links for "Reports & Analytics," "Audit & Compliance," "Settings," and "Logout" are available for all roles.
 *
 * @example
 * // Renders the MainNav component
 * <MainNav />
 */

function MainNav() {
  const role = "admin";
  const userRole = checkUserRole(role);

  return (
    <nav>
      <NavList>
        {userRole === "superuser" && (
          <li>
            <StyledNavLink to="/dashboard">
              <MdOutlineDashboard />
              <span>Dashboard</span>
            </StyledNavLink>
          </li>
        )}
        {userRole === "admin" && (
          <li>
            <StyledNavLink to="/admin-dashboard">
              <MdOutlineDashboard />
              <span>Dashboard</span>
            </StyledNavLink>
          </li>
        )}

        {userRole === "superuser" && (
          <li>
            <StyledNavLink to="/tenant">
              <PiBuildings />
              <span>Tenant</span>
            </StyledNavLink>
          </li>
        )}

        {userRole === "admin" && (
          <li>
            <StyledNavLink to="/users">
              <HiOutlineUsers />
              <span>Users</span>
            </StyledNavLink>
          </li>
        )}

        {userRole === "superuser" && (
          <li>
            <StyledNavLink to="/administrator">
              <RiShieldUserLine />
              <span>Administrator</span>
            </StyledNavLink>
          </li>
        )}

        <li>
          <StyledNavLink to="/reporting">
            <HiOutlineDocumentText />
            <span>Reports & Analytics</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/audit">
            <HiOutlineClipboardDocumentCheck />
            <span>Audit & Compliance</span>
          </StyledNavLink>
        </li>
        {userRole === "admin" && (
          <li>
            <StyledNavLink to="/integration">
              <PiIntersectFill />
              <span>Integration</span>
            </StyledNavLink>
          </li>
        )}

        <div className="mt-60">
          <li>
            <StyledNavLink to="/settings">
              <HiOutlineCog />
              <span>Settings</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/logout">
              <HiOutlineArrowLeftStartOnRectangle />
              <span>Logout</span>
            </StyledNavLink>
          </li>
        </div>
      </NavList>
    </nav>
  );
}

export default MainNav;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    border-radius: 10px;
    margin-bottom: 0.8rem;

    color: var(--color-grey-50);
    font-size: 1.4rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-50);
    background-color: #061e47;
    border-radius: 10px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-50);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-50);
  }
`;

// {navlist.map((nav) => (
//   <StyledNavLink key={nav.text} to={nav.link}>
//     {nav.icon}
//     <span>{nav.text}</span>
//   </StyledNavLink>
// ))}
