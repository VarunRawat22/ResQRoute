import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ marginTop: "64px" }}> {/* Offset for fixed navbar */}
        <MapComponent />
      </Box>
    </Box>
  );
};

export default Dashboard;
