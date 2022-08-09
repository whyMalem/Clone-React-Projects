import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const Styledbutton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <Link
        to={`/create?category=${category || ""}`}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Styledbutton variant="contained">Create Blog</Styledbutton>
      </Link>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to="/">All Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link to={`/?category=${item.type}`}>{item.type}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
