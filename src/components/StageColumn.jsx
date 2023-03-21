import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddCandidate from "./AddCandidate";
import { Stack } from "@mui/material";
import CandidateCard from "./CandidateCard";
import { useDrop } from "react-dnd";
const StageColumn = ({ candidatesData, setcandidatesData, stage }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (candidatesData.length)
      setdata(candidatesData.filter((candidate) => candidate.stage === stage));
  }, [candidatesData]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "candidate",
      drop: (item) => addImageToBoard(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [candidatesData]
  );

  const addImageToBoard = (id) => {
    if (candidatesData.length) {
      const newcandidate = candidatesData.find(
        (candidate) => candidate.id === id
      );
      newcandidate.stage = stage;
      const updatedcandidateData = candidatesData.map((candidate) =>
        candidate.id === id ? newcandidate : candidate
      );
      setdata((data) => [...data, newcandidate]);
      setcandidatesData(updatedcandidateData);
    }
  };

  if (!candidatesData.length) {
    return (
      <div>
        <AddIcon onClick={handleOpen} />
      </div>
    );
  }

  return (
    <Stack
      ref={drop}
      direction="column"
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        width: "190px",
        p: "5px",
        gap: "10px",
      }}
    >
      {data.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} stage={stage} />
      ))}
      <AddIcon
        className="addicon"
        sx={{ fontSize: "4rem", borderRadius: "50%" }}
        onClick={handleOpen}
      />
      <AddCandidate
        open={open}
        handleClose={handleClose}
        candidatesData={candidatesData}
        setcandidatesData={setcandidatesData}
        stage={stage}
      />
    </Stack>
  );
};

export default StageColumn;
