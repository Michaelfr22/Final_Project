
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
  // buildSunbursts(firstState, firstState);
  
}    

// Initialize the dashboard
init();

newState1 = "AK";
newState2 = "AK";

function option1(newState) {
  newState1 = newState;
  rebuildCharts();
};

function option2(newState) {
  newState2 = newState;
  rebuildCharts();
};

function rebuildCharts() {
  // Fetch new data each time a new sample is selected
  buildCharts(newState1, newState2);
  // buildSunbursts(newState1, newState2);
};


// Function to build a line chart based on selection
function buildCharts(stateName1, stateName2) {
  // Set variables for lookup tables
  var items = tableData[0][0];
  var states = [];
  var years = [];
  var stateLookup = {};
  var yearLookup = {};

  // Create a state list
  for (var item, i = 0; item = items[i++];) {
      var state = item.State;

      if (!(state in stateLookup)) {
          stateLookup[state] = 1;
          states.push(state);
      };
  };

  // Create a list of years
  for (var item, i = 0; item = items[i++];) {
  var year = item.Year;

  if (!(year in yearLookup)) {
    yearLookup[year] = 1;
    years.push(year);
  };
};

  // Create a variable that filters the first state.
  var resultArray1 = tableData[0][0].filter(statesObj => statesObj.State == stateName1);
  //   Create a variable that holds the first state in the array.
  var result1 = resultArray1[0];
  console.log(resultArray1);

  // Create a variable that filters the second state.
  var resultArray2 = tableData[0][0].filter(statesObj => statesObj.State == stateName2);
  //   Create a variable that holds the first state in the array.
  var result2 = resultArray2[0];
  console.log(resultArray2);

  // Fetch GHG values for filtered state
  var ghgs1 = [];
  for (var item, i = 0; item = resultArray1[i++];) {
    var ghg = item.allghg;
    ghgs1.push(ghg);
  };

  var ghgs2 = [];
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
  
};

// function buildSunbursts(stateName1, stateName2) {

//   var items = mergedData[0][0];
  
//   // Create a variable that filters the first state.
//   var resultArray1 = items.filter(statesObj => statesObj.State == stateName1);
//   //   Create a variable that holds the first state in the array.
//   var result1 = resultArray1[0];
//   console.log(resultArray1);

//   // Create a variable that filters the second state.
//   var resultArray2 = items.filter(statesObj => statesObj.State == stateName2);
//   //   Create a variable that holds the first state in the array.
//   var result2 = resultArray2[0];
//   console.log(resultArray2); 

//   // Fetch list of values for filtered state
 
//   var values1 = [];
//   var ids1 = [];
//   var parents1 = [];
//   var labels1 = [];

//   var values2 = [];
//   var ids2 = [];
//   var parents2 = [];
//   var labels2 = [];

//   for (var item, i = 0; item = resultArray1[i++];) {
//     var label1 = item.Year;
//     var parent1 = item.Sector;
//     var id1 = item.State + " - " + item.Sector + " - " + item.Year;
//     var value1 = item.allghg;
//     values1.push(value1);
//     labels1.push(label1);
//     parents1.push(parent1);
//     ids1.push(id1);
//   };

//   for (var item, i = 0; item = resultArray2[i++];) {
//     var label2 = item.Year;
//     var parent2 = item.Sector;
//     var id2 = item.State + " - " + item.Sector + " - " + item.Year;
//     var value2 = item.allghg;
//     values2.push(value2);
//     labels2.push(label2);
//     parents2.push(parent2);
//     ids2.push(id2);

//   };

//   console.log(values1);
//   console.log(ids1);
//   console.log(parents1);
//   console.log(labels1);

//   var sunData1 = [{
//     type: "sunburst",
//    //ids: ids1,
//     values: values1,
//     labels: labels1,
//     parents: parents1,
//     branchvalues: 'total'
//     // outsidetextfont: {size: 20, color: "#377eb8"},
//     // leaf: {opacity: 0.4},
//     // marker: {line: {width: 2}},
//   }];

//   var sunData2 = [{
//     type: "sunburst",
//     //ids: ids2,
//     values: values2,
//     labels: labels2,
//     parents: parents2,
//     branchvalues: 'total'
//     // outsidetextfont: {size: 20, color: "#377eb8"},
//     // leaf: {opacity: 0.4},
//     // marker: {line: {width: 2}},
//   }];

//   var sunLayout1 = {
//     "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
//     "title": result1.State + " Sector Data"
//   };

//   var sunLayout2 = {
//     "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
//     "title": result2.State + " Sector Data"
//   };

//   var config = {responsive: true};

//   Plotly.newPlot('sunburst1', sunData1, sunLayout1, config);
//   Plotly.newPlot('sunburst2', sunData2, sunLayout2, config);
// }
// ;

