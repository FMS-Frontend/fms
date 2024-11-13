import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IconType } from "react-icons";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineCog,
} from "react-icons/hi2";


/**
 * MainNav component that renders a vertical navigation menu with dynamic links and a bottom section
 * for settings and logout actions.
 * The menu is populated using the provided `data` prop that contains navigation items.
 *
 * @component
 * @example
 * const navData = [
 *   { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
 *   { path: '/reports', icon: ReportIcon, label: 'Reports' },
 * ];
 * return <MainNav data={navData} />;
 *
 * @param {Object} props - The props for the component.
 * @param {Array} props.data - An array of objects representing the navigation items.
 * Each object should have `path` (string), `icon` (React component), and `label` (string).
 *
 * @returns {JSX.Element} The rendered navigation menu component.
 */

export type NavItem = {
  path: string;
  label: string;
  icon: IconType;
};

type MainNavProps = {
  data: NavItem[];
};

function MainNav({ data }: MainNavProps) {
  return (
    <nav className="h-full flex flex-col justify-between">
      <NavList>
        {data.map((item, index) => (
          <li key={index}>
            <StyledNavLink to={item.path}>
              <item.icon />
              <span>{item.label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>

      <BottomNavList>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog />
            <span>Settings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/">
            <HiOutlineArrowLeftStartOnRectangle />
            <span>Logout</span>
          </StyledNavLink>
        </li>
      </BottomNavList>
    </nav>
  );
}

export default MainNav;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 2rem;
`;

const BottomNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: auto;
  padding-bottom: 2rem;
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
