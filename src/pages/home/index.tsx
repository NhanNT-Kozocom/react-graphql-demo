import { useQuery } from "@apollo/client";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../constants/routesPath";
import { getAuthors } from "../../services/graphql/queries";
import { addQueryToUrl } from "../../utils/common";

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
    align: "left",
  },
  {
    id: "3",
    label: "Age",
    align: "center",
  },
  {
    id: "4",
    label: "Actions",
    align: "center",
  },
];

const LINE_PER_PAGE = 5;

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get("searchName");
  const page = searchParams.get("page");

  const { loading, data } = useQuery(getAuthors);
  const [listData, setListData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const startIndex = (Number(page || 1) - 1) * LINE_PER_PAGE;
    const endIndex = startIndex + LINE_PER_PAGE;
    if (searchName) {
      const lowerSearchTerm = searchName?.toLowerCase();
      return setListData(
        data?.authors
          ?.filter((item: any) =>
            item.name.toLowerCase().includes(lowerSearchTerm)
          )
          ?.slice(startIndex, endIndex)
      );
    }
    return setListData(data?.authors?.slice(startIndex, endIndex));
  }, [data?.authors, page, searchName]);

  const handleSearch = () => {
    navigate(addQueryToUrl(ROUTE.HOME, { page: 1, searchName: searchValue }));
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
        <div className="content-header">
          <div>
            <Button
              variant="outlined"
              onClick={() => navigate(ROUTE.CREATE_AUTHOR)}
              startIcon={<Add />}
            >
              Add author
            </Button>
          </div>
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
                  <TableCell align="center">{item.age}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={handleClickOpen}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="wrap-pagination">
          <Pagination
            count={Math.ceil(data?.authors?.length / LINE_PER_PAGE) || 1}
            variant="outlined"
            shape="rounded"
            page={Number(page)}
            onChange={(_, page) => handlePageChange(page)}
          />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This operation cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
