import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IAlert } from "../../constants/interface";
import { UPDATE_AUTHOR } from "../../services/graphql/mutation";
import { GET_AUTHOR, GET_AUTHORS } from "../../services/graphql/queries";

export function EditAuthor() {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();

  const [handleEditAuthor] = useMutation(UPDATE_AUTHOR);
  const { loading, data } = useQuery(GET_AUTHOR, {
    variables: { id },
  });

  const [openAlert, setOpenAlert] = useState<IAlert>({
    isOpen: false,
    notice: "",
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.author.name);
      setValue("age", data.author.age);
    }
  }, [data, setValue]);

  const onSubmit = (data: any) => {
    handleEditAuthor({
      variables: { id, name: data.name, age: parseInt(data.age) },
      refetchQueries: [{ query: GET_AUTHORS }],
    });
    setOpenAlert({ isOpen: true, notice: "Edit author success" });
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
      <Card sx={{ maxWidth: "480px", width: "100%", padding: "36px" }}>
        <form className="create-author-form" onSubmit={handleSubmit(onSubmit)}>
          <p
            className="create-author-form-title"
            style={{
              textAlign: "center",
              fontWeight: 500,
              fontSize: "24px",
              marginBottom: "16px",
            }}
          >
            Edit author
          </p>
          <div className="create-author-form-item">
            <TextField
              label="Name author"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ marginBottom: "16px" }}
              {...register("name")}
            />
          </div>
          <div className="create-author-form-item">
            <TextField
              label="Age author"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ marginBottom: "16px" }}
              {...register("age")}
            />
          </div>

          <Button
            className="create-author-form-item"
            variant="contained"
            type="submit"
            fullWidth
          >
            Create
          </Button>
        </form>
      </Card>
      <Snackbar
        open={openAlert.isOpen}
        onClose={() => setOpenAlert({ notice: "", isOpen: false })}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">{openAlert.notice}</Alert>
      </Snackbar>
    </Box>
  );
}
