
// Define initialization function
function init() {
  // Grab a reference to the dropdown select element
  var selector1 = d3.select("#selDataset1");
  var selector2 = d3.select("#selDataset2");
  // Use the list of states to populate the select options
  var lookup = {};
  var items = tableData[0][0];
  var states = [];
  for (var item, i = 0; item = items[i++];) {
      var state = item.State;

      if (!(state in lookup)) {
          lookup[state] = 1;
          states.push(state);
      }
  }
  console.log(states)
  states.forEach((state) => {
    selector1
      .append("option")
      .text(state)
      .property("value", state);
  });
  
  states.forEach((state) => {
    selector2
      .append("option")
      .text(state)
      .property("value", state);
  });

    // Use the first state from the list to build the initial plots
  var firstState = states[0];
  buildCharts(firstState, firstState);
  // buildSunburst();
  
}    

// Initialize the dashboard
init();

newState1 = "AK"
newState2 = "AK"

function option1(newState) {
  newState1 = newState;
  rebuildCharts();
}

function option2(newState) {
  newState2 = newState;
  rebuildCharts();
}

function rebuildCharts() {
  // Fetch new data each time a new sample is selected
  buildCharts(newState1, newState2)
}


// Function to build a line chart based on selection
function buildCharts(stateName1, stateName2) {
  // Set variables for lookup tables
  var items = tableData[0][0];
  var states = [];
  var sectors = [];
  var years = [];
  var stateLookup = {};
  var yearLookup = {};
  var sectorLookup = {};

  // Create a state list
  for (var item, i = 0; item = items[i++];) {
      var state = item.State;

      if (!(state in stateLookup)) {
          stateLookup[state] = 1;
          states.push(state);
      }
  }

  // Create a list of years
  for (var item, i = 0; item = items[i++];) {
  var year = item.Year;

  if (!(year in yearLookup)) {
    yearLookup[year] = 1;
    years.push(year);
  }
}

  // Create a list of sectors
  for (var item, i = 0; item = items[i++];) {
  var sector = item.Sector;

  if (!(sector in sectorLookup)) {
    sectorLookup[sector] = 1;
    sectors.push(sector);
  }
}
  // Create a variable that filters the first state.
  var resultArray1 = tableData[0][0].filter(statesObj => statesObj.State == stateName1);
  //   Create a variable that holds the first state in the array.
  var result1 = resultArray1[0];
  console.log(resultArray1)

  // Create a variable that filters the second state.
  var resultArray2 = tableData[0][0].filter(statesObj => statesObj.State == stateName2);
  //   Create a variable that holds the first state in the array.
  var result2 = resultArray2[0];
  console.log(resultArray2)

  // Fetch GHG values for filtered state
  var ghgs1 = []
  for (var item, i = 0; item = resultArray1[i++];) {
    var ghg = item.allghg;
    ghgs1.push(ghg);
  };

  var ghgs2 = []
  for (var item, i = 0; item = resultArray2[i++];) {
    var ghg = item.allghg;
    ghgs2.push(ghg);
  };

  // Create the trace for the line chart. 
  var line1trace = {
    x: years,
    y: ghgs1,
    mode: "lines+markers",
    name: result1.State,
};

  var line2trace = {
    x: years,
    y: ghgs2,
    mode: "lines+markers",
    name: result2.State,
  };

  lineData = [line1trace, line2trace];

    //Create the layout for the line chart. 
  var lineLayout = {
    xaxis: {
      tickvals: years,
      title: "Year"
    },
    yaxis: {
      title: "Megatons of CO2"
    },
    title: result1.State + " vs " + result2.State + " Emissions 1997-2018"
  };

  var config = {responsive: true};

 
  // Use Plotly to plot the data with the layout. 
  Plotly.newPlot("line", lineData, lineLayout, config);
  

}
// function buildSunburst() {

//   var items = tableData[0][0];

//   // Fetch all states for sunburst plot
//   var allStates = [];
//   for (var item, i = 0; item = items[i++];) {
//     var state = item.State;
//     allStates.push(state)
//   };

//   // Fetch all sectors for sunburst plot
//   var allSectors = [];
//   for (var item, i = 0; item = items[i++];) {
//     var sector = item.Sector;
//     allSectors.push(sector)
//   };

//   // Concat state and sector for sunburst
//   var stateSectors = []
//   for (var item, i= 0; item = items[i++];) {
//     var stateSector = item.State + " - " + item.Sector;
//     stateSectors.push(stateSector) 
//   }

//   // Fetch all GHG values for sunburst plot
//   var allghg = [];
//   for (var item, i = 0; item = items[i++];) {
//     var ghg = item.allghg;
//     allghg.push(ghg)
//   };

//     // Create the trace for the sunburst chart
//     var sunburstData = [{
//       type: "sunburst",
//       ids: stateSectors,
//       labels: allSectors,
//       parents: stateSectors,
//       values: allghg,
//       outsidetextfont: {size: 20, color: "#377eb8"},
//       leaf: {opacity: 0.4},
//       marker: {line: {width: 2}},
//     }]
  
//     var sunburstLayout = {
//       margin: {l: 0, r: 0, b: 0, t: 0},
//       width: 500,
//       height: 500
//     };
     
//     var config = {responsive: true}

//     Plotly.newPlot("sunburst", sunburstData, sunburstLayout, config)
// }