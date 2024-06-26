export const categories = [
    "SUV",
    "Sedan",
    "Pickup",
    "Van/Minivan",
    "Convertible",
    "Hatchback",
    "Coupe",
    "Crossover",
    "Luxury",
];

const getYears = (startYear) => {
    let currentYear = new Date().getFullYear();
    let years = [];
    //startYear = startYear || 1980;  
    while ( startYear <= currentYear ) {
        years.push(startYear++);
    }   
    return years;
}

export const years = [
    
    '2024', '2023', '2022',  '2021',
    '2020', '2019', '2018',  '2017',
    '2016', '2015', '2014',  '2013',
    '2012', '2011', '2010',  '2009',
  ];

export const cities = ["Islamabad", "Attock", "Bahawalpur", "Faisalabad", "Gujranwala","Karachi", "Lahore", "Multan", "Murree", 
       "Rawalpindi","Sargodha", "Sialkot", "Hyderabad", "Larkana", "Mirpur Khas","Sukkur",  "Abbottabad", "Nowshera", "Peshawar", "Swat", "Gwadar"];

//console.log(getYears(1990));