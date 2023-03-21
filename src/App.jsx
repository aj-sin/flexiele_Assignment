import { Stack, Typography, Box } from "@mui/material";
import StageColumn from "./components/StageColumn";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { candidates } from "./data";
function App() {
  const data = window.localStorage.getItem("candidates");
  const [candidatesData, setcandidatesData] = useState(data?[]:candidates);

  useEffect(() => {
    const data = window.localStorage.getItem("candidates");
    if (data !== null) {
      if (JSON.parse(data).length) {
        setcandidatesData(JSON.parse(data));
      }
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("candidates", JSON.stringify(candidatesData));
  }, [candidatesData]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Stack p={2}>
        <Typography variant="h3" sx={{ mb: "10px" }}>
          Stages
        </Typography>
        <Stack
          direction="row"
          sx={{
            borderTop: "3px solid blue",
            justifyContent: "space-between",
            py: "5px",
            bgcolor: "white",
            width: "1230px",
          }}
        >
          <Box className="stage">Source</Box>
          <Box className="stage">Applied</Box>
          <Box className="stage">In-touch</Box>
          <Box className="stage">Interview</Box>
          <Box className="stage">Hired</Box>
          <Box className="stage" sx={{ borderRight: "0px" }}>
            Rejected
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", py: "5px" }}
        >
          <StageColumn
            stage={"source"}
            candidatesData={candidatesData}
            setcandidatesData={setcandidatesData}
          />
          <StageColumn
            stage={"applied"}
            candidatesData={candidatesData}
            setcandidatesData={setcandidatesData}
          />
          <StageColumn
            stage={"intouch"}
            candidatesData={candidatesData}
            setcandidatesData={setcandidatesData}
          />
          <StageColumn
            stage={"interview"}
            candidatesData={candidatesData}
            setcandidatesData={setcandidatesData}
          />
          <StageColumn
            stage={"hired"}
            candidatesData={candidatesData}
            setcandidatesData={setcandidatesData}
          />
          <StageColumn
            stage={"rejected"}
            candidatesData={candidatesData}
            setcandidatesData={setcandidatesData}
          />
        </Stack>
      </Stack>
    </DndProvider>
  );
}

export default App;
