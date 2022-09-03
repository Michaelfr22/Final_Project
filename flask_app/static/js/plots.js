
// Define initialization function
function init() {
  // Grab a reference to the dropdown select element
  var selector1 = d3.select("#selDataset1");
  var selector2 = d3.select("#selDataset2");
  var selector3 = d3.select("#selDataset3");
  // Use the list of states to populate the select options
  var stateLookup = {};
  var items = tableData[0][0];
  var states = [];
  var years = [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
  for (var item, i = 0; item = items[i++];) {
      var state = item.State;
      if (!(state in stateLookup)) {
          stateLookup[state] = 1;
          states.push(state);
      }
      };
  
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
  years.forEach((year) => {
    selector3
      .append("option")
      .text(year)
      .property("value", year);
  });


    // Use the first state from the list to build the initial plots
  var firstState = states[0];
  var firstYear = years[0];
  buildCharts(firstState, firstState, firstYear);
  // buildSunbursts(firstState, firstState);
  
}    

// Initialize the dashboard
init();

newState1 = "AK";
newState2 = "AK";
yearSelect = 1997;

function option1(newState) {
  newState1 = newState;
  rebuildCharts();
};

function option2(newState) {
  newState2 = newState;
  rebuildCharts();
};

function option3(newYear) {
  yearSelect = newYear;
  rebuildCharts();
};

function rebuildCharts() {
  // Fetch new data each time a new sample is selected
  buildCharts(newState1, newState2, yearSelect);
};


// Function to build a line chart based on selection
function buildCharts(stateName1, stateName2, selectedYear) {
  // Set variables for lookup tables
  var items = tableData[0][0];
  var mergedItems = mergedData[0][0];
  var capitaItems = perCapita[0][0];
  var states = [];
  var years = [];
  var sectors = [];
  var stateLookup = {};
  var yearLookup = {};
  var sectorLookup = {};

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

  // Create a list of sectors
  for (var item, i = 0; item = mergedItems[i++];) {
    var sector = item.Sector;

    if (!(sector in sectorLookup)) {
      sectorLookup[sector] = 1;
      sectors.push(sector);
    };
  };

  // Create a variable that filters the first state.
  var resultArray1 = items.filter(statesObj => statesObj.State == stateName1);
  //   Create a variable that holds the first state in the array.
  var result1 = resultArray1[0];
  console.log(resultArray1);

  // Create a variable that filters the second state.
  var resultArray2 = items.filter(statesObj => statesObj.State == stateName2);
  //   Create a variable that holds the first state in the array.
  var result2 = resultArray2[0];
  console.log(resultArray2);

  // Create a variable that filters the year
  var yearArray = mergedItems.filter(yearObj => yearObj.Year == selectedYear);
  console.log(yearArray);
  // Create a variable that holds the first year in the array.
  var yearResult = yearArray[0];

  // Create a variable that filters the perCapita table by Year
  var capitaArray = capitaItems.filter(capitaObj => capitaObj.Year == selectedYear);
  
  // Create variables that filters the state from the merged sector table
  var sectorArray1 = mergedItems.filter(statesObj => statesObj.State == stateName1)
  var sectorArray2 = mergedItems.filter(statesObj => statesObj.State == stateName2)

  // Fetch GHG values for filtered state and year
  var sectorghgs1 = [];
  for (var item, i = 0; item = sectorArray1[i++];) {
    if (item.Year == yearResult.Year) {
      var sectorghg = item.allghg;
      sectorghgs1.push(sectorghg);
    };
  };

  var sectorghgs2 = [];
  for (var item, i = 0; item = sectorArray2[i++];) {
    if (item.Year == yearResult.Year) {
      var sectorghg = item.allghg;
      sectorghgs2.push(sectorghg);
    };
  };

  // Fetch GHG and GDP per capita for every state during filtered year
  var ghgPerCapita = [];
  var gdpPerCapita = [];
  var statePerCapita = [];
  for (var item, i = 0; item = capitaArray[i++];) {
    var state = item.State;
    var ghg = item.ghg_per_capita;
    var gdp = item.gdp_per_capita;
    statePerCapita.push(state);
    ghgPerCapita.push(ghg);
    gdpPerCapita.push(gdp);
  }

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

  var lineData = [line1trace, line2trace];

    //Create the layout for the line chart. 
  var lineLayout = {
    xaxis: {
      tickvals: years,
      title: "Year"
    },
    yaxis: {
      title: "Metric Tons of CO2e"
    },
    title: result1.State + " vs " + result2.State + " Emissions 1990-2018"
  };

  var pieData = [{
    values: sectorghgs1,
    labels: sectors,
    domain: {column: 0},
    name: 'GHG Emissions',
    text: result1.State,
    textposition: 'inside',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie',
  },{
    values: sectorghgs2,
    labels: sectors,
    domain: {column: 1},
    name: 'GHG Emissions',
    text: result2.State,
    textposition: 'inside',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  }
];

  var pieLayout = {
    title: result1.State + " vs " + result2.State + " Emissions by Sector For " + yearResult.Year,
    annotations: [
      {
        font: {
          size: 36
        },
        showarrow: false,
        text: result1.State,
        x: 0.20,
        y: 0.5
      },
      {
        font: {
          size: 36
        },
        showarrow: false,
        text: result2.State,
        x: 0.79,
        y: 0.5
      }
    ],
    height: 800,
    width: 1200,
    showlegend: true,
    grid: {rows: 1, columns: 2}
  };

  var bubbleData = [{
    x: ghgPerCapita,
    y: gdpPerCapita,
    text: statePerCapita,
    hovertemplate: '<b>%{text}</b>' +
                    '<br><b>Emissions:</b> %{x}lbs of CO2e'+
                    '<br><b>GDP:</b> %{y:$.2f}<extra></extra>',
    mode: 'markers',
    marker: {
      size: ghgPerCapita,
      sizeref: 2.0 * Math.max(...ghgPerCapita) / (60**2),
      sizemode: 'area',
      opacity: 0.6,
      color: 'rgb(255, 65, 54)',
      line: {
        color: 'black',
        width: 2
      }
    }
  }];
  
  var bubbleLayout = {
    title: 'GDP vs GHG Emissions Per Capita for ' + yearResult.Year,
    showlegend: false,
    xaxis: {
      title: 'GHG Emissions Per Capita (Pounds of CO2e)'
    },
    yaxis: {
      title: 'GDP Per Capita ($USD)'
    }
  }

  var config = {responsive: true};

 
  // Use Plotly to plot the data with the layout. 
  Plotly.newPlot("line", lineData, lineLayout, config);
  Plotly.newPlot("pie", pieData, pieLayout);
  Plotly.newPlot("bubble", bubbleData, bubbleLayout, config);
  
};

