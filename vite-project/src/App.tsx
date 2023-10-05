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
          InputLabel,Select,MenuItem,Button,Snackbar,Alert,Typography,Container,Box, formHelperTextClasses
} from '@mui/material';

export default function App() {
  //INPUT VALUES
  const [companyName, setCompanyName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [systemSize, setSystemSize] = useState<string>("0.000");
  const [framingType, setFramingType] = useState<number>(0);
  const [framingSize, setFramingSize] = useState<string>("");
  const [framingSpacing, setFramingSpacing] = useState<string>("");
  const [otherFraming, setOtherFraming] = useState<string>("");
  const [roofMaterial, setRoofMaterial] = useState<string>("");
  const [roofSlope, setRoofSlope] = useState<number>(0);
  const [atticAccess, setAtticAccess] = useState<string>("accessible");
  const [foundation, setFoundation] = useState<string>("Permanent");
  const [existingLoad, setExistingLoad] = useState<number>(7);
  const [newLoad, setNewLoad] = useState<number>(3);
  const [totalLoad, setTotalLoad] = useState<number>(existingLoad+newLoad);
  const [liveLoad, setLiveLoad] = useState<number>(20);
  const [snowLoad, setSnowLoad] = useState<number>(0);
  const [asce, setASCE] = useState<string>("7-16");
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [exposCat, setExposCat] = useState<string>("C");
  const [code, setCode] = useState<string>("2018");
  const [codeType, setCodeType] = useState<string>(" International Residential Code");
  const [mountManufacturer, setMountManufacturer] = useState<string>("");
  const [mountType, setMountType] = useState<MountType>();
  const [mountSpacing, setMountSpacing] = useState<string>("48");

  const [text, setText] = useState('This is an editable paragraph.');

  const [generate, setGenerate] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

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

  //Interface Objects for Mount Information
  interface MountType {
    key: string;
    description: string;
  }
  
  interface MountManufacturer {
    name: string;
    mounts: MountType[];
  }

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
  
  // Mount useStates and variables
  const [selectedManufacturer, setSelectedManufacturer] = useState<MountManufacturer | null>(null);
  //if selected Manufacturer is chosen, give list of mounts associated with that manufacturer, else list all mounts by all manufacturers
  const currentMounts = selectedManufacturer ? selectedManufacturer.mounts : manufacturers.flatMap(manufacturer => manufacturer.mounts); 
  const [mountDescription, setmountDescription] = useState<string>("EMPTY DESCRIPTION");
  

  

  const handleGenerate = () => {
    setGenerate(true);
  };

  const handleCloseGenerate = () => {
    setGenerate(false);
  };

  const handleReset = () => {
    setReset(true);
    //DEFAULT VALUES
    setCompanyName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setSystemSize("0.000");
    setFramingType(0);
    setFramingSize("");
    setFramingSpacing("");
    setOtherFraming("");
    setRoofMaterial("");
    setRoofSlope(0);
    setAtticAccess("accessible");
    setFoundation("Permanent");
    setExistingLoad(7);
    setNewLoad(3);
    setTotalLoad(10);
    setLiveLoad(20);
    setSnowLoad(0);
    setASCE("7-16");
    setWindSpeed(0);
    setExposCat("C");
    setCode("2018");
    setCodeType("IRC");
    setMountManufacturer("");
    setMountSpacing("48");
  };

  const handleCloseReset = () => {
    setReset(false);
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

  //INPUT HANDLERS
  const handleCompany = (event: React.ChangeEvent<{}>, newValue: string) => {
    setCompanyName(newValue);
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  const handleState = (event: React.ChangeEvent<{}>, newValue: string) => {
    setState(newValue);
  };

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

  const handleFramingSize = (event: React.ChangeEvent<{}>, newValue: string) => {
    setFramingSize(newValue);
  };
  const handleFramingSpacing = (event: React.ChangeEvent<{}>, newValue: string) => {
    setFramingSpacing(newValue);
  };
  const handleOtherFraming = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherFraming(event.target.value);
  };
  const handleRoofMaterial = (event: React.ChangeEvent<{}>, newValue: string) => {
    setRoofMaterial(newValue);
  };

  const handleRoofSlope = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoofSlope(Number(event.target.value));
  };

  //UNEC?
  // const handleAtticAccess = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAtticAccess(event.target.value);
  // };

  const handleFoundation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoundation(event.target.value);
  };
  const handleExistingLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExistingLoad(Number(event.target.value));
    setTotalLoad(Number(event.target.value)+newLoad);
  };
  const handleNewLoad= (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoad(Number(event.target.value));
    setTotalLoad(Number(event.target.value)+existingLoad);
  };

  const handleLiveLoad= (event: React.ChangeEvent<HTMLInputElement>) => {
    setLiveLoad(Number(event.target.value));
  };
  const handleSnowLoad= (event: React.ChangeEvent<HTMLInputElement>) => {
    setSnowLoad(Number(event.target.value));
  };

  const handleASCE = (event: React.ChangeEvent<{}>, newValue: string) => {
    setASCE(newValue);
  };

  const handleWindSpeed= (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindSpeed(Number(event.target.value));
  };
  

  // //UNEC?
  // const handleExposCat= (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setExposCat(event.target.value);
  // };


  const handleCode= (event: React.ChangeEvent<{}>, newValue: string)  => {
    setCode(newValue);
  };
  // const handleCodeType= (event: React.ChangeEvent<{}>, newValue: string)  => {
  //   setCodeType(newValue);
  // };
  const handleMountManufacturer= (event: React.ChangeEvent<{}>, newValue: string) => {
    setMountManufacturer(newValue);
    //setSelectedManufacturer(typeof newValue === 'string' ? null : newValue)
  };

  // const handleMountType= (event: React.ChangeEvent<{}>, newValue: string) => {
  //   setMountType(newValue);
  //   //setSelectedManufacturer(typeof newValue === 'string' ? null : newValue)
  // };

  const handleMountSpacing= (event: React.ChangeEvent<{}>, newValue: string) => {
    setMountSpacing(newValue);
  };

  return (
    <Container maxWidth="md">+
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
            freeSolo
            sx={{ width: 300 }}
            options={companies}
            disableClearable
            value={companyName}
            onInputChange={handleCompany}
            onChange={handleCompany}
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
          <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            {/* CUSTOMER NAME INPUT */}
            <TextField id="outlined-basic" label="Last Name" variant="outlined" 
              value={lastName} onChange={handleLastName}/>
            Residence
          </Box>
        </Typography>

        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
          {/* Address INPUT */}
          <TextField id="outlined-basic" label="Address" variant="outlined" 
            value={address} onChange={handleAddress}/>
          {/* City INPUT */}
          <TextField id="outlined-basic" label="City" variant="outlined" 
            value={city} onChange={handleCity}/>
          {/* State INPUT */}
          <Autocomplete
                options={states}
                disableClearable
                value={state}
                onInputChange={handleState}
                onChange={handleState}
                renderInput={(params) => <TextField {...params} label="State" 
                />}
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
              <Box display="flex">
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                  Roof Framing: 
                  <Typography sx={{fontStyle: 'normal' }}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={framingType}
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
                        <Box display="flex" alignItems="center" gap={1}>
                            {/* Rafter Size INPUT */}
                            <Autocomplete
                              value={framingSize}
                              onInputChange={handleFramingSize}
                              onChange={handleFramingSize}
                              freeSolo
                              sx={{ width: 100 }}
                              options={rafterSize}
                              disableClearable
                              renderInput={(params) => <TextField {...params} label="Size" />}
                            /> 
                            <span>dimensional lumber at</span>
                            {/* Rafter Spacing INPUT */}
                            <Autocomplete
                              value={framingSpacing}
                              onInputChange={handleFramingSpacing}
                              onChange={handleFramingSpacing}
                              freeSolo
                              sx={{ width: 100 }}
                              options={rafterSpacing}
                              disableClearable
                              renderInput={(params) => <TextField {...params} label="Spacing" />}
                            /> 
                            <span>” on center.</span>
                        </Box>
                      }
                      {
                        // Truss INPUT
                        framingType === 1 && <>
                        <div>Prefabricated wood trusses with all truss members constructed of</div>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Autocomplete
                            value={framingSize}
                            onInputChange={handleFramingSize}
                            onChange={handleFramingSize}
                            freeSolo
                            sx={{ width: 100 }}
                            options={rafterSize}
                            disableClearable
                            renderInput={(params) => <TextField {...params} label="Size" />}
                            /> 
                            <span>dimensional lumber at</span>
                            <Autocomplete
                            value={framingSpacing}
                            onInputChange={handleFramingSpacing}
                            onChange={handleFramingSpacing}
                            freeSolo
                            sx={{ width: 100 }}
                            options={rafterSpacing}
                            disableClearable
                            renderInput={(params) => <TextField {...params} label="Spacing" />}
                            /> 
                            <span>” on center.</span>
                          </Box>
                        </>
                      }
                      {
                        // Other Framing INPUT
                        framingType === 2 && 
                        <div>
                          <TextField id="outlined-basic" label="Enter Custom Framing Here" variant="outlined" 
                            sx={{ width: 500 }} value={otherFraming} onChange={handleOtherFraming}
                          />
                        </div>
                      }
                      
                  </Typography>
              </Typography>
              </Box>
              
              
              <Typography variant="body1" sx={{ marginLeft:'25px', fontWeight: 'bold', fontStyle: 'italic' }}>
                <Box display="flex" alignItems="center" gap={1}>
                  Roof Material:
                  <Typography variant="body1" sx={{ fontStyle: 'normal' }}>
                    <Autocomplete
                    value={roofMaterial}
                    onInputChange={handleRoofMaterial}
                    onChange={handleRoofMaterial}
                    freeSolo
                    sx={{ width: 300 }}
                    options={roofs}
                    disableClearable
                    renderInput={(params) => <TextField {...params} label="Roof Material" />}
                    />
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  Roof Slope:
                  <Typography variant="body1" sx={{ fontStyle: 'normal' }}>
                    <TextField id="outlined-basic" label="Slope (degrees)" variant="outlined" type="number" 
                      value={roofSlope} onChange={handleRoofSlope}
                    />
                  </Typography>
                </Box>

              
                <Box display="flex" alignItems="center" gap={1}>
                  Attic Access:
                  <Typography variant="body1" sx={{ fontStyle: 'normal' }}>
                    <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          value={atticAccess}
                          onChange={(event) => setAtticAccess(event.target.value)}
                          defaultValue="accessible"
                          name="radio-buttons-group"
                        >
                        <FormControlLabel value="accessible" control={<Radio />} label="Accessible" />
                        <FormControlLabel value="inaccessible" control={<Radio />} label="Inaccessible" />
                      </RadioGroup>
                    </FormControl>
                  </Typography>
                </Box>
              

            
                <Box display="flex" alignItems="center" gap={1}>
                  Foundation:
                  <Typography variant="body1" sx={{ fontStyle: 'normal' }}>
                    <TextField id="outlined-basic" label="Foundation" variant="outlined" 
                    value={foundation} onChange={handleFoundation}/>
                  </Typography>
                </Box>
              
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
                          <Box display="flex" alignItems="center" gap={1}>
                            Existing Roofing and framing = 
                            <TextField id="outlined-basic" label="Existing Dead Load" variant="outlined" type="number" 
                              value={existingLoad} onChange={handleExistingLoad}/>
                            psf
                          </Box>
                        </li>
                        <li>
                          <Box display="flex" alignItems="center" gap={1}>
                            New Solar Panels and Racking = 
                            <TextField id="outlined-basic" label="New Dead Load" variant="outlined" type="number"
                              value={newLoad} onChange={handleNewLoad}/>
                            psf
                          </Box>
                        </li>
                        <li>
                          <Box display="flex" alignItems="center" gap={1}>
                            TOTAL = 
                            {" " + totalLoad + " "}
                            psf
                          </Box>
                        </li>
                      </ul>
                    </Typography>
                  </li>
                  <li>
                    <Box display="flex" alignItems="center" gap={1}>
                      Live Load =
                      <TextField id="outlined-basic" label="Live Load" variant="outlined" type="number"
                              value={liveLoad} onChange={handleLiveLoad}/>
                      <Typography sx={{fontStyle: 'normal' }}>
                        psf (reducible) - 0 psf at locations of solar panels
                      </Typography>
                    </Box>
                  </li>
                  <li>
                    <Box display="flex" alignItems="center" gap={1}>
                      Ground Snow Load = 
                      <TextField id="outlined-basic" label="Snow Load" variant="outlined" type="number"
                        value={snowLoad} onChange={handleSnowLoad}/>
                      <Typography sx={{fontStyle: 'normal' }}>psf</Typography>
                    </Box>
                  </li>
                  <li>
                    <Box display="flex" alignItems="center" gap={1}>
                      Wind Load 
                      <Typography sx={{fontStyle: 'normal' }}>
                          based on ASCE 
                      </Typography>
                      <Autocomplete
                            value={asce}
                            onInputChange={handleASCE}
                            onChange={handleASCE}
                            freeSolo
                            sx={{ width: 224 }}
                            options={asces}
                            disableClearable
                            renderInput={(params) => <TextField {...params} label="ASCE" />}
                          />
                    </Box>
                    <Typography sx={{fontStyle: 'normal' }}>
                    <ul>
                        <li>
                          <Box display="flex" alignItems="center" gap={1}>
                            Ultimate Wind Speed = 
                            <TextField id="outlined-basic" label="Wind Speed" variant="outlined" type="number"
                            value={windSpeed} onChange={handleWindSpeed}/>
                            mph (based on Risk Category II)
                          </Box>
                        </li>
                        <li>
                          <Box display="flex" alignItems="center" gap={1}>
                            <span>Exposure Category</span>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Exposure Category</InputLabel>
                              <Select
                                sx={{ width: 224 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Exposure Category"
                                value={exposCat}
                                onChange={(event) => setExposCat(event.target.value)}
                              >
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="C">C</MenuItem>
                                <MenuItem value="D">D</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </li>
                      </ul>
                    </Typography>
                  </li>
                </ul>
              </Typography>
            </li>

            {/* CODE PARAGRAPH 1 */}
            <Box display="flex" alignItems="center" gap={1}>
              <Autocomplete
                sx={{ width: 150, fontStyle:"normal",marginLeft: 'auto'}}
                value={code}
                onInputChange={handleCode}
                onChange={handleCode}
                freeSolo
                options={codes}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Code" />}
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label">Code Type</InputLabel>
                <Select
                  sx={{ width: 150, fontStyle:"normal",marginLeft: 'auto'}}
                  value={codeType == "" ? "Other" : codeType}
                  onChange={(event) => event.target.value == "Other" ? setCodeType("") : setCodeType(event.target.value)}
                  label="Exposure Category"
                >
                  <MenuItem value=" International Residential Code">IRC</MenuItem>
                  <MenuItem value=" International Building Code">IBC</MenuItem>
                  <MenuItem value="Other">Other (type full code in Code input)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="body1" paragraph
                      sx={{
                        textAlign: 'justify',
                        fontStyle: 'normal'
                      }}
                      > 
                      Based on the above evaluation, this office certifies that with the racking and mounting specified, the existing
                      roof system will adequately support the additional loading imposed by the solar system. This evaluation is in
                      conformance with the {code}{codeType}, current industry standards and practice, and
                      is based on information supplied to us at the time of this report.

            </Typography>

            {/* SECTION D */}

            <li>
            <Box display="flex" alignItems="center" gap={1}>
              Solar Panel Anchorage 
                  
                  <Autocomplete
                        freeSolo
                        sx={{ width: 150, fontStyle:"normal",marginLeft: 'auto'}}
                        options={manufacturers}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                        value={mountManufacturer}
                        onChange={(event, newValue) => setSelectedManufacturer(typeof newValue === 'string' ? null : newValue)}
                        onInputChange={handleMountManufacturer}
                        disableClearable
                        renderInput={(params) => <TextField {...params} label="Mount Manufacturer" />}
                    />
                  <Autocomplete
                      //ADD CUSTOM OPTION TO THIS SO NEW MOUNT INFO CAN BE ADDED
                      id="mount-selector"
                      options={currentMounts}
                      sx={{ width: 150, fontStyle:"normal"}}
                      getOptionLabel={(option) => typeof option === 'string' ? option : option.key}
                      value={mountType}
                      onChange={(event, newValue) => {
                        setMountType(newValue);
                        if (newValue) {
                          setmountDescription(newValue.description);
                        } else {
                          setmountDescription('');
                        }
                      }}
                      disableClearable
                      renderInput={(params) => <TextField {...params} label="Mount Type" />}
                    />
                    <Autocomplete
                      value={mountSpacing}
                      onInputChange={handleMountSpacing}
                      onChange={handleMountSpacing}
                      freeSolo
                      sx={{ width: 150, fontStyle:"normal" }}
                      options={mount_spacing}
                      disableClearable
                      defaultValue='48'
                      renderInput={(params) => <TextField {...params} label="Mount Spacing" />}
                    />
                  </Box>
              <Typography sx={{fontStyle: 'normal' }}>
              <ol type="1">
                <li> 
                  <Typography variant="body1" paragraph
                    sx={{
                      textAlign: 'justify',
                    }}
                  > 
                  The solar panels shall be mounted in accordance with the most recent {mountManufacturer + " "} 
                  installation manual. If during solar panel installation, the roof framing 
                  members appear unstable or deflect nonuniformly, our office should be 
                  notified before proceeding with the installation.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph
                    sx={{
                      textAlign: 'justify',
                    }}
                  > 
                  {mountDescription}
                  </Typography>
                </li>
                <li>
                  <Box display="flex" alignItems="center" gap={1}>
                    Considering the wind speed, roof slopes, size and spacing of framing members, 
                    and condition of the roof, the panel supports shall be placed no greater than
                    {" " + mountSpacing}
                    ” on center.
                  </Box>
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
          conformance with the {code} {codeType}, current industry standards and practice, and
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
            freeSolo
            options={companies}
            disableClearable
            value={companyName}
            onInputChange={handleCompany}
            onChange={handleCompany}
            renderInput={(params) => <TextField {...params} label="Company Name" />}
          />
          </Grid>
        <Grid item xs={3}>
          {/* CUSTOMER NAME INPUT */}
          <TextField id="outlined-basic" label="Last Name" variant="outlined" 
            value={lastName} onChange={handleLastName}/>
        </Grid>
        <Grid item xs={3}>
          {/* CUSTOMER ADDRESS INPUT */}
          <TextField id="outlined-basic" label="Address" variant="outlined" 
            value={address} onChange={handleAddress}/>
        </Grid>
        <Grid item xs={3}>
          {/* City INPUT */}
          <TextField id="outlined-basic" label="City" variant="outlined"
            value={city} onChange={handleCity}/>
        </Grid>
        <Grid item xs={3}>
          {/* State INPUT */}
          <Autocomplete
                options={states}
                disableClearable
                value={state}
                onInputChange={handleState}
                onChange={handleState}
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
                value={framingType}
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
                  value={framingSize}
                  onInputChange={handleFramingSize}
                  onChange={handleFramingSize}
                  freeSolo
                  options={rafterSize}
                  disableClearable
                  renderInput={(params) => <TextField {...params} label="Size" />}
                /> 
              </Grid>
              <Grid item xs={2}>
                {/* Rafter Spacing INPUT */}
                <Autocomplete
                  value={framingSpacing}
                  onInputChange={handleFramingSpacing}
                  onChange={handleFramingSpacing}
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
                value={framingSize}
                onInputChange={handleFramingSize}
                onChange={handleFramingSize}
                freeSolo
                options={rafterSize}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Size" />}
                /> 
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                value={framingSpacing}
                onInputChange={handleFramingSpacing}
                onChange={handleFramingSpacing}
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
              <TextField id="outlined-basic" label="Enter Custom Framing Here" variant="outlined"
                value={otherFraming} onChange={handleOtherFraming}
                />
            </Grid>
          }
        <Grid item xs={4}>
          {/* Roof Material */}
          <Autocomplete
                value={roofMaterial}
                onInputChange={handleRoofMaterial}
                onChange={handleRoofMaterial}
                freeSolo
                options={roofs}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Roof Material" />}
              />
        </Grid>
        <Grid item xs={3}>
          {/* Roof Slope */}
          <TextField id="outlined-basic" label="Slope (degrees)" variant="outlined" 
          type="number" value={roofSlope} onChange={handleRoofSlope}/>
        </Grid>
        <Grid item xs={4}>
          {/* Attic Access */}
          <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Attic Access</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                value={atticAccess}
                onChange={(event) => setAtticAccess(event.target.value)}
                name="radio-buttons-group"
              >
              <FormControlLabel value="accessible" control={<Radio />} label="Accessible" />
              <FormControlLabel value="inaccessible" control={<Radio />} label="Inaccessible" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="Foundation" variant="outlined" 
            value={foundation} onChange={handleFoundation}
          />
        </Grid>
        <Grid item xs={3}>
          {/* Existing Dead Load */}
          <TextField id="outlined-basic" label="Existing Dead Load" variant="outlined" type="number" 
              value={existingLoad} onChange={handleExistingLoad}
              />
        </Grid>
        <Grid item xs={3}>
          {/* New Dead Load */}
          <TextField id="outlined-basic" label="New Dead Load" variant="outlined" type="number"
             value={newLoad} onChange={handleNewLoad}
             />
        </Grid>
        <Grid item xs={3}>
          <TextField id="outlined-basic" label="Live Load" variant="outlined" type="number"
            value={liveLoad} onChange={handleLiveLoad}/>
        </Grid>
        <Grid item xs={3}>
          {/* Snow Load */}
          <TextField id="outlined-basic" label="Snow Load" variant="outlined" type="number"
            value={snowLoad} onChange={handleSnowLoad}/>
        </Grid>
        <Grid item xs={3}>
          {/* ASCE */}
          <Autocomplete
            value={asce}
            onInputChange={handleASCE}
            onChange={handleASCE}
            freeSolo
            options={asces}
            disableClearable
            renderInput={(params) => <TextField {...params} label="ASCE" />}
              />
        </Grid>
        <Grid item xs={3}>
          {/* Wind Speed */}
          <TextField id="outlined-basic" label="Wind Speed" variant="outlined" type="number"
            value={windSpeed} onChange={handleWindSpeed}/>
        </Grid>
        <Grid item xs={3}>
          {/* Exposure Category */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Exposure Category</InputLabel>
            <Select
              
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Exposure Category"
              value={exposCat}
              onChange={(event) => setExposCat(event.target.value)}
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
              value={code}
              onInputChange={handleCode}
              onChange={handleCode}
              freeSolo
              options={codes}
              disableClearable
              renderInput={(params) => <TextField {...params} label="Code" />}
            />
        </Grid>
        <Grid item xs={3}>
          {/* Code Type*/}
          <FormControl>
                <InputLabel id="demo-simple-select-label">Code Type</InputLabel>
                <Select
                  sx={{ width: 150, fontStyle:"normal",marginLeft: 'auto'}}
                  value={codeType == "" ? "Other" : codeType}
                  onChange={(event) => event.target.value == "Other" ? setCodeType("") : setCodeType(event.target.value)}
                  label="Exposure Category"
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
            
            freeSolo
            options={manufacturers}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
            value={mountManufacturer}
            onChange={(event, newValue) => setSelectedManufacturer(typeof newValue === 'string' ? null : newValue)}
            onInputChange={handleMountManufacturer}
            disableClearable
            renderInput={(params) => <TextField {...params} label="Mount Manufacturer" />}
          />
        </Grid>
        <Grid item xs={3}>
          {/* Mount Description */}
          <Autocomplete
            id="mount-selector"
            options={currentMounts}
            value={mountType}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.key}
            onChange={(event, newValue) => {
              setMountType(newValue);
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
              value={mountSpacing}
              onInputChange={handleMountSpacing}
              onChange={handleMountSpacing}
              freeSolo
              options={mount_spacing}
              disableClearable
              renderInput={(params) => <TextField {...params} label="Mount Spacing" />}
            />
        </Grid>
      </Grid>

      {/* Generate Button */}

      <Box display="flex" alignItems="center" gap={1}>
        <Button style={{ margin: 50 }}  variant="contained" onClick={handleGenerate}> Generate</Button>
        <Snackbar
          open={generate}
          autoHideDuration={5000}
          onClose={handleCloseGenerate}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseGenerate}
            severity="success"
          >
            PDF Generated!
          </Alert>
        </Snackbar>

      {/* Reset Button */}

        <Button style={{ margin: 50 }}  variant="contained" onClick={handleReset}> Reset</Button>
        <Snackbar
          open={reset}
          autoHideDuration={5000}
          onClose={handleCloseReset}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseReset}
            severity="info"
          >
            Reset
          </Alert>
        </Snackbar>
      </Box>

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
