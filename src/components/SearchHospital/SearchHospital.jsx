import { MenuItem, Select, Button, InputAdornment, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// NOTE: Now receiving state, city, setState, setCity, setSearchParams from parent
export default function SearchHospital({ state, setState, city, setCity, setSearchParams }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("https://meddata-backend.onrender.com/states");
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      setCities([]);
      setCity("");
      try {
        const response = await axios.get(`https://meddata-backend.onrender.com/cities/${state}`);
        setCities(response.data);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };

    if (state) {
      fetchCities();
    }
  }, [state]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "state") {
    setState(value);
    setCity(""); // Reset city
    setSearchParams({ state: value }); // ✅ Update URL with state
  } else if (name === "city") {
    setCity(value);
    setSearchParams({ state, city: value }); // ✅ Update URL with both
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state && city) {
      setSearchParams({ state, city });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 4,
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Select
        displayEmpty
        id="state"
        name="state"
        value={state}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        required
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem disabled value="">
          State
        </MenuItem>
        {states.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>

      <Select
        displayEmpty
        id="city"
        name="city"
        value={city}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        required
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem disabled value="">
          City
        </MenuItem>
        {cities.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>

      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        sx={{ py: "15px", px: 8, flexShrink: 0 }}
        disableElevation
      >
        Search
      </Button>
    </Box>
  );
}
