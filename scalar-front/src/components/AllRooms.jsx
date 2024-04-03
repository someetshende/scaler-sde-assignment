import { Table, TableHead, TableBody, TableCell, TableRow, Typography, styled } from "@mui/material";

const StyledTable = styled(Table)`
  width: 50%;
  margin: 5% auto 0 auto; 
`;

const BoldTableCell = styled(TableCell)`
  font-weight: bold;
`;

const AllRooms = () => {
    return (
        <StyledTable>
            <TableHead>
                <TableRow>
                    <BoldTableCell align="center">Room Type</BoldTableCell>
                    <BoldTableCell align="center">Room Price</BoldTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="center">A</TableCell>
                    <TableCell align="center">₹100 / Hour</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">B</TableCell>
                    <TableCell align="center">₹80 / Hour</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">C</TableCell>
                    <TableCell align="center">₹50 / Hour</TableCell>
                </TableRow>
            </TableBody>
        </StyledTable>
    );
}

export default AllRooms;
