import { useMutation } from "@apollo/client";
import { Alert, Box, Button, Card, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IAlert } from "../../constants/interface";
import { CREATE_AUTHOR } from "../../services/graphql/mutation";
import { GET_AUTHORS } from "../../services/graphql/queries";

export function CreateAuthor() {
  const { register, handleSubmit, reset } = useForm();

  const [handleCreateAuthor] = useMutation(CREATE_AUTHOR);

  const [openAlert, setOpenAlert] = useState<IAlert>({
    isOpen: false,
    notice: "",
  });

  const onSubmit = (data: any) => {
    handleCreateAuthor({
      variables: { name: data.name, age: parseInt(data.age) },
      refetchQueries: [{ query: GET_AUTHORS }],
    });
    setOpenAlert({ isOpen: true, notice: "Create author success" });
    reset();
  };

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
            Create author
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
