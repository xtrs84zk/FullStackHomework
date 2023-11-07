import styled from "styled-components";
import DeleteIconBase from '@mui/icons-material/Delete';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const DeleteIcon = styled(DeleteIconBase)`
  cursor: pointer;
  :hover {
    fill: red;
  }
  transition: all 0.4s ease-in-out;
`;

export const Footer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
