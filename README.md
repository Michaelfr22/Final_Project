# Final_Project

## Our Team

Team includes: Marceline Ackerman, Michael Friedman, and Ricardo Guerreiro.

## Overview

More and more rapidly, the world is starting to notice the effects of global climate change. It's no longer a debate; it's undeniable. Historic flooding,
unprecedented drought, & devastating wildfires displacing millions of people are among some of the more drastic and noticable effects of climate change. Gases such as CO2,
Methane, and Nitrous Oxide are primary culprits in creating a "greenhouse effect" that traps more heat from the sun, steadily increasing the average temperatures
around the globe. These "greenhouse gases" are emitted in the greatest quantities by the most advanced nations, and the United States is no exception. In 2018 alone, the United
States emitted **6,677 Million Metric Tons of CO2e** as a whole.

For our final project as part of the Rutgers University Data Analysis Boot Camp, our group chose to analyze the emission levels across the United States, finding
which states are the greatest polluters, which sectors within those states produce the largest amount of emissions, and measure those emissions against State population
and Gross Domestic Profit (GDP). Then, using Machine Learning, we hope to predict the emission levels going forward, based on past emissions, Population, and GDP.

## Data Sources

Original datasets were taken from [ClimateWatch.com](https://www.climatewatchdata.org/). Data has been cleaned and loaded into a database, then exported to three usable sets. Links below are the cleaned versions to be used in the analysis.

 - [Emissions vs GDP by State 1997-2018](https://github.com/Michaelfr22/Final_Project/blob/main/MergedTables/gdp_emissions.csv)
 - [Emissions by Sector vs GDP and Pop by State 1997-2018](https://github.com/Michaelfr22/Final_Project/blob/main/MergedTables/gdp_pop_sector_emissions.csv)
 - [Emissions vs Population by State 1997-2018](https://github.com/Michaelfr22/Final_Project/blob/main/MergedTables/pop_emissions.csv)
 
## Questions we hope to answer with the data

 - Is there a correlation between State GDP and GHG Emissions levels?
 - Is there a correlation between population density and GHG Emission levels?
 - In the most recent observations, which States have the highest GHG Emission levels? The lowest?
 - Can we predict a rise or fall in GHG Emissions through State Population and GDP?

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

### Data Preprocessing:

 - Data was merged into a table including emissions by State, Sector, and Year, with included GDP and Population values for each State per Year
 - State and Sector were encoded to use as Features in the model
 - Data was then given an outcome based on these factors:
    - For the given State, Sector, and Year, did Greenhouse Gas Emissions rise compared to the year prior? 
    - If yes, we labeled the outcome as "1", otherwise, "0"

### Feature Engineering and Feature Selection

  - State and Sector were encoded to use in the model
    - State and the sectors within have variation that effect emission levels, and thus should be included in the decision-making process
  - Features chosen
    - StateEncoded
    - SectorEncoded
    - GDP
    - Population
    - All GHG Emissions
  - Features were chosen based on their overall weight on potential GHG emissions, as well as to scale the data depending on the state and sector the emissions were from.
  - Data was given a standard 80-20 split for Training and Testing
  
### Model

  - As we labeled the data based on the outcomes we intend to measure, we used a Random Forest Regressor model, as that proved the most effective at classifying our data.
  - The model was trained using the pre-processed, pre-labeled data, which included over 13000 rows and 5 columns per row.
  - Data was not scaled, as no values were extremely high and their existing weight gave a better score
  - Our Training Score was 87.2%, but our testing score was low, at only 7.5%
  - Nevertheless, when plugging in specific states and sectors into the model after training, we achieved a large variation in testing scores, ranging from 4% to 91.5% (excluding values of 1.0 due to zero reported emissions)
  - As a team, we have previously tried linear regression, K-Means, and a Neural Network model with little success, and so our RFR model seems the most likely to predict a rise or fall in GHG Emissions year-to-year.

## Dashboard

We built a Flask app using the following tools:
 - HTML
 - CSS
 - Javascript
 - Flask
 - Plotly.js
 - Tableau
 - GitHub Embeds: https://emgithub.com/

This will be deployed when complete using Heroku.

## Mid-Project Progress
Google Slides below:
https://docs.google.com/presentation/d/12N8r5K6RWYMjfLiBHMVHlVGMJvS2c6n8GvQw51Y7I78/edit#slide=id.p
