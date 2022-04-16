CREATE TABLE YELP_USER (
                           Yelp_ID VARCHAR(10) PRIMARY KEY,
                           Email VARCHAR(30) NOT NULL,
                           FN VARCHAR(10) NOT NULL,
                           LN VARCHAR(10) NOT NULL,
                           DOB DATE NOT NULL,
                           BirthPlace VARCHAR(30) NOT NULL,
                           Gender CHAR NOT NULL
);