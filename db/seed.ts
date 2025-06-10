import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";
import { plaidTransaction } from "./schema";
import { db } from "./index";
import { addDays } from "date-fns";

const plaidAccountId = "9d5bcbe7-1441-4ee0-910a-7a33be4325ce";

const companies = [
  "Walmart Store",
  "Amazon.com", // Or "Amzn Mktp"
  "Target Stores",
  "Costco Whsl",
  "Kroger",
  "Home Depot",
  "Lowes",
  "CVS/Pharmacy", // CVS is an acronym
  "Walgreens",
  "McDonalds",
  "Starbucks Coffee",
  "Best Buy",
  "Apple.com/Bill", // Or "Apple Store"
  "Google *Svcs",
  "Microsoft *MsBill",
  "Netflix.com",
  "Disney Plus", // Or "WDW", "Disney Store"
  "ExxonMobil",
  "Shell Oil",
  "BP#", // BP is an acronym
  "Chevron",
  "ATT*Bill", // ATT is an acronym
  "Verizon Wrls",
  "T-Mobile",
  "Comcast Cable",
  "Spectrum",
  "Uber Trip",
  "Lyft Ride",
  "DoorDash",
  "Grubhub",
  "Subway",
  "Burger King",
  "Wendys",
  "Taco Bell",
  "KFC", // KFC is an acronym
  "Pizza Hut",
  "Dominos Pizza",
  "Chipotle",
  "Panera Bread",
  "Dunkin #",
  "7-Eleven",
  "Wholefds Mkt", // Whole Foods Market
  "Trader Joes",
  "Aldi",
  "Publix Super Mkt",
  "Macys",
  "Kohls Dept Strs",
  "Nordstrom",
  "Gap Store", // Or "Old Navy", "Banana Rep"
  "Nike Retail",
  "Adidas Store",
  "Under Armour",
  "Lululemon Athl",
  "Sephora",
  "Ulta Beauty",
  "TJ Maxx",
  "Ross Stores",
  "Ikea",
  "Wayfair LLC",
  "Petco",
  "PetSmart",
  "AutoZone",
  "O'Reilly Auto",
  "Advance Auto Parts",
  "Jiffy Lube",
  "Spotify USA",
  "Hulu",
  "Max", // Formerly HBO Max
  "Etsy.com",
  "eBay",
  "PayPal *Merchant",
  "Visa",
  "Mastercard",
  "American Express",
  "Delta Air",
  "American Air",
  "United Airlines",
  "Southwest Air",
  "Marriott",
  "Hilton Hotels",
  "Airbnb",
  "Booking.com",
  "Expedia.com",
  "AMC Theatres", // AMC is an acronym
  "Cinemark",
  "FedEx",
  "UPS", // UPS is an acronym
  "USPS PO", // USPS is an acronym
  "Staples",
  "Office Depot",
  "Barnes & Noble",
  "GameStop",
  "Dollar General",
  "Dollar Tree",
  "Chick-fil-A",
  "Popeyes",
  "Olive Garden",
  "Applebees",
  "Chilis Grill Bar",
  "Cheesecake Fact",
  "Samsung.com",
  "Sony", // Or "PlayStation Network"
  "Nintendo of America",
  "Ford Dealership",
  "GM Dealership", // GM is an acronym
  "Toyota Dealership",
];

const financeCategories = [
  {
    primary: "INCOME",
    detailed: "INCOME_DIVIDENDS",
    icon: "https://plaid-category-icons.plaid.com/PFC_INCOME.png",
    confidence: "HIGH",
  },
  {
    primary: "INCOME",
    detailed: "INCOME_WAGES",
    icon: "https://plaid-category-icons.plaid.com/PFC_INCOME.png",
    confidence: "LOW",
  },
  {
    primary: "INCOME",
    detailed: "INCOME_OTHER_INCOME",
    icon: "https://plaid-category-icons.plaid.com/PFC_INCOME.png",
    confidence: "HIGH",
  },
  {
    primary: "TRANSFER_IN",
    detailed: "TRANSFER_IN_CASH_ADVANCES_AND_LOANS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_IN.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRANSFER_IN",
    detailed: "TRANSFER_IN_DEPOSIT",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_IN.png",
    confidence: "LOW",
  },
  {
    primary: "TRANSFER_IN",
    detailed: "TRANSFER_IN_INVESTMENT_AND_RETIREMENT_FUNDS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_IN.png",
    confidence: "HIGH",
  },
  {
    primary: "TRANSFER_IN",
    detailed: "TRANSFER_IN_SAVINGS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_IN.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRANSFER_IN",
    detailed: "TRANSFER_IN_ACCOUNT_TRANSFER",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_IN.png",
    confidence: "LOW",
  },
  {
    primary: "TRANSFER_IN",
    detailed: "TRANSFER_IN_OTHER_TRANSFER_IN",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_IN.png",
    confidence: "HIGH",
  },
  {
    primary: "TRANSFER_OUT",
    detailed: "TRANSFER_OUT_INVESTMENT_AND_RETIREMENT_FUNDS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_OUT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRANSFER_OUT",
    detailed: "TRANSFER_OUT_SAVINGS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_OUT.png",
    confidence: "LOW",
  },
  {
    primary: "TRANSFER_OUT",
    detailed: "TRANSFER_OUT_WITHDRAWAL",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_OUT.png",
    confidence: "HIGH",
  },
  {
    primary: "TRANSFER_OUT",
    detailed: "TRANSFER_OUT_ACCOUNT_TRANSFER",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_OUT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRANSFER_OUT",
    detailed: "TRANSFER_OUT_OTHER_TRANSFER_OUT",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSFER_OUT.png",
    confidence: "LOW",
  },
  {
    primary: "LOAN_PAYMENTS",
    detailed: "LOAN_PAYMENTS_CAR_PAYMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_LOAN_PAYMENTS.png",
    confidence: "HIGH",
  },
  {
    primary: "LOAN_PAYMENTS",
    detailed: "LOAN_PAYMENTS_CREDIT_CARD_PAYMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_LOAN_PAYMENTS.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "LOAN_PAYMENTS",
    detailed: "LOAN_PAYMENTS_PERSONAL_LOAN_PAYMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_LOAN_PAYMENTS.png",
    confidence: "LOW",
  },
  {
    primary: "LOAN_PAYMENTS",
    detailed: "LOAN_PAYMENTS_MORTGAGE_PAYMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_LOAN_PAYMENTS.png",
    confidence: "HIGH",
  },
  {
    primary: "LOAN_PAYMENTS",
    detailed: "LOAN_PAYMENTS_STUDENT_LOAN_PAYMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_LOAN_PAYMENTS.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "LOAN_PAYMENTS",
    detailed: "LOAN_PAYMENTS_OTHER_PAYMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_LOAN_PAYMENTS.png",
    confidence: "LOW",
  },
  {
    primary: "BANK_FEES",
    detailed: "BANK_FEES_ATM_FEES",
    icon: "https://plaid-category-icons.plaid.com/PFC_BANK_FEES.png",
    confidence: "HIGH",
  },
  {
    primary: "BANK_FEES",
    detailed: "BANK_FEES_FOREIGN_TRANSACTION_FEES",
    icon: "https://plaid-category-icons.plaid.com/PFC_BANK_FEES.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "BANK_FEES",
    detailed: "BANK_FEES_INSUFFICIENT_FUNDS",
    icon: "https://plaid-category-icons.plaid.com/PFC_BANK_FEES.png",
    confidence: "LOW",
  },
  {
    primary: "BANK_FEES",
    detailed: "BANK_FEES_INTEREST_CHARGE",
    icon: "https://plaid-category-icons.plaid.com/PFC_BANK_FEES.png",
    confidence: "HIGH",
  },
  {
    primary: "BANK_FEES",
    detailed: "BANK_FEES_OVERDRAFT_FEES",
    icon: "https://plaid-category-icons.plaid.com/PFC_BANK_FEES.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "BANK_FEES",
    detailed: "BANK_FEES_OTHER_BANK_FEES",
    icon: "https://plaid-category-icons.plaid.com/PFC_BANK_FEES.png",
    confidence: "LOW",
  },
  {
    primary: "ENTERTAINMENT",
    detailed: "ENTERTAINMENT_CASINOS_AND_GAMBLING",
    icon: "https://plaid-category-icons.plaid.com/PFC_ENTERTAINMENT.png",
    confidence: "HIGH",
  },
  {
    primary: "ENTERTAINMENT",
    detailed: "ENTERTAINMENT_MUSIC_AND_AUDIO",
    icon: "https://plaid-category-icons.plaid.com/PFC_ENTERTAINMENT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "ENTERTAINMENT",
    detailed: "ENTERTAINMENT_SPORTING_EVENTS_AMUSEMENT_PARKS_AND_MUSEUMS",
    icon: "https://plaid-category-icons.plaid.com/PFC_ENTERTAINMENT.png",
    confidence: "LOW",
  },
  {
    primary: "ENTERTAINMENT",
    detailed: "ENTERTAINMENT_TV_AND_MOVIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_ENTERTAINMENT.png",
    confidence: "HIGH",
  },
  {
    primary: "ENTERTAINMENT",
    detailed: "ENTERTAINMENT_VIDEO_GAMES",
    icon: "https://plaid-category-icons.plaid.com/PFC_ENTERTAINMENT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "ENTERTAINMENT",
    detailed: "ENTERTAINMENT_OTHER_ENTERTAINMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_ENTERTAINMENT.png",
    confidence: "LOW",
  },
  {
    primary: "FOOD_AND_DRINK",
    detailed: "FOOD_AND_DRINK_BEER_WINE_AND_LIQUOR",
    icon: "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
    confidence: "HIGH",
  },
  {
    primary: "FOOD_AND_DRINK",
    detailed: "FOOD_AND_DRINK_COFFEE",
    icon: "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "FOOD_AND_DRINK",
    detailed: "FOOD_AND_DRINK_FAST_FOOD",
    icon: "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
    confidence: "LOW",
  },
  {
    primary: "FOOD_AND_DRINK",
    detailed: "FOOD_AND_DRINK_GROCERIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
    confidence: "HIGH",
  },
  {
    primary: "FOOD_AND_DRINK",
    detailed: "FOOD_AND_DRINK_RESTAURANT",
    icon: "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "FOOD_AND_DRINK",
    detailed: "FOOD_AND_DRINK_VENDING_MACHINES",
    icon: "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
    confidence: "LOW",
  },
  {
    primary: "FOOD_AND_DRINK",
    detailed: "FOOD_AND_DRINK_OTHER_FOOD_AND_DRINK",
    icon: "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_BOOKSTORES_AND_NEWSSTANDS",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "LOW",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_CONVENIENCE_STORES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_DEPARTMENT_STORES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_DISCOUNT_STORES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "LOW",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_ELECTRONICS",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_GIFTS_AND_NOVELTIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_OFFICE_SUPPLIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "LOW",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_ONLINE_MARKETPLACES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_PET_SUPPLIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_SPORTING_GOODS",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "LOW",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_SUPERSTORES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_TOBACCO_AND_VAPE",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_MERCHANDISE",
    detailed: "GENERAL_MERCHANDISE_OTHER_GENERAL_MERCHANDISE",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
    confidence: "LOW",
  },
  {
    primary: "HOME_IMPROVEMENT",
    detailed: "HOME_IMPROVEMENT_FURNITURE",
    icon: "https://plaid-category-icons.plaid.com/PFC_HOME_IMPROVEMENT.png",
    confidence: "HIGH",
  },
  {
    primary: "HOME_IMPROVEMENT",
    detailed: "HOME_IMPROVEMENT_HARDWARE",
    icon: "https://plaid-category-icons.plaid.com/PFC_HOME_IMPROVEMENT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "HOME_IMPROVEMENT",
    detailed: "HOME_IMPROVEMENT_REPAIR_AND_MAINTENANCE",
    icon: "https://plaid-category-icons.plaid.com/PFC_HOME_IMPROVEMENT.png",
    confidence: "LOW",
  },
  {
    primary: "HOME_IMPROVEMENT",
    detailed: "HOME_IMPROVEMENT_SECURITY",
    icon: "https://plaid-category-icons.plaid.com/PFC_HOME_IMPROVEMENT.png",
    confidence: "HIGH",
  },
  {
    primary: "HOME_IMPROVEMENT",
    detailed: "HOME_IMPROVEMENT_OTHER_HOME_IMPROVEMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_HOME_IMPROVEMENT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "MEDICAL",
    detailed: "MEDICAL_DENTAL_CARE",
    icon: "https://plaid-category-icons.plaid.com/PFC_MEDICAL.png",
    confidence: "LOW",
  },
  {
    primary: "MEDICAL",
    detailed: "MEDICAL_EYE_CARE",
    icon: "https://plaid-category-icons.plaid.com/PFC_MEDICAL.png",
    confidence: "HIGH",
  },
  {
    primary: "MEDICAL",
    detailed: "MEDICAL_NURSING_CARE",
    icon: "https://plaid-category-icons.plaid.com/PFC_MEDICAL.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "MEDICAL",
    detailed: "MEDICAL_PHARMACIES_AND_SUPPLEMENTS",
    icon: "https://plaid-category-icons.plaid.com/PFC_MEDICAL.png",
    confidence: "LOW",
  },
  {
    primary: "MEDICAL",
    detailed: "MEDICAL_PRIMARY_CARE",
    icon: "https://plaid-category-icons.plaid.com/PFC_MEDICAL.png",
    confidence: "HIGH",
  },
  {
    primary: "MEDICAL",
    detailed: "MEDICAL_VETERINARY_SERVICES",
    icon: "https://plaid-category-icons.plaid.com/PFC_MEDICAL.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "MEDICAL",
    detailed: "MEDICAL_OTHER_MEDICAL",
    icon: "https://plaid-category-icons.plaid.com/PFC_MEDICAL.png",
    confidence: "LOW",
  },
  {
    primary: "PERSONAL_CARE",
    detailed: "PERSONAL_CARE_GYMS_AND_FITNESS_CENTERS",
    icon: "https://plaid-category-icons.plaid.com/PFC_PERSONAL_CARE.png",
    confidence: "HIGH",
  },
  {
    primary: "PERSONAL_CARE",
    detailed: "PERSONAL_CARE_HAIR_AND_BEAUTY",
    icon: "https://plaid-category-icons.plaid.com/PFC_PERSONAL_CARE.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "PERSONAL_CARE",
    detailed: "PERSONAL_CARE_LAUNDRY_AND_DRY_CLEANING",
    icon: "https://plaid-category-icons.plaid.com/PFC_PERSONAL_CARE.png",
    confidence: "LOW",
  },
  {
    primary: "PERSONAL_CARE",
    detailed: "PERSONAL_CARE_OTHER_PERSONAL_CARE",
    icon: "https://plaid-category-icons.plaid.com/PFC_PERSONAL_CARE.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_ACCOUNTING_AND_FINANCIAL_PLANNING",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_AUTOMOTIVE",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "LOW",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_CHILDCARE",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_CONSULTING_AND_LEGAL",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_EDUCATION",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "LOW",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_INSURANCE",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "HIGH",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_POSTAGE_AND_SHIPPING",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_STORAGE",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "LOW",
  },
  {
    primary: "GENERAL_SERVICES",
    detailed: "GENERAL_SERVICES_OTHER_GENERAL_SERVICES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
    confidence: "HIGH",
  },
  {
    primary: "GOVERNMENT_AND_NON_PROFIT",
    detailed: "GOVERNMENT_AND_NON_PROFIT_DONATIONS",
    icon: "https://plaid-category-icons.plaid.com/PFC_GOVERNMENT_AND_NON_PROFIT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "GOVERNMENT_AND_NON_PROFIT",
    detailed: "GOVERNMENT_AND_NON_PROFIT_GOVERNMENT_DEPARTMENTS_AND_AGENCIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_GOVERNMENT_AND_NON_PROFIT.png",
    confidence: "LOW",
  },
  {
    primary: "GOVERNMENT_AND_NON_PROFIT",
    detailed: "GOVERNMENT_AND_NON_PROFIT_TAX_PAYMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_GOVERNMENT_AND_NON_PROFIT.png",
    confidence: "HIGH",
  },
  {
    primary: "GOVERNMENT_AND_NON_PROFIT",
    detailed: "GOVERNMENT_AND_NON_PROFIT_OTHER_GOVERNMENT_AND_NON_PROFIT",
    icon: "https://plaid-category-icons.plaid.com/PFC_GOVERNMENT_AND_NON_PROFIT.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRANSPORTATION",
    detailed: "TRANSPORTATION_BIKES_AND_SCOOTERS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
    confidence: "LOW",
  },
  {
    primary: "TRANSPORTATION",
    detailed: "TRANSPORTATION_GAS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
    confidence: "HIGH",
  },
  {
    primary: "TRANSPORTATION",
    detailed: "TRANSPORTATION_PARKING",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRANSPORTATION",
    detailed: "TRANSPORTATION_PUBLIC_TRANSIT",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
    confidence: "LOW",
  },
  {
    primary: "TRANSPORTATION",
    detailed: "TRANSPORTATION_TAXIS_AND_RIDE_SHARES",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
    confidence: "HIGH",
  },
  {
    primary: "TRANSPORTATION",
    detailed: "TRANSPORTATION_TOLLS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRANSPORTATION",
    detailed: "TRANSPORTATION_OTHER_TRANSPORTATION",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
    confidence: "LOW",
  },
  {
    primary: "TRAVEL",
    detailed: "TRAVEL_FLIGHTS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRAVEL.png",
    confidence: "HIGH",
  },
  {
    primary: "TRAVEL",
    detailed: "TRAVEL_LODGING",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRAVEL.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "TRAVEL",
    detailed: "TRAVEL_RENTAL_CARS",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRAVEL.png",
    confidence: "LOW",
  },
  {
    primary: "TRAVEL",
    detailed: "TRAVEL_OTHER_TRAVEL",
    icon: "https://plaid-category-icons.plaid.com/PFC_TRAVEL.png",
    confidence: "HIGH",
  },
  {
    primary: "RENT_AND_UTILITIES",
    detailed: "RENT_AND_UTILITIES_GAS_AND_ELECTRICITY",
    icon: "https://plaid-category-icons.plaid.com/PFC_RENT_AND_UTILITIES.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "RENT_AND_UTILITIES",
    detailed: "RENT_AND_UTILITIES_INTERNET_AND_CABLE",
    icon: "https://plaid-category-icons.plaid.com/PFC_RENT_AND_UTILITIES.png",
    confidence: "LOW",
  },
  {
    primary: "RENT_AND_UTILITIES",
    detailed: "RENT_AND_UTILITIES_RENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_RENT_AND_UTILITIES.png",
    confidence: "HIGH",
  },
  {
    primary: "RENT_AND_UTILITIES",
    detailed: "RENT_AND_UTILITIES_SEWAGE_AND_WASTE_MANAGEMENT",
    icon: "https://plaid-category-icons.plaid.com/PFC_RENT_AND_UTILITIES.png",
    confidence: "VERY_HIGH",
  },
  {
    primary: "RENT_AND_UTILITIES",
    detailed: "RENT_AND_UTILITIES_TELEPHONE",
    icon: "https://plaid-category-icons.plaid.com/PFC_RENT_AND_UTILITIES.png",
    confidence: "LOW",
  },
  {
    primary: "RENT_AND_UTILITIES",
    detailed: "RENT_AND_UTILITIES_WATER",
    icon: "https://plaid-category-icons.plaid.com/PFC_RENT_AND_UTILITIES.png",
    confidence: "HIGH",
  },
  {
    primary: "RENT_AND_UTILITIES",
    detailed: "RENT_AND_UTILITIES_OTHER_UTILITIES",
    icon: "https://plaid-category-icons.plaid.com/PFC_RENT_AND_UTILITIES.png",
    confidence: "VERY_HIGH",
  },
];

function getRandomDateWithinRange(start: any, end: any) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

const TOTAL_TRANSACTIONS = 200;
const MIN_GENERAL_AMOUNT = 1;
const MAX_GENERAL_AMOUNT = 1000;
const MIN_INCOME_ABS = 50;
const MAX_INCOME_ABS = 5000;
const MIN_LOAN_PAYMENT_ABS = 100;
const MAX_LOAN_PAYMENT_ABS = 2000;
const FIXED_WAGE_MIN_ABS = 2500;
const FIXED_WAGE_MAX_ABS = 5000;

async function seedTransactions() {
  const fixedLoanPaymentAmounts = new Map();
  const THE_FIXED_WAGE_AMOUNT = -(
    Math.random() * (FIXED_WAGE_MAX_ABS - FIXED_WAGE_MIN_ABS) +
    FIXED_WAGE_MIN_ABS
  ).toFixed(2);
  const THE_FIXED_EMPLOYER_DETAILS = {
    name: faker.company.name() + " (Primary Employer)",
    merchantEntityId: faker.string.alphanumeric(36),
    logoUrl: faker.image.urlLoremFlickr({ category: "business" }),
    website: faker.internet.url(),
  };

  // Define the overall time window for transactions (e.g., past year)
  const overallEndDate = new Date();
  const overallStartDate = new Date(overallEndDate);
  overallStartDate.setFullYear(overallStartDate.getFullYear() - 1); // One year ago

  // --- 1. Generate INCOME_WAGES transactions ---
  const wageTransactions = [];
  const incomeWagesCategory = financeCategories.find(
    (c) => c.detailed === "INCOME_WAGES",
  );
  if (!incomeWagesCategory) {
    console.error(
      "Error: INCOME_WAGES category not found in financeCategories. Cannot generate wages.",
    );
    return;
  }

  // Find the first payday (e.g., a Friday) on or after the overallStartDate
  let currentWageDate = new Date(overallStartDate);
  while (currentWageDate.getDay() !== 5) {
    // 0=Sun, 1=Mon, ..., 5=Friday
    currentWageDate = addDays(currentWageDate, 1);
  }
  // Ensure the first wage date is not before the overall start date (can happen if start date is already a Friday)
  if (currentWageDate < overallStartDate) {
    currentWageDate = addDays(currentWageDate, 7); // Move to next Friday
  }

  while (currentWageDate <= overallEndDate) {
    wageTransactions.push({
      id: randomUUID(),
      transactionId: faker.string.alphanumeric(32),
      plaidAccountId,
      accountId: faker.string.alphanumeric(40),
      name: `Payroll Deposit - ${THE_FIXED_EMPLOYER_DETAILS.name}`,
      merchantName: THE_FIXED_EMPLOYER_DETAILS.name,
      merchantEntityId: THE_FIXED_EMPLOYER_DETAILS.merchantEntityId,
      logoUrl: THE_FIXED_EMPLOYER_DETAILS.logoUrl,
      website: THE_FIXED_EMPLOYER_DETAILS.website,
      amount: THE_FIXED_WAGE_AMOUNT.toString(),
      isoCurrencyCode: "USD",
      unofficialCurrencyCode: null,
      paymentChannel: "other", // Payroll is often direct deposit
      pending: false,
      pendingTransactionId: null,
      authorizedDate: currentWageDate,
      date: currentWageDate,
      datetime: currentWageDate,
      authorizedDatetime: currentWageDate,
      personalFinanceCategoryPrimary: incomeWagesCategory.primary,
      personalFinanceCategoryDetailed: incomeWagesCategory.detailed,
      personalFinanceConfidenceLevel: incomeWagesCategory.confidence,
      personalFinanceCategoryIconUrl: incomeWagesCategory.icon,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    currentWageDate = addDays(currentWageDate, 14);
  }

  // --- 2. Generate other transactions ---
  const otherTransactions = [];
  const numOtherTransactionsToGenerate =
    TOTAL_TRANSACTIONS - wageTransactions.length;
  const nonWageCategories = financeCategories.filter(
    (c) => c.detailed !== "INCOME_WAGES",
  );

  if (numOtherTransactionsToGenerate > 0 && nonWageCategories.length > 0) {
    for (let i = 0; i < numOtherTransactionsToGenerate; i++) {
      const category = faker.helpers.arrayElement(nonWageCategories);
      const transactionDateObject = getRandomDateWithinRange(
        overallStartDate,
        overallEndDate,
      );

      let amountValue;
      if (category.primary === "LOAN_PAYMENTS") {
        if (fixedLoanPaymentAmounts.has(category.detailed)) {
          amountValue = fixedLoanPaymentAmounts.get(category.detailed);
        } else {
          amountValue =
            Math.random() * (MAX_LOAN_PAYMENT_ABS - MIN_LOAN_PAYMENT_ABS) +
            MIN_LOAN_PAYMENT_ABS;
          fixedLoanPaymentAmounts.set(
            category.detailed,
            parseFloat(amountValue.toFixed(2)),
          );
        }
      } else if (category.primary === "INCOME") {
        // Should only be non-wage income here
        amountValue = -(
          Math.random() * (MAX_INCOME_ABS - MIN_INCOME_ABS) +
          MIN_INCOME_ABS
        );
      } else {
        amountValue =
          Math.random() * (MAX_GENERAL_AMOUNT - MIN_GENERAL_AMOUNT) +
          MIN_GENERAL_AMOUNT;
      }
      // Ensure correct precision for freshly generated amounts
      if (
        category.primary !== "LOAN_PAYMENTS" ||
        !fixedLoanPaymentAmounts.has(category.detailed)
      ) {
        amountValue = parseFloat(amountValue.toFixed(2));
      }

      otherTransactions.push({
        id: randomUUID(),
        transactionId: faker.string.alphanumeric(32),
        plaidAccountId,
        accountId: faker.string.alphanumeric(40),
        name: companies[Math.floor(Math.random() * companies.length)],
        merchantName: faker.helpers.maybe(() => faker.company.name(), {
          probability: 0.95,
        }),
        merchantEntityId: faker.string.alphanumeric(36),
        logoUrl: faker.image.avatar(),
        website: faker.internet.url(),
        amount: amountValue.toString(),
        isoCurrencyCode: "USD",
        unofficialCurrencyCode: null,
        paymentChannel: faker.helpers.arrayElement([
          "in store",
          "online",
          "other",
        ]),
        pending: false,
        pendingTransactionId: null,
        authorizedDate: transactionDateObject,
        date: transactionDateObject,
        datetime: transactionDateObject,
        authorizedDatetime: transactionDateObject,
        personalFinanceCategoryPrimary: category.primary,
        personalFinanceCategoryDetailed: category.detailed,
        personalFinanceConfidenceLevel: category.confidence,
        personalFinanceCategoryIconUrl: category.icon,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  } else if (numOtherTransactionsToGenerate <= 0) {
    console.warn(
      `Warning: Number of wage transactions (${wageTransactions.length}) meets or exceeds TOTAL_TRANSACTIONS (${TOTAL_TRANSACTIONS}). No other transactions will be generated.`,
    );
  }

  // --- 3. Combine, sort, and ensure total count ---
  let allTransactions = [...wageTransactions, ...otherTransactions];
  allTransactions.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // If, due to the way wage transactions fall, we slightly exceed 200, trim it.
  // Or, if we have too few (e.g. wage period is very short), this logic won't add more.
  // The primary goal is to have the wages, then fill up to 200.
  if (allTransactions.length > TOTAL_TRANSACTIONS) {
    allTransactions = allTransactions.slice(0, TOTAL_TRANSACTIONS);
  }
  // Note: If numOtherTransactionsToGenerate was < 0, allTransactions might be < TOTAL_TRANSACTIONS.
  // The current setup prioritizes including all wage payments within the period.

  const finalTransactions = allTransactions; // Use this for DB insert

  // --- Verification ---
  console.log(`\n--- Verification ---`);
  console.log(`Total transactions generated: ${finalTransactions.length}`);
  const generatedWageTransactions = finalTransactions
    .filter((t) => t.personalFinanceCategoryDetailed === "INCOME_WAGES")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  console.log(
    `Generated INCOME_WAGES transactions: ${generatedWageTransactions.length}`,
  );

  if (generatedWageTransactions.length > 0) {
    console.log(`  Verifying INCOME_WAGES dates (should be ~14 days apart):`);
    let allTwoWeeksApart = true;
    for (let i = 0; i < generatedWageTransactions.length; i++) {
      const currentTx = generatedWageTransactions[i];
      // console.log(`    Wage Date: ${currentTx.date}, Amount: ${currentTx.amount}`); // Log individual wage dates
      if (i > 0) {
        const prevTx = generatedWageTransactions[i - 1];
        const dateDiff =
          (new Date(currentTx.date).getTime() -
            new Date(prevTx.date).getTime()) /
          (1000 * 60 * 60 * 24);
        if (Math.abs(dateDiff - 14) > 0.5) {
          // Allow minor floating point issues
          allTwoWeeksApart = false;
          console.error(
            `    ERROR: Date difference is ${dateDiff.toFixed(2)} days between ${prevTx.date} and ${
              currentTx.date
            }`,
          );
        }
      }
    }
    console.log(
      `  All INCOME_WAGES dates verified as ~14 days apart: ${allTwoWeeksApart}`,
    );
    const allSameWageAmount = generatedWageTransactions.every(
      (t) => parseFloat(t.amount) === THE_FIXED_WAGE_AMOUNT,
    );
    const allSameWageMerchant = generatedWageTransactions.every(
      (t) => t.merchantName === THE_FIXED_EMPLOYER_DETAILS.name,
    );
    console.log(`  All INCOME_WAGES have fixed amount: ${allSameWageAmount}`);
    console.log(
      `  All INCOME_WAGES have fixed merchant: ${allSameWageMerchant}`,
    );
  }
  console.log("---------------------\n");

  // await db.insert(plaidTransaction).values(finalTransactions);
  console.log(`✅ Seeded ${finalTransactions.length} transactions (simulated)`);

  await db.insert(plaidTransaction).values(finalTransactions);
}

seedTransactions().catch(console.error);
