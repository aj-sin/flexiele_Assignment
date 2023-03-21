import React from "react";
import { Card, Stack, Avatar, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
const CandidateCard = ({ candidate, stage }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "candidate",
    // item: candidate ,
    item: { id: candidate.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Card
      className="card"
      ref={drag}
      sx={{
        width: "180px",
        p: "5px",
        opacity: isDragging ? 0.5 : 1,
        outline: isDragging ? "2px solid pink" : "0px",
        border: `${
          stage === "rejected"
            ? "2px solid red"
            : stage === "hired"
            ? "2px solid #85fe85"
            : "0px"
        }`,
      }}
    >
      <Stack direction="row" justifyContent="flex-start">
        <Avatar alt="Remy Sharp" src={candidate.photo} />
        <Stack direction="column" sx={{ ml: "8px" }}>
          <Typography sx={{ fontWeight: "600" }}>{candidate.Name}</Typography>

          <Typography variant="subtitle1" sx={{ mt: "-9px" }}>
            {candidate.location}
          </Typography>
          <Typography variant="subtitle2" sx={{ mr: "15px" }}>
            {candidate.date}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CandidateCard;
