import { useQuery } from "@apollo/client";
import React from "react";
import { GET_AUTHOR } from "../../services/graphql/queries";
import { useParams } from "react-router-dom";
import { Box, Card, CircularProgress, Grid } from "@mui/material";

export function DetailAuthor() {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_AUTHOR, {
    variables: { id },
  });

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
        <p>Detail</p>
        <Grid container spacing={2} sx={{ marginTop: "16px" }}>
          <Grid item xs={6}>
            Name:
          </Grid>
          <Grid item xs={6}>
            {data.author.name}
          </Grid>
          <Grid item xs={6}>
            Age:
          </Grid>
          <Grid item xs={6}>
            {data.author.age}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
