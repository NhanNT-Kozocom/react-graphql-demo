import { Alert, Button, Card, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createAuthor } from "../../services/graphql/mutation";
import { useMutation } from "@apollo/client";
import { getAuthors } from "../../services/graphql/queries";

interface IAlert {
  isOpen: boolean;
  notice: string;
}

function CreateAuthor() {
  const { register, handleSubmit, reset } = useForm();

  const [handleCreateAuthor] = useMutation(createAuthor);

  const [openAlert, setOpenAlert] = useState<IAlert>({
    isOpen: false,
    notice: "",
  });

  const onSubmit = (data: any) => {
    handleCreateAuthor({
      variables: { name: data.name, age: parseInt(data.age) },
      refetchQueries: [{ query: getAuthors }],
    });
    setOpenAlert({ isOpen: true, notice: "Create author success" });
    reset();
  };

  return (
    <div className="container">
      <Card sx={{ maxWidth: 768 }} className="create-author-card">
        <form className="create-author-form" onSubmit={handleSubmit(onSubmit)}>
          <p className="create-author-form-title ">Create author</p>
          <div className="create-author-form-item">
            <TextField
              label="Name author"
              variant="outlined"
              size="small"
              {...register("name")}
            />
          </div>
          <div className="create-author-form-item">
            <TextField
              label="Age author"
              variant="outlined"
              size="small"
              {...register("age")}
            />
          </div>
          <Button
            className="create-author-form-item"
            variant="contained"
            type="submit"
          >
            Create
          </Button>
        </form>
      </Card>
      <Snackbar
        open={openAlert.isOpen}
        onClose={() => setOpenAlert({ ...openAlert, isOpen: false })}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">{openAlert.notice}</Alert>
      </Snackbar>
    </div>
  );
}

export default CreateAuthor;
