// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// //import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// //import ProTip from './ProTip';
// import { TextField,Grid } from '@mui/material';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}.
//     </Typography>
//   );
// }

// export default function App() {
//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h2" component="h1" gutterBottom> 
//           Wyssling Template Generator
//         </Typography>
//         <ProTip />
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }


/* -- TODO: --*/
/*
  REQUIREMENTS:
  * Use at least 5 Material UI components and a few of their props each. ✔️

  * Conditionally render some JSX based on the value of a useState variable. 
        Use a Material UI component to also change the value of that useState variable, 
      such as a Button to toggle a boolean. ⭕ 
        (maybe did this already, but add a submit button that does a toast 
          pop up when clicked to submit the form)

  * Properly define your TypeScript types. ⭕ (double check this when done)
          
  * Create a small array of objects with at least two key/value pairs and map over 
    the array to render the objects as individual JSX elements. ⭕ 
    (implement this with mount info and make a map of mount types to their info 
      (each their own object perhaps))

  * Be prepared to locally host your application in your browser and share your screen. ✔️ 
      (npm run dev)
  
  OTHER:
      * don't let submit unless all fields are filled out
      * add the text of the letter and have the inputs be in the corresponding
        positions of the letter?
      * space out fields more
*/

import { useState, ChangeEvent } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import Link from '@mui/material/Link';
//import ProTip from './ProTip';
import { TextField,Grid,Autocomplete,RadioGroup,Radio,FormControlLabel,FormControl,FormLabel,
  InputLabel,Select,MenuItem,Button,Snackbar,Alert
} from '@mui/material';

export default function App() {
  const [value, setValue] = useState<string>("0.000");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const states: string[] = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const roofs: string[] = [
    "Composite Asphalt Shingle", "Rolled Composite Asphalt", "Tile Roofing", "Metal Roofing", 
    "Membrane Roofing", "Tar and Gravel"
  ];

  const asces: string[] = [
    "7-98", "7-05", "7-10", "7-16"
  ];

  const mount_manufacturers: string[] = [
    "Ecofasten", "Ironridge", "Roof Tech", "Unirac"
  ];

  const codes: string[] = [
    "2015", "2018", "2021"
  ];

  const mount_spacing: string[] = [
    "48", "72", "24"
  ];
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue.toString());
    } else {
      setValue("0.000");
    }
  };

  const updateSigFigs = (event: React.FocusEvent<HTMLInputElement>) => {
    let newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue.toFixed(3));
    } else {
      setValue("0.000");
    }
  };

  const handleSubmitted = () => {
    setSubmitted(true);
  };

  const handleCloseSnackBar = () => {
    setSubmitted(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom> 
          Wyssling Template Generator
        </Typography>
      </Box>
      <Grid container>
        <Grid>
          <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
        </Grid>
        <Grid>
          <TextField id="outlined-basic" label="Address" variant="outlined"/>
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="City" variant="outlined"/>
        </Grid>
        <Grid >
          <Autocomplete
                id="combo-box-demo"
                options={states}
                disableClearable
                renderInput={(params) => <TextField {...params} label="State" />}
              />
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="System Size" variant="outlined" 
                type="number" 
                defaultValue="0.000"
                value={value}
                onChange={handleChange}
                onBlur={updateSigFigs}
                inputProps={{
                  step: "0.001"
                }}/>
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="Framing" variant="outlined"/>
        </Grid>
        <Grid >
        <Autocomplete
                id="combo-box-demo"
                freeSolo
                sx={{ width: 300 }}
                options={roofs}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Roof Material" />}
              />
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="Slope (degrees)" variant="outlined" type="number" />
        </Grid>
        <Grid >
          <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Attic Access</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="accessible"
                name="radio-buttons-group"
              >
              <FormControlLabel value="accessible" control={<Radio />} label="Accessible" />
              <FormControlLabel value="inaccessible" control={<Radio />} label="Inaccessible" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="Existing Dead Load" variant="outlined" type="number" 
              defaultValue="7"/>
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="New Dead Load" variant="outlined" type="number"
              defaultValue="3"/>
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="Snow Load" variant="outlined" type="number"/>
        </Grid>
        <Grid >
        <Autocomplete
                id="combo-box-demo"
                freeSolo
                sx={{ width: 224 }}
                options={asces}
                disableClearable
                renderInput={(params) => <TextField {...params} label="ASCE" />}
              />
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="Wind Speed" variant="outlined" type="number"/>
        </Grid>
        <Grid >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Exposure Category</InputLabel>
            <Select
              sx={{ width: 224 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Exposure Category"
              defaultValue="C"
            >
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid >
          <Autocomplete
              id="combo-box-demo"
              freeSolo
              sx={{ width: 224 }}
              options={codes}
              disableClearable
              renderInput={(params) => <TextField {...params} label="Code" />}
            />
        </Grid>
        <Grid >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Code Type</InputLabel>
            <Select
              sx={{ width: 224 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Exposure Category"
              defaultValue="IRC"
            >
              <MenuItem value="IRC">IRC</MenuItem>
              <MenuItem value="IBC">IBC</MenuItem>
              <MenuItem value="Other">Other (type full code in Code input)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid >
          <Autocomplete
            id="combo-box-demo"
            freeSolo
            sx={{ width: 224 }}
            options={mount_manufacturers}
            disableClearable
            renderInput={(params) => <TextField {...params} label="Mount Manufacturer" />}
          />
        </Grid>
        <Grid >
          <TextField id="outlined-basic" label="Mount Info" variant="outlined"/>
        </Grid>
        <Grid >
          <Autocomplete
              id="combo-box-demo"
              freeSolo

              sx={{ width: 224 }}
              options={mount_spacing}
              disableClearable
              renderInput={(params) => <TextField {...params} label="Mount Spacing" />}
            />
        </Grid>
      </Grid>
      <div>
      <Button style={{ margin: 50 }}  variant="contained" onClick={handleSubmitted}> Submit</Button>
      <Snackbar
        open={submitted}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
        >
          PDF Generated!
        </Alert>
      </Snackbar>
      </div>
    </Container>
  );
}
