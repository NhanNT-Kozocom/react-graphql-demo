import { useMutation, useQuery } from "@apollo/client";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Alert,
  Box,
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
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IAlert } from "../../constants/interface";
import { ROUTE } from "../../constants/routesPath";
import { DELETE_AUTHOR } from "../../services/graphql/mutation";
import { GET_AUTHORS } from "../../services/graphql/queries";
import { getRoutePath } from "../../utils/common";

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

export function ListAuthor() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchName = searchParams.get("searchName");
  const page = searchParams.get("page");

  const { loading, data } = useQuery(GET_AUTHORS);
  const [handleDeleteAuthor] = useMutation(DELETE_AUTHOR);

  const [searchValue, setSearchValue] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<IAlert>({
    isOpen: false,
    notice: "",
  });

  const startIndex = (Number(page || 1) - 1) * LINE_PER_PAGE;

  let listData = [];
  if (searchName) {
    const lowerSearchTerm = searchName?.toLowerCase();
    listData = data?.authors
      .filter((item: any) => item.name.toLowerCase().includes(lowerSearchTerm))
      .slice(startIndex, startIndex + LINE_PER_PAGE);
  } else {
    listData = data?.authors.slice(startIndex, startIndex + LINE_PER_PAGE);
  }

  const handleSearch = () => {
    setSearchParams({ page: "1", searchName: searchValue });
  };

  const handlePageChange = (page: any) => {
    setSearchParams({ page, searchName: searchValue });
  };

  const handleClickOpen = (id: string) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const handleClickDeleteAuthor = async () => {
    try {
      await handleDeleteAuthor({
        variables: { id: deleteId },
        refetchQueries: [{ query: GET_AUTHORS }],
      });
      handleClickClose();
      setOpenAlert({
        isOpen: true,
        notice: "Delete success",
        severity: "success",
      });
    } catch (error) {
      handleClickClose();
      setOpenAlert({
        isOpen: true,
        notice: "Delete error",
        severity: "error",
      });
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "36px",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "24px 36px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1024px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTE.AUTHOR.CREATE)}
            startIcon={<Add />}
          >
            Add author
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
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
          </Box>
        </Box>

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
                    <IconButton
                      onClick={() =>
                        navigate(
                          getRoutePath(ROUTE.AUTHOR.DETAIL, { id: item.id })
                        )
                      }
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        navigate(
                          getRoutePath(ROUTE.AUTHOR.EDIT, { id: item.id })
                        )
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleClickOpen(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={Math.ceil(data?.authors?.length / LINE_PER_PAGE) || 1}
            variant="outlined"
            shape="rounded"
            page={Number(page)}
            onChange={(_, page) => handlePageChange(page)}
          />
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleClickClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This operation cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleClickDeleteAuthor} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert.isOpen}
        onClose={() => setOpenAlert({ notice: "", isOpen: false })}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={openAlert.severity}>{openAlert.notice}</Alert>
      </Snackbar>
    </Box>
  );
}
