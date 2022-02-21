import { Link } from "react-router-dom"
import styled from "styled-components"

export const Card = styled.div`
  /* border: 0.1rem solid ${props => props.theme.colors.border.normal}; */
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgb(0 0 0 / 10%);
  width: ${props => props.width ? props.width : 'auto'};
  background: ${({theme}) => theme.colors.white};

`
export const CardHeader = styled.h3`
  border-bottom: 0.1rem solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.white}
  font-weight: 400;
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
`

export const ListGroup = styled.ul``

export const ListGroupItem = styled.li`
  padding: 0.8rem 1.6rem;
  font-weight: 600;
  border-bottom: 0.1rem solid #f3f0f0; 
  &:last-child  {
    border-bottom: none;
  }
`

export const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`

export const BoxContainer = styled.div`
  display: flex;
  gap: 6%;
  align-items: flex-start;
  position: relative;
  
  >div:nth-child(1) {
    flex: 1;
    justify-content: space-between;
  }

  >div:nth-child(2) {
    flex: 4;
    justify-content: center;
  }


  @media screen and (max-width: ${props => props.theme.spacing.sm}) {
      display: block;   
    } 


`

export const BoxItem = styled.div`
  display: flex;


  
  &:nth-child(1) {
    @media screen and (max-width: ${props => props.theme.spacing.sm}) {
   
      &>div  {
        width: 100%;
      }
    
    } 
  }

  &:nth-child(2){
    @media screen and (max-width: ${props => props.theme.spacing.sm}) {
      flex: unset;
    } 
  }


`


