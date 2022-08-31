// console.log("It's working!")
function sectorFunc(vars){
  // return console.log(vars)
  }

function masterFunc(vars){
  console.log(vars);
  tableData = vars;
  // return vars     
  // }

  // Define initialization function
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
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
      selector
        .append("option")
        .text(state)
        .property("value", state);
    });

      // Use the first sample from the list to build the initial plots
    var firstState = states[0];
    buildCharts(firstState);
    
  }    

  // Initialize the dashboard
  init();

  function buildCharts(stateName) {
    var items = tableData[0][0];
    var lookup = {};
    var states = [];
    for (var item, i = 0; item = items[i++];) {
        var state = item.State;

        if (!(state in lookup)) {
            lookup[state] = 1;
            states.push(state);
        }
    }
    // 4. Create a variable that filters the state.
    var resultArray = tableData[0][0].filter(statesObj => statesObj.State == stateName);
    //  5. Create a variable that holds the first state in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the year, pop, gdp, & ghg.
    var lookup = {};
    var years = [];
    for (var item, i = 0; item = items[i++];) {
      var year = item.Year;

      if (!(year in lookup)) {
        lookup[year] = 1;
        years.push(year);
      }
    }
    var pops = result.Population;
    var gdps= result.GDP;
    var ghgs = result.allghg;

    // 7. Create the xticks for the line chart.
    var xticks = years

    console.log(xticks)

    // 8. Create the trace for the line chart. 
    var lineData = [{
      x: xticks,
      y: ghgs,
      type: "line",
      text: years
  }];
      // 9. Create the layout for the line chart. 
    var lineLayout = {
      title: stateName + " Emissions 1997-2018"
    };
      
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("line", lineData, lineLayout)

  }}
