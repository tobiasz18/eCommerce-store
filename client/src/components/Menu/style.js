import { Link } from "react-router-dom"
import styled from "styled-components"

export const MenuContainer = styled.section`
  /* background-color: ${(props) => props.theme.colors.black.normal}; */


`
export const MenuBar = styled.div`
  display:flex;
`
export const MenuNav = styled.ul`
  display:flex;
  align-items: center;
  width: 100%;
`
export const MenuItem = styled.li`
  padding: 16px;
  padding-left: 0;

  &:last-child {
    margin-left: auto;
    cursor: pointer;
  }
`
export const LinkMenu = styled(Link)`
  color: #484848;
  text-decoration: none;
  font-size: 1rem;
  transition: box-shadow .2s;
  font-weight: 600;


  &:hover {
    color: #ffffff;
    box-shadow: 0 1px 0 #ffffff;
  }
`

export const BarIconWrapper = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
   font-size: 14px;
  }
`