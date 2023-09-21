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
  const { loading, data } = useQuery(getLocation);
  const [searchValue, setSearchValue] = useState<string>("");
  const [listData, setListData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex = (currentPage - 1) * LINE_PER_PAGE;
  const endIndex = startIndex + LINE_PER_PAGE;
  const currentList = listData?.slice(startIndex, endIndex);

  useEffect(() => {
    setListData(data?.locations);
  }, [data]);

  const handleSearch = () => {
    const lowerSearchTerm = searchValue.toLowerCase();
    setListData(
      data?.locations?.filter((item: any) =>
        item.name.toLowerCase().includes(lowerSearchTerm)
      )
    );
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
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
              {currentList?.map((item: any) => (
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
            count={Math.ceil(listData?.length / LINE_PER_PAGE)}
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
