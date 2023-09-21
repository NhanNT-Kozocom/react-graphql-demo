import { useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getLocation } from "../../services/graphql/queries";
import { useLocation, useNavigate } from "react-router-dom";
import { addQueryToUrl } from "../../utils/common";
import { ROUTE } from "../../constants/routesPath";

interface IColumn {
  id: string;
  label: string;
  align?: TableCellProps["align"];
}

const columns: Array<IColumn> = [
  {
    id: "1",
    label: "ID",
    align: "left",
  },
  {
    id: "2",
    label: "Name",
    align: "center",
  },
  {
    id: "3",
    label: "Description",
    align: "center",
  },
  {
    id: "4",
    label: "Image",
    align: "center",
  },
];

const LINE_PER_PAGE = 3;

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get("searchName");
  const page = searchParams.get("page");

  const { loading, data } = useQuery(getLocation);
  const [listData, setListData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const startIndex = (Number(page || 1) - 1) * LINE_PER_PAGE;
    const endIndex = startIndex + LINE_PER_PAGE;
    if (searchName) {
      const lowerSearchTerm = searchName?.toLowerCase();
      return setListData(
        data?.locations
          ?.filter((item: any) =>
            item.name.toLowerCase().includes(lowerSearchTerm)
          )
          ?.slice(startIndex, endIndex)
      );
    }
    return setListData(data?.locations?.slice(startIndex, endIndex));
  }, [data?.locations, page, searchName]);

  const handleSearch = () => {
    navigate(addQueryToUrl(ROUTE.HOME, { searchName: searchValue }));
  };

  const handlePageChange = (page: any) => {
    navigate(addQueryToUrl(ROUTE.HOME, { page, searchName: searchValue }));
  };

  if (loading)
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );

  return (
    <div className="container">
      <div className="content">
        <div className="wrap-search">
          <TextField
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            size="small"
            style={{ marginRight: "16px" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="simple-table">
            <TableHead>
              <TableRow>
                {columns.map((item) => (
                  <TableCell key={item.id} align={item.align}>
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listData?.map((item: any) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">
                    <img
                      className="image-item"
                      alt="location-reference"
                      src={`${item.photo}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="wrap-pagination">
          <Pagination
            count={Math.ceil(data?.locations?.length / LINE_PER_PAGE) || 1}
            variant="outlined"
            shape="rounded"
            onChange={(_, page) => handlePageChange(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
