/* -- TODO: --*/
/*
  REQUIREMENTS:
  * Use at least 5 Material UI components and a few of their props each. ✔️

  * Conditionally render some JSX based on the value of a useState variable. 
        Use a Material UI component to also change the value of that useState variable, 
      such as a Button to toggle a boolean. ✔️
        (maybe did this already, but add a submit button that does a toast 
          pop up when clicked to submit the form)

  * Properly define your TypeScript types. ✔️ (double check this when done)
          
  * Create a small array of objects with at least two key/value pairs and map over 
    the array to render the objects as individual JSX elements. ✔️
    (implement this with mount info and make a map of mount types to their info 
      (each their own object perhaps))

  * Be prepared to locally host your application in your browser and share your screen. ✔️ 
      (npm run dev)
  
  OTHER:
      * CLEAN UP CODE
      * don't let submit unless all fields are filled out
      * fix formatting of letter
      * Have corresponding values update across letter and grid 
      * make more Object Oriented
*/

import { useState } from 'react'
import { TextField,Grid,Autocomplete,RadioGroup,Radio,FormControlLabel,FormControl,FormLabel,
          InputLabel,Select,MenuItem,Button,Snackbar,Alert,Typography,Container,Box
} from '@mui/material';

export default function App() {
  const [systemSize, setSystemSize] = useState<string>("0.000");
  const [generate, setGenerate] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('This is an editable paragraph.');
  const [framingType, setFramingType] = useState<number>(0);

  //BASIC DATA
  const companies: string[] = [
    "Current", "Suntuity", "Ecovole", "Ecosmart"
  ];
  
  const states: string[] = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const rafterSize: string[] = [
    "2x4", "2x6", "2x8", "2x10", 
    "2x12"
  ];

  const rafterSpacing: string[] = [
    "16", "24"
  ];

  const roofs: string[] = [
    "Composite Asphalt Shingle", "Rolled Composite Asphalt", "Tile Roofing", "Metal Roofing", 
    "Membrane Roofing", "Tar and Gravel"
  ];

  const asces: string[] = [
    "7-98", "7-05", "7-10", "7-16"
  ];

  const codes: string[] = [
    "2015", "2018", "2021"
  ];

  const mount_spacing: string[] = [
    "48", "72", "24"
  ];

  const lagScrewLanguage: string = `
    The maximum allowable withdrawal force for a 5/16” lag screw is 229 lbs per inch of penetration as 
    identified in the National Design Standards (NDS) of timber construction specifications. Based on 
    a minimum penetration depth of 2½”, the allowable capacity per connection is greater than the 
    design withdrawal force (demand). Considering the variable factors for the existing roof framing 
    and installation tolerances, the connection using one 5/16” diameter lag screw with a minimum of 
    2½” embedment will be adequate and will include a sufficient factor of safety.
  `;

  const manufacturers: MountManufacturer[] = [
    {
      name: 'Ecofasten',
      mounts: [
        { key: 'Deck Mount', description: 'ECO Description for Deck Mount' },
        { key: 'Lag Screw', description: lagScrewLanguage },
        { key: 'Smart Slide', description: 'ECO Description for Smart Slide' },
      ],
    },
    {
      name: 'Unirac',
      mounts: [
        { key: 'Deck Mount', description: 'UN Description for Deck Mount' },
        { key: 'Lag Screw', description: lagScrewLanguage },
      ],
    },
    {
      name: 'Iron Ridge',
      mounts: [
        { key: 'Deck Mount', description: 'IR Description for Deck Mount' },
        { key: 'Lag Screw', description: lagScrewLanguage },
      ],
    },
    {
      name: 'Roof Tech',
      mounts: [
        { key: 'RT Mini', description: 'RT Mini Description' },
      ],
    },
  ];

  //Interface Objects for Mounts
  interface MountType {
    key: string;
    description: string;
  }
  
  interface MountManufacturer {
    name: string;
    mounts: MountType[];
  }
  
  // Mount useStates and variables
  const [selectedManufacturer, setSelectedManufacturer] = useState<MountManufacturer | null>(null);
  const currentMounts = selectedManufacturer ? selectedManufacturer.mounts : manufacturers.flatMap(manufacturer => manufacturer.mounts);
  const [mountDescription, setmountDescription] = useState<string>("EMPTY DESCRIPTION");
  

  const handleSystemSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      setSystemSize(newValue.toString());
    } else {
      setSystemSize("0.000");
    }
  };

  const updateSigFigs = (event: React.FocusEvent<HTMLInputElement>) => {
    let newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      setSystemSize(newValue.toFixed(3));
    } else {
      setSystemSize("0.000");
    }
  };

  const handleGenerate = () => {
    setGenerate(true);
  };

  const handleCloseSnackBar = () => {
    setGenerate(false);
  };

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      {/* LETTER FORMAT */}

      <Box sx={{ my: 10 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom align="center"> 
          Letterhead goes HERE
        </Typography>
      </Box>

      {/* COMPANY & COMPANY ADDRESS */}

      <Box>
        <Typography>
          {/* COMPANY NAME INPUT */}
          <Autocomplete
          id="combo-box-demo"
          freeSolo
          sx={{ width: 300 }}
          options={companies}
          disableClearable
          renderInput={(params) => <TextField {...params} label="Company Name" />}
          />
        </Typography>
        <Typography>
          <div>Company Address </div>
          <div>UPDATES based on Company Name</div>
        </Typography>
      </Box>
      
      {/* CUSTOMER & CUSTOMER ADDRESS */}

      <Box>
        <Typography variant="body1" sx={{
            textAlign: 'right',
          }}> 
          <div>Re: Engineering Services</div>
          {/* CUSTOMER NAME INPUT */}
          <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
          Residence
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          {/* Address INPUT */}
          <TextField id="outlined-basic" label="Address" variant="outlined"/>
          {/* City INPUT */}
          <TextField id="outlined-basic" label="City" variant="outlined"/>
          {/* State INPUT */}
          <Autocomplete
                id="combo-box-demo"
                options={states}
                disableClearable
                renderInput={(params) => <TextField {...params} label="State" />}
              />
        </Box>

        <Box display="flex" justifyContent="flex-end">
          {/* System Size INPUT */}
          <TextField id="outlined-basic" label="System Size" variant="outlined" 
                type="number" 
                defaultValue="0.000"
                value={systemSize}
                onChange={handleSystemSizeChange}
                onBlur={updateSigFigs}
                inputProps={{
                  step: "0.001"
                }}/>
        </Box>
      </Box>

      {/* LETTER BODY */}

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

            {/* SECTION A */}

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

            {/* SECTION B */}

            <li>
              Description of Structure:
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                  Roof Framing: 
                  <Typography sx={{fontStyle: 'normal' }}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={framingType}
                            name="radio-buttons-group"
                            onChange={(event) => setFramingType(Number(event.target.value))}
                          >
                          <FormControlLabel value={0} control={<Radio />} label="Rafters" />
                          <FormControlLabel value={1} control={<Radio />} label="Trusses" />
                          <FormControlLabel value={2} control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                      {
                        // Rafters INPUT
                        framingType === 0 && 
                          <div>
                            {/* Rafter Size INPUT */}
                            <Autocomplete
                              id="combo-box-demo"
                              freeSolo
                              sx={{ width: 100 }}
                              options={rafterSize}
                              disableClearable
                              renderInput={(params) => <TextField {...params} label="Size" />}
                            /> 
                            dimensional lumber at
                            {/* Rafter Spacing INPUT */}
                            <Autocomplete
                              id="combo-box-demo"
                              freeSolo
                              sx={{ width: 100 }}
                              options={rafterSpacing}
                              disableClearable
                              renderInput={(params) => <TextField {...params} label="Spacing" />}
                            /> 
                            ” on center.
                          </div>
                      }
                      {
                        // Truss INPUT
                        framingType === 1 && 
                        <div>
                          Prefabricated wood trusses with all truss members constructed of
                          <Autocomplete
                          id="combo-box-demo"
                          freeSolo
                          sx={{ width: 100 }}
                          options={rafterSize}
                          disableClearable
                          renderInput={(params) => <TextField {...params} label="Size" />}
                          /> 
                          dimensional lumber at
                          <Autocomplete
                          id="combo-box-demo"
                          freeSolo
                          sx={{ width: 100 }}
                          options={rafterSpacing}
                          disableClearable
                          renderInput={(params) => <TextField {...params} label="Spacing" />}
                          /> 
                          ” on center.
                        </div>
                      }
                      {
                        // Other Framing INPUT
                        framingType === 2 && 
                        <div>
                          <TextField id="outlined-basic" label="Framing" variant="outlined"/>
                        </div>
                      }
                  </Typography>
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

              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                Foundation:
                <TextField id="outlined-basic" label="Foundation" variant="outlined" defaultValue="Permanent"/>
              </Typography>
            </li>

            {/* SECTION C */}

            <li>
              Loading Criteria Used
              <Typography sx={{fontWeight: 'bold', fontStyle: 'normal' }}>
                <ul>
                  <li>
                    Dead Load
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
                          Ultimate Wind Speed = 
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

            {/* CODE PARAGRAPH 1 */}

            <Typography variant="body1" paragraph
                      sx={{
                        textAlign: 'justify',
                        fontStyle: 'normal'
                      }}
                      > 
                      Based on the above evaluation, this office certifies that with the racking and mounting specified, the existing
                      roof system will adequately support the additional loading imposed by the solar system. This evaluation is in
                      conformance with the 2018 IRC with New Jersey Amendments, current industry standards and practice, and
                      is based on information supplied to us at the time of this report.

            </Typography>

            {/* SECTION D */}

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
                    options={manufacturers}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    onChange={(event, newValue) => setSelectedManufacturer(typeof newValue === 'string' ? null : newValue)}
                    disableClearable
                    renderInput={(params) => <TextField {...params} label="Mount Manufacturer" />}
                  />
                installation manual. If during solar panel installation, the roof framing 
                members appear unstable or deflect nonuniformly, our office should be 
                notified before proceeding with the installation.
                </li>

                <li>
                  <Autocomplete
                      id="mount-selector"
                      options={currentMounts}
                      getOptionLabel={(option) => typeof option === 'string' ? option : option.key}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setmountDescription(newValue.description);
                        } else {
                          setmountDescription('');
                        }
                      }}
                      disableClearable
                      renderInput={(params) => <TextField {...params} label="Mount Type" />}
                    />
                  <Typography variant="body1" paragraph
                    sx={{
                      textAlign: 'justify',
                    }}
                  > 
                  {mountDescription}
                  </Typography>
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
                    defaultValue='48'
                    renderInput={(params) => <TextField {...params} label="Mount Spacing" />}
                  />
                  ” on center.
                </li>
              </ol>
              </Typography>
            </li>
          </ol>
        </Typography>

        {/* CODE PARAGRAPH 2 */}

        <Typography variant="body1" paragraph
          sx={{
            textAlign: 'justify',
          }}
        > 
          Based on the above evaluation, this office certifies that with the racking and mounting specified, the existing
          roof system will adequately support the additional loading imposed by the solar system. This evaluation is in
          conformance with the 2018 IRC with New Jersey Amendments, current industry standards and practice, and
          is based on information supplied to us at the time of this report.

        </Typography>

        {/* SIGNATURE AND STAMP SECTION */}

        <Typography variant="body1" paragraph
          sx={{
            textAlign: 'justify',
          }}
        > 
          Should you have any questions regarding the above or if you require further information do not hesitate to
          contact me.
        </Typography>

        <Typography variant="body1" paragraph
          sx={{
            textAlign: 'justify',
          }}
        > 
          Very truly yours,
        </Typography>

        <Typography variant="h4" paragraph
          sx={{
            textAlign: 'justify',
            fontWeight: 'bold'
          }}
        > 
          SIGNATURE
        </Typography>

        <Typography variant="body1" paragraph
          sx={{
            textAlign: 'justify',
          }}
        > 
          <div>Scott E. Wyssling, PE</div>
          <div><b>LICENSE NUMBER UPDATES BASED ON STATE CHOSEN (THROUGH DB)</b></div>
          <div><b>COA UPDATES BASED ON STATE CHOSEN (THROUGH DB)</b></div>
          
        </Typography>
      </Box>

      <br></br>
      <br></br>
      <br></br>

      {/* GRID FORMAT */}

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom> 
          Grid Format
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          {/* COMPANY NAME INPUT */}
          <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={companies}
            disableClearable
            renderInput={(params) => <TextField {...params} label="Company Name" />}
            />
          </Grid>
        <Grid item xs={3}>
          {/* CUSTOMER NAME INPUT */}
          <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
        </Grid>
        <Grid item xs={3}>
          {/* CUSTOMER ADDRESS INPUT */}
          <TextField id="outlined-basic" label="Address" variant="outlined"/>
        </Grid>
        <Grid item xs={3}>
          {/* City INPUT */}
          <TextField id="outlined-basic" label="City" variant="outlined"/>
        </Grid>
        <Grid item xs={3}>
          {/* State INPUT */}
          <Autocomplete
                id="combo-box-demo"
                options={states}
                disableClearable
                renderInput={(params) => <TextField {...params} label="State" />}
              />
        </Grid>
        <Grid item xs={3}>
          {/* System Size INPUT */}
          <TextField id="outlined-basic" label="System Size" variant="outlined" 
                type="number" 
                defaultValue="0.000"
                value={systemSize}
                onChange={handleSystemSizeChange}
                onBlur={updateSigFigs}
                inputProps={{
                  step: "0.001"
                }}/>
        </Grid>
        <Grid item xs={5}>
          <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={framingType}
                name="radio-buttons-group"
                onChange={(event) => setFramingType(Number(event.target.value))}
              >
              <FormControlLabel value={0} control={<Radio />} label="Rafters" />
              <FormControlLabel value={1} control={<Radio />} label="Trusses" />
              <FormControlLabel value={2} control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>
          {
            // Rafters INPUT
            framingType === 0 && 
            <>
              <Grid item xs={2}>
                {/* Rafter Size INPUT */}
                <Autocomplete
                  id="combo-box-demo"
                  freeSolo
                  options={rafterSize}
                  disableClearable
                  renderInput={(params) => <TextField {...params} label="Size" />}
                /> 
              </Grid>
              <Grid item xs={2}>
                {/* Rafter Spacing INPUT */}
                <Autocomplete
                  id="combo-box-demo"
                  freeSolo
                  options={rafterSpacing}
                  disableClearable
                  renderInput={(params) => <TextField {...params} label="Spacing" />}
                /> 
              </Grid>
            </>
          }
          {
            // Truss INPUT
            framingType === 1 && 
            <>
              <Grid item xs={2}>
                <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={rafterSize}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Size" />}
                /> 
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={rafterSpacing}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Spacing" />}
                /> 
              </Grid>
            </>
          }
          {
            // Other Framing INPUT
            framingType === 2 && 
            <Grid item xs={4}>
              <TextField id="outlined-basic" label="Framing" variant="outlined"/>
            </Grid>
          }
        <Grid item xs={4}>
          {/* Roof Material */}
          <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={roofs}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Roof Material" />}
              />
        </Grid>
        <Grid item xs={3}>
          {/* Roof Slope */}
          <TextField id="outlined-basic" label="Slope (degrees)" variant="outlined" type="number" />
        </Grid>
        <Grid item xs={4}>
          {/* Attic Access */}
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
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="Foundation" variant="outlined" defaultValue="Permanent"/>
        </Grid>
        <Grid item xs={3}>
          {/* Existing Dead Load */}
          <TextField id="outlined-basic" label="Existing Dead Load" variant="outlined" type="number" 
              defaultValue="7"/>
        </Grid>
        <Grid item xs={3}>
          {/* New Dead Load */}
          <TextField id="outlined-basic" label="New Dead Load" variant="outlined" type="number"
              defaultValue="3"/>
        </Grid>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="Live Load" variant="outlined" type="number"
                            defaultValue="20"/>
        </Grid>
        <Grid item xs={3}>
          {/* Snow Load */}
          <TextField id="outlined-basic" label="Snow Load" variant="outlined" type="number"/>
        </Grid>
        <Grid item xs={3}>
          {/* ASCE */}
          <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={asces}
            disableClearable
            renderInput={(params) => <TextField {...params} label="ASCE" />}
              />
        </Grid>
        <Grid item xs={3}>
          {/* Wind Speed */}
          <TextField id="outlined-basic" label="Wind Speed" variant="outlined" type="number"/>
        </Grid>
        <Grid item xs={3}>
          {/* Exposure Category */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Exposure Category</InputLabel>
            <Select
              
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
        <Grid item xs={3}>
          {/* Code */}
          <Autocomplete
              id="combo-box-demo"
              freeSolo
              
              options={codes}
              disableClearable
              renderInput={(params) => <TextField {...params} label="Code" />}
            />
        </Grid>
        <Grid item xs={3}>
          {/* Code Type*/}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Code Type</InputLabel>
            <Select
            
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
        <Grid item xs={4}>
          {/* Mount Manufacturer */}
          <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={manufacturers}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
            onChange={(event, newValue) => setSelectedManufacturer(typeof newValue === 'string' ? null : newValue)}
            disableClearable
            renderInput={(params) => <TextField {...params} label="Mount Manufacturer" />}
          />
        </Grid>
        <Grid item xs={3}>
          {/* Mount Description */}
          <Autocomplete
            id="mount-selector"
            options={currentMounts}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.key}
            onChange={(event, newValue) => {
              if (newValue) {
                setmountDescription(newValue.description);
              } else {
                setmountDescription('');
              }
            }}
            disableClearable
            renderInput={(params) => <TextField {...params} label="Mount Type" />}
          />
        </Grid>
        <Grid item xs={3}>
          {/* Mount Spacing */}
          <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={mount_spacing}
              disableClearable
              renderInput={(params) => <TextField {...params} label="Mount Spacing" />}
            />
        </Grid>
      </Grid>

      {/* Generate Button */}

      <div>
        <Button style={{ margin: 50 }}  variant="contained" onClick={handleGenerate}> Generate</Button>
        <Snackbar
          open={generate}
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

      {/* EDITABLE TEXT BOX */}

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
          <Typography onClick={handleTextClick} gutterBottom 
            sx={{
                display: 'flex', 
                height: '50px',
                alignItems: 'center', 
                cursor: 'pointer',
                '&:hover': {
                  outline: '1px solid rgba(0, 0, 0, 0.8)', 
                  borderRadius: '2px' 
                }
          }}
          >
            {text}
          </Typography>
        )}
    </div>

    <br></br>
    <br></br>
    <br></br>

    {/* Full Mount Info stored in Data */}

    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom> 
        Full Mount Info
      </Typography>
    </Box>
    {
      manufacturers.map(manufacturer => (
        <div>
          <Typography variant="h6" fontWeight="bold">
            {manufacturer.name}
          </Typography>
          {manufacturer.mounts.map(mount => (
            <Typography variant="body1" key={mount.key}>
              {mount.key}: {mount.description}
            </Typography>
          ))}
        </div>
      ))
    }

    <br></br>
    <br></br>
    <br></br>

    </Container>
  );
}
