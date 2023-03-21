import React, { useState } from "react";
import {
  Stack,
  TextField,
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const AddCandidate = ({
  open,
  handleClose,
  candidatesData,
  setcandidatesData,
  stage,
}) => {
  const [data, setdata] = useState({
    id: 0,
    Name: "",
    location: "",
    date: "",
    photo: [],
    stage: stage,
  });

  const Onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleimageChange = (e) => {
    const d = new Date();
    let time = d.getTime();
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setdata({ ...data, photo: reader.result, id: time });
    };
  };
  const handleadd = async (e) => {
    e.preventDefault();
    setcandidatesData([...candidatesData, data]);
    setdata({ id: 0, Name: "", location: "", date: "", photo: [] });
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80vw", md: "40vw" },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleadd}>
          <Stack spacing={2}>
            <Typography variant="h3">Add Candidate...</Typography>
            <FormControl>
              <TextField
                id="outlined-controlled"
                label="Name"
                required
                value={data.Name}
                name="Name"
                InputLabelProps={{ shrink: true }}
                onChange={Onchange}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="outlined-controlled"
                label="Location"
                required
                value={data.location}
                name="location"
                InputLabelProps={{ shrink: true }}
                onChange={Onchange}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="outlined-controlled"
                required
                label="Date Applied"
                type="date"
                name="date"
                value={data.date}
                InputLabelProps={{ shrink: true }}
                onChange={Onchange}
              />
            </FormControl>
            <FormControl>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <PhotoCamera />
                <input
                  placeholder="Insert Image"
                  accept="image/*"
                  required
                  type="file"
                  encType="multipart/form-data"
                  onChange={handleimageChange}
                />
              </IconButton>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Add
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCandidate;
