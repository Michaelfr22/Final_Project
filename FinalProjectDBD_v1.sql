-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "PopulationByState" (
    "State" string   NOT NULL,
    "Year" int   NOT NULL,
    "Population" int   NOT NULL,
    CONSTRAINT "pk_PopulationByState" PRIMARY KEY (
        "State"
     )
);

CREATE TABLE "GDPByState" (
    "State" string   NOT NULL,
    "Year" int   NOT NULL,
    "GDP" int   NOT NULL,
    CONSTRAINT "pk_GDPByState" PRIMARY KEY (
        "Year"
     )
);

CREATE TABLE "GHGEmissionsByState" (
    "State" string   NOT NULL,
    "Sector" string   NOT NULL,
    "Year" int   NOT NULL,
    "GHG" int   NOT NULL,
    CONSTRAINT "pk_GHGEmissionsByState" PRIMARY KEY (
        "Sector"
     )
);

CREATE TABLE "GHGEmissionsByStateBySector" (
    "State" string   NOT NULL,
    "Sector" string   NOT NULL,
    "Year" int   NOT NULL,
    "GHG" int   NOT NULL
);

ALTER TABLE "PopulationByState" ADD CONSTRAINT "fk_PopulationByState_Year" FOREIGN KEY("Year")
REFERENCES "GDPByState" ("Year");

ALTER TABLE "GDPByState" ADD CONSTRAINT "fk_GDPByState_State" FOREIGN KEY("State")
REFERENCES "PopulationByState" ("State");

ALTER TABLE "GHGEmissionsByState" ADD CONSTRAINT "fk_GHGEmissionsByState_State" FOREIGN KEY("State")
REFERENCES "PopulationByState" ("State");

ALTER TABLE "GHGEmissionsByState" ADD CONSTRAINT "fk_GHGEmissionsByState_Year" FOREIGN KEY("Year")
REFERENCES "GDPByState" ("Year");

ALTER TABLE "GHGEmissionsByStateBySector" ADD CONSTRAINT "fk_GHGEmissionsByStateBySector_State" FOREIGN KEY("State")
REFERENCES "PopulationByState" ("State");

ALTER TABLE "GHGEmissionsByStateBySector" ADD CONSTRAINT "fk_GHGEmissionsByStateBySector_Sector" FOREIGN KEY("Sector")
REFERENCES "GHGEmissionsByState" ("Sector");

ALTER TABLE "GHGEmissionsByStateBySector" ADD CONSTRAINT "fk_GHGEmissionsByStateBySector_Year" FOREIGN KEY("Year")
REFERENCES "GDPByState" ("Year");

