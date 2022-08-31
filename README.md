# Final_Project

## Our Team

Team includes: Marceline Ackerman, Michael Friedman, and Ricardo Guerreiro.

## Communication Protocols

We are meeting Tuesdays, Thursdays, Saturdays, and Sundays through Slack and Zoom.

## Mid-Project Progress
Google Slides below:
https://docs.google.com/presentation/d/1-nu6R02VoQOIAPqIm7txoEy6xk4nNJbGHiTljbAuARw/edit#slide=id.p

## Selected Topic

### Carbon Footprints in the United States, considering GDP and Population Size of each State

With the theme of Environmental Sustainability in mind, our team intends to conduct an analysis on historical United States Carbon Emission data dating back to 1997. Data considered will include the Growth Domestic Product ("Growth Rate") and Population Size for each State with the ultimate purpose to visualize their effects on individual State Carbon Emission results.

## Data Sources

Original datasets were taken from [ClimateWatch.com](https://www.climatewatchdata.org/). Data has been cleaned and loaded into a database, then exported to three usable sets. Links below are the cleaned versions to be used in the analysis.

 - [Emissions vs GDP by State 1997-2018](https://github.com/Michaelfr22/Final_Project/blob/main/MergedTables/gdp_emissions.csv)
 - [Emissions by Sector vs GDP and Pop by State 1997-2018](https://github.com/Michaelfr22/Final_Project/blob/main/MergedTables/gdp_pop_sector_emissions.csv)
 - [Emissions vs Population by State 1997-2018](https://github.com/Michaelfr22/Final_Project/blob/main/MergedTables/pop_emissions.csv)
 
## Questions we hope to answer with the data

 - Is there a correlation between State GDP and GHG Emissions levels?
 - Is there a correlation between population density and GHG Emission levels?
 - In the most recent observations, which States have the highest GHG Emission levels? The lowest?
 - Can we predict GHG Emissions through State Population and GDP?

## Database Diagram

 - Eight tables in a PostgreSQL Database 
   - state_pop: population by state from 1997-2018
   - state_emissions: emissions by state from 1997-2018
   - state_gdp: GDP by state from 1997-2018
   - sector_emissions: Emissions by state by sector from 1997-2018
   - pop_emissions: merged table of emissions vs population by state from 1997-2018
   - gdp_emissions: merged table emissions vs GDP by state from 1997-2018
   - gdp_pop_sector_emissions: master merged table of sector, population, and gdp by state from 1997-2018

![FinalProjectERD_v3](https://github.com/Michaelfr22/Final_Project/blob/main/Database/FinalProjectERD_v3.png)

## Machine Learning Model

As our data is not labeled with set outcomes, we are examining using a Random Forest Classification model to group states and sectors.

## Dashboard

We will use a Flask App, Tableau, & Plotly Express in order to display our findings on a web page.

## Results

TBD.
