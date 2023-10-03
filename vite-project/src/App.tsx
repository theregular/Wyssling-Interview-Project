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
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('This is an editable paragraph.');

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

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom> 
          Wyssling Template Generator
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" sx={{
            textAlign: 'right',
          }}> 
          Re: Engineering Services
        </Typography>
        <Typography variant="body1" sx={{
            textAlign: 'right',
          }}> 
          <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
          Residence
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <TextField id="outlined-basic" label="Address" variant="outlined"/>
          <TextField id="outlined-basic" label="City" variant="outlined"/>
          <Autocomplete
                id="combo-box-demo"
                options={states}
                disableClearable
                renderInput={(params) => <TextField {...params} label="State" />}
              />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <TextField id="outlined-basic" label="System Size" variant="outlined" 
                type="number" 
                defaultValue="0.000"
                value={value}
                onChange={handleChange}
                onBlur={updateSigFigs}
                inputProps={{
                  step: "0.001"
                }}/>
        </Box>
      </Box>

      <Box>
        <Typography variant="body1" paragraph
            sx={{
              textAlign: 'justify',
            }}
          > 
            To Whom It May Concern:
        </Typography>
        <Typography variant="body1" paragraph
          sx={{
            textAlign: 'justify',
          }}
        > 
          We have received information regarding solar panel installation on the roof of the above referenced
          structure. Our evaluation of the structure is to verify the existing capacity of the roof system and its ability
          to support the additional loads imposed by the proposed solar system.
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
          <ol type="A">
            <li>
              Site Assessment Information
              <ol type="1">
                <Typography sx={{ fontWeight: 'normal', fontStyle: 'normal' }}>
                  <li>Site visit documentation identifying attic information including size and spacing of framing
                      for the existing roof structure</li>
                  <li>Design drawings of the proposed system including a site plan, roof plan and connection
                      details for the solar panels. This information will be utilized for approval and construction
                      of the proposed system.</li>
                </Typography>
              </ol>
            </li>
            <li>
              Description of Structure:
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                  Roof Framing: 
                  <TextField id="outlined-basic" label="Framing" variant="outlined"/> 
              </Typography>
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                Roof Material:
                <Autocomplete
                id="combo-box-demo"
                freeSolo
                sx={{ width: 300 }}
                options={roofs}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Roof Material" />}
                />
              </Typography>
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                Roof Slope:
                <TextField id="outlined-basic" label="Slope (degrees)" variant="outlined" type="number" />
              </Typography>
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                Attic Access:
                <FormControl>
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
              </Typography>
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>Foundation:
                <TextField id="outlined-basic" label="Foundation" variant="outlined" defaultValue="Permanent"/>
              </Typography>
            </li>
            <li>
              Loading Criteria Used
              <Typography sx={{fontWeight: 'bold', fontStyle: 'normal' }}>
                <ul>
                  <li>Dead Load
                    <Typography sx={{fontStyle: 'normal' }}>
                      <ul>
                        <li>
                          Existing Roofing and framing = 
                          <TextField id="outlined-basic" label="Existing Dead Load" variant="outlined" type="number" 
                            defaultValue="7"/>
                          psf
                        </li>
                        <li>
                          New Solar Panels and Racking = 
                          <TextField id="outlined-basic" label="New Dead Load" variant="outlined" type="number"
                            defaultValue="3"/>
                          psf
                        </li>
                        <li>
                          TOTAL = 
                          GET TOTAL
                          psf
                        </li>
                      </ul>
                    </Typography>
                  </li>
                  <li>
                    Live Load =
                    <TextField id="outlined-basic" label="Live Load" variant="outlined" type="number"
                            defaultValue="20"/>
                    <Typography sx={{fontStyle: 'normal' }}>
                      psf (reducible) - 0 psf at locations of solar panels
                    </Typography>
                  </li>
                  <li>
                    Ground Snow Load = 
                    <TextField id="outlined-basic" label="Snow Load" variant="outlined" type="number"/>
                    <Typography sx={{fontStyle: 'normal' }}>psf</Typography>
                  </li>
                  <li>
                    Wind Load 
                    <Typography sx={{fontStyle: 'normal' }}>
                      based on ASCE 
                      <Autocomplete
                        id="combo-box-demo"
                        freeSolo
                        sx={{ width: 224 }}
                        options={asces}
                        disableClearable
                        renderInput={(params) => <TextField {...params} label="ASCE" />}
                      />
                    <ul>
                        <li>
                          Ultimate Windspeed = 
                          <TextField id="outlined-basic" label="Wind Speed" variant="outlined" type="number"/>
                          mph (based on Risk Category II)
                        </li>
                        <li>
                          Exposure Category
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
                        </li>
                      </ul>
                    </Typography>
                  </li>
                </ul>
              </Typography>
            </li>
            <li>
              Solar Panel Anchorage
              <Typography sx={{fontStyle: 'normal' }}>
              <ol type="1">
                <li>
                The solar panels shall be mounted in accordance with the most recent
                <Autocomplete
                  id="combo-box-demo"
                  freeSolo
                  sx={{ width: 224 }}
                  options={mount_manufacturers}
                  disableClearable
                  renderInput={(params) => <TextField {...params} label="Mount Manufacturer" />}
                />
                installation manual. If during solar panel installation, the roof framing 
                members appear unstable or deflect nonuniformly, our office should be 
                notified before proceeding with the installation.
                </li>
                <li>
                  <TextField id="outlined-basic" label="Mount Info" variant="outlined"/>
                </li>
                <li>
                  Considering the wind speed, roof slopes, size and spacing of framing members, 
                  and condition of the roof, the panel supports shall be placed no greater than
                  <Autocomplete
                    id="combo-box-demo"
                    freeSolo

                    sx={{ width: 224 }}
                    options={mount_spacing}
                    disableClearable
                    renderInput={(params) => <TextField {...params} label="Mount Spacing" />}
                  />
                  ” on center.
                </li>
              </ol>
              </Typography>
            </li>
          </ol>
        </Typography>



      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom> 
          Grid Format
        </Typography>
      </Box>

      {/* Grid Format */}
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
        <Grid >https://www.cengage.com/dashboard/#/my-dashboard/authenticated?page=
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
      <div>
      {isEditing ? (
        <TextField
          fullWidth
          multiline
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <Typography onClick={handleTextClick} 
          sx={{
              display: 'flex', 
              height: '50px',
              alignItems: 'center', 
              cursor: 'pointer',
              '&:hover': {
                outline: '1px solid rgba(0, 0, 0, 0.8)', // Change this as needed
                borderRadius: '2px' // Optional, to round the corners of the outline
              }
        }}
        >
          {text}
        </Typography>
      )}
    </div>
    </Container>
  );
}
