// import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCog,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
import { PiBuildings, PiIntersectDuotone } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";

import styled from "styled-components";

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <MdOutlineDashboard />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/tenant">
            <PiBuildings />
            <span>Tenant</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/administrator">
            <RiShieldUserLine />
            <span>Administrator</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/reporting">
            <HiOutlineDocumentText />
            <span>Reporting & Analytics</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/audit">
            <HiOutlineClipboardDocumentCheck />
            <span>Audit & Compliance</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/integrations">
            <PiIntersectDuotone />
            <span>Integrations</span>
          </StyledNavLink>
        </li>

        <div className="mt-48">
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
