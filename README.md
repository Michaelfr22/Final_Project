# Final_Project

## Our Team

Team includes: Marceline Ackerman, Michael Friedman, and Ricardo Guerreiro.

## Selected Topic

### Carbon Footprints in the United States, considering GDP and Population Size of each State

With the theme of Environmental Sustainability in mind, our team intends to conduct an analysis on historical United States Carbon Emission data dating back to 1997. Data considered will include the Growth Domestic Product ("Growth Rate") and Population Size for each State with the ultimate purpose to visualize their effects on individual State Carbon Emission results.

## Data Sources

Original datasets were taken from [ClimateWatch.com](https://www.climatewatchdata.org/). Links below are the cleaned versions to be used in the analysis.

 - [GDP by State from 1997-2020](https://github.com/Michaelfr22/Final_Project/blob/main/Resources/US_GDPbyState_Cleaned.csv)
 - [Population by State from 1990-2020](https://github.com/Michaelfr22/Final_Project/blob/main/Resources/US_PopbyState_Cleaned.csv)
 - [Historical US Emissions from 1990-2018](https://github.com/Michaelfr22/Final_Project/blob/main/Resources/clean_us_historical_emissions.csv)
 
## Questions we hope to answer with the data

 - Is there a correlation between State GDP and GHG Emissions levels?
 - Is there a correlation between population density and GHG Emission levels?
 - In the most recent observations, which States have the highest GHG Emission levels? The lowest?
 - Does a change in State GDP or population size over time significantly affect GHG Emission levels?
 - Does geographical location affect GHG Emission?
 - What are the key trends in US GHG Emissions since 1990?
 - What are a few other explanations for high GHG Emission levels? Low levels?
 - What GHG Emission levels can be predicted in the year of 2025? 2030 and beyond?

## Database Diagram

 - Four tables (CSV files) 
 - Three unique Foreign Keys: **Sector**, **State**, and **Year**
 - Datatypes for each key

![FinalProjectERD_v1](https://user-images.githubusercontent.com/102773052/185803655-dafb3c2a-9216-4669-920f-30a2d3e2e4f3.png)

## Machine Learning Model

Our machine learning model will use Linear Regression as a starting point to explain the relationship between a continous dependent variable (GHG Emission) and an independent variable (GDP/Population Size). The model will also incorporate a Random Forest Classifier that will sample the data and ultimately simplify the decision-making process by building smaller, separate decision trees.

## Results

TBD.
