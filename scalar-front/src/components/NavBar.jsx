import { AppBar, Toolbar, styled, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background: #111111;
`;

const Tabs = styled(NavLink)`
    font-size: 20px;
    color: inherit;
    text-decoration: none;
    margin-right: 20px; /* Add margin-right */
`;

const Logo = styled(Box)`
    font-size: 20px;
    margin-right: auto;
    color: inherit;
`;

const NavBar = () => {
    const navigate = useNavigate('/');
    return(
        <Header position="static">
            <Toolbar>
                <Logo>
                    <Tabs to='/'>Hotel Room Management Assignment</Tabs>
                </Logo>
                <Tabs to='/'>Dashboard</Tabs>
                <Tabs to='/allbookings'>Bookings</Tabs>
                <Tabs to='/'>Cancel Bookings</Tabs>
                <Tabs to='/allrooms'>Rooms</Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;
