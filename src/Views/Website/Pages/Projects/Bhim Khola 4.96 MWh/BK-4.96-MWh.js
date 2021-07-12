import React from "react";
import "./BK-4.96-MWh.scss";
import Navigationbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import {Image} from 'react-bootstrap'
import IMG3 from "../../../../../Assets/IMG3.jpg";


class HBK extends React.Component {
  render() {
    return (
      <div id="lbk">
        <Navigationbar />
        <div className="center">
          <div className="title">
            <h3>BHIM KHOLA SMALL HYDROPOWER PROJECT</h3>
            <p>4.96MW</p>
          </div>
          <div className="imagebox">
            <div className="full-image">
              <Image
                src={IMG3}
                thumbnail
              />
            </div>
            <div className="description">
              <h4>1.1 Introduction</h4>
              <p>
                Bhim Khola Small Hydroelectric Project (BKSHEP) is a
                run-of-river type project located in Baglung District in the
                Western Development Region of Nepal with installed capacity of
                4.96 MW that will generate an estimated 28.4 GWh energy
                annually. The design discharge of the project is 3.5 m3/s at 40%
                exceedance flow. The project headworks is located on right bank
                of Bhim river, from where design flow is diverted from Intake –
                Gravel trap -settling basin to power house through 2723 m long
                headrace pipe and 252 m penstock pipe between. The flow then
                passes to 2 units of horizontal axis Pelton turbines and
                generating 4.96 MW power. All the structures from headworks to
                powerhouse – tailrace canal is located along the right bank of
                Bhim river. The generated energy is proposed to be evacuated to
                Bastu substation by construction of about 18 km long 33 kV
                transmission line.
              </p>
              <h4>1.2 Salient Features of the Project General</h4>
              <h5>1. Project Location</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Development Region</td>:<td>Western</td>
                  </tr>
                  <tr>
                    <td>Zone</td>:<td>Dhaulagiri</td>
                  </tr>
                  <tr>
                    <td>District</td>:<td>Baglung</td>
                  </tr>
                  <tr>
                    <td>VDCs</td>:<td>Ranasingkiteni and Bhimgithhe</td>
                  </tr>
                  <p className="tablesubtitle">Geographical Co-ordinates</p>
                  <tr>
                    <td>Latitude</td>:<td>28º 17’ 05” to 28º 17’ 42”</td>
                  </tr>
                  <tr>
                    <td>Longitude</td>:<td>83º 12’ 54” to 83º 14’ 40”</td>
                  </tr>
                </tbody>
              </table>
              <h5>2. General</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Name of River</td> : <td>Bhim Khola </td>
                  </tr>
                  <tr>
                    <td>Nearest Town</td> : <td>Baglung Bazzar</td>
                  </tr>
                  <tr>
                    <td>Type of Scheme</td> : <td>RoR</td>
                  </tr>
                  <tr>
                    <td>Gross Head</td> : <td>180 m</td>
                  </tr>
                  <tr>
                    <td>Net Head</td> : <td>167.64 m</td>
                  </tr>
                  <tr>
                    <td>Installed Capacity</td> : <td>4.96 MW</td>
                  </tr>
                  <tr>
                    <td>Average Annual Energy</td> :<td>28.4 GWh</td>
                  </tr>
                  <p className="tablesubtitle">Outage </p>
                  <tr>
                    <td>Dry Energy</td> : <td>5.23 GWh</td>
                  </tr>
                  <tr>
                    <td>Wet Energy</td> : <td>23.17 GWh</td>
                  </tr>
                </tbody>
              </table>
              <h5>3. Hydrology</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Catchment Area</td> : <td>76 Km²</td>
                  </tr>
                  <tr>
                    <td>Mean Annual Discharge</td> : <td>6.35 m³/sec</td>
                  </tr>
                  <tr>
                    <td>Design Discharge (at 40% PoE) </td> :{" "}
                    <td>3.5 m³/sec</td>
                  </tr>
                  <tr>
                    <td>Riparian Release</td> : <td>0.098 m³/sec</td>
                  </tr>
                  <tr>
                    <td>Design Flood Discharge (100Yrs) </td> :{" "}
                    <td>324.1 m³/sec </td>
                  </tr>
                  <tr>
                    <td>Average Annual Precipitation</td> : <td>1900 mm</td>
                  </tr>
                </tbody>
              </table>
              <h5>4. Diversion Weir</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type of Weir</td> : <td>Boulder lined weir</td>
                  </tr>
                  <tr>
                    <td>Length of Weir</td> : <td>16 m</td>
                  </tr>
                  <tr>
                    <td>Height of Weir</td> : <td>4.2 m (from river bed) </td>
                  </tr>
                  <tr>
                    <td>Crest Elevation</td> : <td>1375 amsl </td>
                  </tr>
                  <tr>
                    <td>Undersluice Opening (W × H) </td> : <td>2.0 × 2.0 m</td>
                  </tr>
                  <tr>
                    <td>Undersluice Crest Level</td> : <td>1371.54 amsl</td>
                  </tr>
                </tbody>
              </table>
              <h5>5. Intake Structure cum Gravel Trap</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type of Intake</td> : <td>Orifice Side Intake</td>
                  </tr>
                  <tr>
                    <td>No. of Openings</td> : <td>2</td>
                  </tr>
                  <tr>
                    <td>Size of Intake (W × H) </td> :{" "}
                    <td>1.6 m × 1.4 m each </td>
                  </tr>
                  <tr>
                    <td>Intake Sill Level</td> : <td>1373.3 amsl</td>
                  </tr>
                  <tr>
                    <td>Length of Gravel Trap</td> : <td>6.2 m</td>
                  </tr>
                  <tr>
                    <td>Width of Gravel Trap </td> : <td>3 m</td>
                  </tr>
                  <tr>
                    <td>Overall depth </td> : <td>2.3 m</td>
                  </tr>
                  <tr>
                    <td>Particle size to be trapped</td> : <td>5 mm</td>
                  </tr>
                  <tr>
                    <td>Flushing Pipe</td> : <td>0.8 Ø, 15 m</td>
                  </tr>
                </tbody>
              </table>
              <h5>6. Approach Canal</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Length</td> : <td>90 m</td>
                  </tr>
                  <tr>
                    <td>Type</td> : <td>RCC, Box Canal</td>
                  </tr>
                  <tr>
                    <td>Width</td> : <td>2 m</td>
                  </tr>
                  <tr>
                    <td>Heignt</td> : <td>1.2 m</td>
                  </tr>
                </tbody>
              </table>
              <h5>7. Settling Basin</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> :{" "}
                    <td>Conventional with intermittent flushing</td>
                  </tr>
                  <tr>
                    <td>Nos. of bay</td> : <td>2</td>
                  </tr>
                  <tr>
                    <td>Dimension (L × B × H) </td> :{" "}
                    <td>35.0 m × 4.2 m × (4.5-5.5) m</td>
                  </tr>
                  <tr>
                    <td>Inlet Transition Length</td> : <td>15 m</td>
                  </tr>
                  <tr>
                    <td>Particle Size to be settled</td> : <td>0.2 mm</td>
                  </tr>
                  <tr>
                    <td>Trapping Efficiency</td> : <td>98 %</td>
                  </tr>
                  <tr>
                    <td>No. of Inlet Gates</td> : <td>2</td>
                  </tr>
                  <tr>
                    <td>Type of outlet</td> : <td>Orifice type outlet</td>
                  </tr>
                </tbody>
              </table>
              <h5>8. Headrace Pipe</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Internal Diameter</td> : <td>1.3 m </td>
                  </tr>
                  <tr>
                    <td>Length</td> : <td>2723 m (1.3 Ø) </td>
                  </tr>
                  <tr>
                    <td>Thickness</td> : <td>8 mm to 10 mm</td>
                  </tr>
                </tbody>
              </table>
              <h5>9. Surge Tank</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> :{" "}
                    <td>Sub- Surface, Concrete, with surge pipe</td>
                  </tr>
                  <tr>
                    <td>Height</td> : <td>28.43 m</td>
                  </tr>
                  <tr>
                    <td>Internal Diameter</td> : <td>5.0 m</td>
                  </tr>
                  <tr>
                    <td>Wall Thickness</td> :{" "}
                    <td>1m at bottom to 0.3m at top</td>
                  </tr>
                  <tr>
                    <td>Normal Water Level</td> : <td>1369.06 amsl</td>
                  </tr>
                  <tr>
                    <td>Upsurge Level</td> : <td>1383.51 amsl</td>
                  </tr>
                  <tr>
                    <td>Downsurge Level</td> : <td>1362.91 amsl</td>
                  </tr>
                  <tr>
                    <td>Nos. of Anchor Blocks</td> : <td>41</td>
                  </tr>
                </tbody>
              </table>
              <h5>10. Steel Penstock Pipe</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> : <td>Mild Steel</td>
                  </tr>
                  <tr>
                    <td>Internal Diameter</td> : <td>1.3 m</td>
                  </tr>
                  <tr>
                    <td>Length</td> : <td>252 m</td>
                  </tr>
                  <tr>
                    <td>Steel Thickness</td> : <td>10 to 18 mm</td>
                  </tr>
                  <tr>
                    <td>Nos. of Anchor Blocks</td> : <td>4</td>
                  </tr>
                </tbody>
              </table>
              <h5>11. Powerhouse</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> : <td>Sub-Surface</td>
                  </tr>
                  <tr>
                    <td>Size (L × W) </td> :
                    <td>28 m × 14.2 m (with control room) </td>
                  </tr>
                  <tr>
                    <td>Height</td> : <td>18 m</td>
                  </tr>
                </tbody>
              </table>
              <h5>12. Tailrace</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> : <td>Concrete, Box canal</td>
                  </tr>
                  <tr>
                    <td>Tailrace Length</td> : <td>108 m</td>
                  </tr>
                  <tr>
                    <td>Size (W × D) </td> : <td>2.0 × 2.0 m</td>
                  </tr>
                  <tr>
                    <td>Tailrace Water Level</td> : <td>1195 amsl</td>
                  </tr>
                </tbody>
              </table>
              <h5>13. Turbine</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> : <td>Horizontal Pelton Turbine</td>
                  </tr>
                  <tr>
                    <td>Number</td> : <td>2</td>
                  </tr>
                  <tr>
                    <td>Rated Output Capacity per unit</td> : <td>2620 kW</td>
                  </tr>
                  <tr>
                    <td>Turbine Axis Level</td> : <td>1195 amsl</td>
                  </tr>
                  <tr>
                    <td>Net Head</td> : <td>167.64 m </td>
                  </tr>
                  <tr>
                    <td>Discharge per Unit</td> : <td>1.75 m³/sec</td>
                  </tr>
                  <tr>
                    <td>Efficiency</td> : <td>91.0 % </td>
                  </tr>
                </tbody>
              </table>
              <h5>14. Generator</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> : <td>Cylindrical pole, synchronous</td>
                  </tr>
                  <tr>
                    <td>Rated Output Capacity per Unit</td> : <td>2965 kVA</td>
                  </tr>
                  <tr>
                    <td>Power Factor</td> : <td>0.85</td>
                  </tr>
                  <tr>
                    <td>Generator Voltage</td> : <td>6.6 kV</td>
                  </tr>
                  <tr>
                    <td>Frequency</td> : <td>50 Hz</td>
                  </tr>
                  <tr>
                    <td>No of Units</td> : <td>2</td>
                  </tr>
                  <tr>
                    <td>Excitation System</td> : <td>Brushless</td>
                  </tr>
                  <tr>
                    <td>Efficiency</td> : <td>≥ 96.0 %</td>
                  </tr>
                  <tr>
                    <td>Number of Poles</td> : <td>8</td>
                  </tr>
                  <tr>
                    <td>Synchronous Speed</td> : <td>750 rpm</td>
                  </tr>
                </tbody>
              </table>
              <h5>15. Transformer</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Type</td> : <td>1 x 3 phase, Oil Immersed, Outdoor</td>
                  </tr>
                  <tr>
                    <td>Rated Capacity</td> : <td>6.5 MVA</td>
                  </tr>
                  <tr>
                    <td>Voltage Ratio</td> : <td>6.6 / 33 kV</td>
                  </tr>
                  <tr>
                    <td>No of Units</td> : <td>1</td>
                  </tr>
                  <tr>
                    <td>Vector Group</td> : <td>YNd11</td>
                  </tr>
                  <tr>
                    <td>Efficiency</td> : <td>99.0 %</td>
                  </tr>
                </tbody>
              </table>
              <h5>16. Transmission Line </h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Voltage Level</td> : <td>33 KV</td>
                  </tr>
                  <tr>
                    <td>Length</td> : <td>18 Km Approx. </td>
                  </tr>
                  <tr>
                    <td>Conductor Type</td> : <td>ACSR Dog</td>
                  </tr>
                  <tr>
                    <td>From</td> : <td>Switchyard </td>
                  </tr>
                  <tr>
                    <td>To</td> : <td>Bastu Sub-station</td>
                  </tr>
                </tbody>
              </table>
              <h5>17. Project Cost Estimate</h5>
              <table style={{ width: "50vw" }}>
                <tbody>
                  <tr>
                    <td>Total Cost of the Project</td> :{" "}
                    <td>NRs. 8742 Million (With IDC) </td>
                  </tr>
                  <tr>
                    <td>B/C Ratio</td> : <td>1.4</td>
                  </tr>
                  <tr>
                    <td>IRR</td> : <td>14.62 %</td>
                  </tr>
                  <tr>
                    <td>NPV</td> : <td>NRs. 322.5 Million</td>
                  </tr>
                  <tr>
                    <td>Construction Period</td> : <td>2.0 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HBK;

{
  /* <h5>1. Project Location</h5>
              <table style={{ width: "40vw" }}>
                <tbody>
                  
                </tbody>
              </table> */
}