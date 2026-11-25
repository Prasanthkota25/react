// ===== LOCATION DATA =====
const COUNTRIES = [
  'India','USA','UK','UAE','Singapore','Australia','Canada','Germany',
  'France','Japan','China','Brazil','South Africa','Russia','Mexico'
];

const STATES = {
  India: ['Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh',
    'Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
    'Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'],
  USA: ['California','Texas','New York','Florida','Illinois','Washington','Georgia','Arizona',
    'Colorado','Massachusetts','Nevada','North Carolina','Ohio','Pennsylvania','Virginia'],
  UK: ['England','Scotland','Wales','Northern Ireland'],
  UAE: ['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain'],
  Singapore: ['Central Region','East Region','North Region','North-East Region','West Region'],
  Australia: ['New South Wales','Victoria','Queensland','Western Australia','South Australia',
    'Tasmania','Australian Capital Territory','Northern Territory'],
  Canada: ['Ontario','British Columbia','Alberta','Quebec','Manitoba','Saskatchewan',
    'Nova Scotia','New Brunswick'],
  Germany: ['Bavaria','Berlin','Hamburg','Hesse','North Rhine-Westphalia','Baden-Württemberg',
    'Saxony','Rhineland-Palatinate'],
  France: ['Île-de-France','Provence','Normandy','Brittany','Alsace','Occitanie'],
  Japan: ['Tokyo','Osaka','Kyoto','Hokkaido','Fukuoka','Kanagawa'],
};

const CITIES = {
  // India
  'Andhra Pradesh': ['Visakhapatnam','Vijayawada','Guntur','Tirupati','Kurnool'],
  'Karnataka': ['Bengaluru','Mysuru','Mangaluru','Hubli','Belagavi','Davanagere'],
  'Maharashtra': ['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Thane'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Vellore'],
  'Telangana': ['Hyderabad','Warangal','Nizamabad','Karimnagar','Khammam'],
  'Delhi': ['New Delhi','Dwarka','Rohini','Noida','Gurgaon'],
  'Gujarat': ['Ahmedabad','Surat','Vadodara','Rajkot','Gandhinagar'],
  'Rajasthan': ['Jaipur','Jodhpur','Udaipur','Kota','Ajmer'],
  'Kerala': ['Kochi','Thiruvananthapuram','Kozhikode','Thrissur','Kannur'],
  'West Bengal': ['Kolkata','Howrah','Durgapur','Asansol','Siliguri'],
  'Uttar Pradesh': ['Lucknow','Kanpur','Agra','Varanasi','Prayagraj','Noida'],
  'Punjab': ['Chandigarh','Amritsar','Ludhiana','Jalandhar','Patiala'],
  // USA
  'California': ['Los Angeles','San Francisco','San Diego','San Jose','Sacramento','Fresno'],
  'Texas': ['Houston','Dallas','Austin','San Antonio','Fort Worth','El Paso'],
  'New York': ['New York City','Buffalo','Rochester','Yonkers','Syracuse'],
  'Florida': ['Miami','Orlando','Tampa','Jacksonville','Fort Lauderdale'],
  'Illinois': ['Chicago','Aurora','Naperville','Joliet','Rockford'],
  'Washington': ['Seattle','Spokane','Tacoma','Bellevue','Kirkland'],
  // UK
  'England': ['London','Manchester','Birmingham','Leeds','Liverpool','Bristol','Sheffield'],
  'Scotland': ['Edinburgh','Glasgow','Aberdeen','Dundee','Inverness'],
  'Wales': ['Cardiff','Swansea','Newport','Bangor'],
  // UAE
  'Dubai': ['Dubai City','Deira','Bur Dubai','Jumeirah','Business Bay'],
  'Abu Dhabi': ['Abu Dhabi City','Al Ain','Khalifa City','Yas Island'],
  'Sharjah': ['Sharjah City','Khor Fakkan','Kalba'],
  // Singapore
  'Central Region': ['Orchard','Marina Bay','Chinatown','Bugis','Raffles Place'],
  'East Region': ['Tampines','Bedok','Pasir Ris','Changi'],
  'West Region': ['Jurong','Clementi','Buona Vista','Tuas'],
  // Australia
  'New South Wales': ['Sydney','Newcastle','Wollongong','Central Coast','Maitland'],
  'Victoria': ['Melbourne','Geelong','Ballarat','Bendigo','Shepparton'],
  'Queensland': ['Brisbane','Gold Coast','Sunshine Coast','Townsville','Cairns'],
  'Western Australia': ['Perth','Fremantle','Mandurah','Bunbury'],
  // Canada
  'Ontario': ['Toronto','Ottawa','Mississauga','Brampton','Hamilton','London'],
  'British Columbia': ['Vancouver','Victoria','Kelowna','Abbotsford','Kamloops'],
  'Alberta': ['Calgary','Edmonton','Red Deer','Lethbridge'],
  'Quebec': ['Montreal','Quebec City','Laval','Gatineau'],
  // Germany
  'Bavaria': ['Munich','Nuremberg','Augsburg','Regensburg','Würzburg'],
  'Berlin': ['Berlin','Charlottenburg','Mitte','Prenzlauer Berg'],
  'Hamburg': ['Hamburg','Altona','Eimsbüttel','Wandsbek'],
  'Hesse': ['Frankfurt','Wiesbaden','Darmstadt','Kassel'],
  // France
  'Île-de-France': ['Paris','Versailles','Boulogne-Billancourt','Saint-Denis'],
  'Provence': ['Marseille','Nice','Toulon','Aix-en-Provence'],
  // Japan
  'Tokyo': ['Shinjuku','Shibuya','Akihabara','Harajuku','Ginza','Roppongi'],
  'Osaka': ['Namba','Umeda','Shinsaibashi','Tennoji'],
};

const AIRPORTS = {
  // India
  'Bengaluru': 'BLR - Kempegowda Intl',
  'Mumbai': 'BOM - CSIA Mumbai',
  'Hyderabad': 'HYD - Rajiv Gandhi Intl',
  'Chennai': 'MAA - Chennai Intl',
  'New Delhi': 'DEL - IGI Delhi',
  'Kolkata': 'CCU - Netaji Subhas Intl',
  'Kochi': 'COK - Cochin Intl',
  'Pune': 'PNQ - Pune Airport',
  'Ahmedabad': 'AMD - Sardar Patel Intl',
  'Goa': 'GOI - Dabolim Airport',
  // International
  'Los Angeles': 'LAX - Los Angeles Intl',
  'San Francisco': 'SFO - San Francisco Intl',
  'New York City': 'JFK - John F. Kennedy Intl',
  'Chicago': 'ORD - O\'Hare Intl',
  'London': 'LHR - Heathrow',
  'Manchester': 'MAN - Manchester Airport',
  'Edinburgh': 'EDI - Edinburgh Airport',
  'Dubai City': 'DXB - Dubai Intl',
  'Abu Dhabi City': 'AUH - Abu Dhabi Intl',
  'Singapore City': 'SIN - Changi Airport',
  'Sydney': 'SYD - Kingsford Smith',
  'Melbourne': 'MEL - Tullamarine',
  'Toronto': 'YYZ - Pearson Intl',
  'Vancouver': 'YVR - Vancouver Intl',
  'Paris': 'CDG - Charles de Gaulle',
  'Munich': 'MUC - Munich Airport',
  'Frankfurt': 'FRA - Frankfurt Airport',
  'Tokyo': 'NRT - Narita Intl',
  'Osaka': 'KIX - Kansai Intl',
};

const TRAVEL_PURPOSES = [
  'Auditing','Business Meetings','Client Meeting','Conference',
  'Follow Suppliers','On-Site Transfer','Service jobs','Relocation','Visa Interview'
];

const TRAVEL_MODES = ['Air','Bus','Train','CAB','Own Transport'];
const ROOM_TYPES = ['Single','Double','Suite','Twin','Deluxe'];
const CURRENCIES = ['USD','INR','EUR','GBP','AED','SGD','AUD','CAD','JPY','CHF'];
