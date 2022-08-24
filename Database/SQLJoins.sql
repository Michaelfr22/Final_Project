-- Create master table for GDP, Pop, and Sector Emissions

CREATE TABLE gdp_pop_sector_emissions AS (SELECT 
	sector_emissions."Country", state_gdp."State", state_gdp."Year", state_gdp."GDP", 
	state_pop."Population", sector_emissions."Sector", sector_emissions."All GHG",
	sector_emissions."CH4", sector_emissions."CO2", sector_emissions."N2O", sector_emissions."F-Gas"
FROM state_gdp
JOIN sector_emissions 
	ON state_gdp."State"=sector_emissions."State"
		AND state_gdp."Year"=sector_emissions."Year"
JOIN state_pop 
	ON state_gdp."StateFull"=state_pop."StateFull"
		AND state_gdp."Year"=state_pop."Year");
		
-- Create a GDP vs Emissions table

CREATE TABLE gdp_emissions AS (SELECT
	state_emissions."Country", state_gdp."StateFull", state_gdp."State", state_gdp."Year", state_gdp."GDP",
	state_emissions."All GHG", state_emissions."CH4", state_emissions."CO2", state_emissions."N2O",
	state_emissions."F-Gas"
FROM state_gdp
JOIN state_emissions
	ON state_gdp."State"=state_emissions."State"
		AND state_gdp."Year"=state_emissions."Year");
SELECT * FROM gdp_emissions;

-- Create a Pop vs Emissions table

CREATE TABLE pop_emissions AS (SELECT
	gdp_emissions."Country", gdp_emissions."State", gdp_emissions."Year", state_pop."Population",
	gdp_emissions."All GHG", gdp_emissions."CH4", gdp_emissions."CO2", gdp_emissions."N2O",
	gdp_emissions."F-Gas"
FROM state_pop
JOIN gdp_emissions
	ON state_pop."StateFull"=gdp_emissions."StateFull"
		AND state_pop."Year"=gdp_emissions."Year");
	