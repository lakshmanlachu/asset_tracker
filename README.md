# asset_tracker
Asset Management Web Application
This project is a Node.js web application designed to help companies track their assets, such as laptops, cell phones, tools, etc., which are being used by employees. The application provides features for managing employees, assets, asset categories, and asset history, as well as issuing and returning assets.

Features
Employee Management: Add, edit, and view all employees in the company. Filter employees by active/inactive status and search capabilities.
Asset Management: Add, edit, and view all assets in the company. Filter assets by type, make, model, etc. Each asset is identifiable by its serial number and unique ID.
Asset Category Management: Define and manage various hardware types being used, such as laptops, mobile phones, screwdrivers, drill machines, etc.
Stock View: Bird’s eye view of assets in stock, ready to be assigned to employees. Display totals by branch along with the total value.
Asset Issuing: Allow users to issue assets to employees.
Asset Returning: Allow users to return assets from employees. Capture the reason for return (e.g., upgrade, repair, resignation).
Asset Scraping: Allow users to mark assets as obsolete, making them invisible in any page except reports.
Asset History: View the entire history of an asset from purchase to scrapping, helping to understand the investment utilization.
Tech Stack
Node.js (Express server)
PostgreSQL DB
Sequelize ORM
Jade (HTML templating engine)
Bootstrap
CSS
DataTables.net (for displaying data in tables)
Setup Instructions
Clone the repository: git clone https://github.com/your-username/asset-management.git
Navigate to the project directory: cd asset-management
Install dependencies: npm install
Set up the PostgreSQL database and configure the connection in config/database.js.
Run the application: npm start
Access the application in your browser at http://localhost:3000
Folder Structure
php
Copy code
├── config/
│   └── database.js         # Database configuration
├── controllers/
│   ├── assetController.js  # Controller for handling asset-related requests
│   ├── employeeController.js  # Controller for handling employee-related requests
│   ├── assetCategoryController.js  # Controller for handling asset category-related requests
│   ├── stockController.js  # Controller for handling stock-related requests
│   ├── issueReturnController.js  # Controller for handling asset issuing and returning
│   └── scrapController.js  # Controller for handling asset scraping
├── models/
│   ├── Asset.js            # Asset model definition
│   ├── Employee.js         # Employee model definition
│   ├── AssetCategory.js    # Asset category model definition
│   └── AssetHistory.js     # Asset history model definition
├── routes/
│   ├── assetRoutes.js      # Routes for asset management
│   ├── employeeRoutes.js   # Routes for employee management
│   ├── assetCategoryRoutes.js  # Routes for asset category management
│   ├── stockRoutes.js      # Routes for stock management
│   ├── issueReturnRoutes.js  # Routes for asset issuing and returning
│   └── scrapRoutes.js      # Routes for asset scraping
├── views/
│   ├── asset/              # Views for asset management
│   ├── employee/           # Views for employee management
│   ├── assetCategory/      # Views for asset category management
│   └── common/             # Common views
└── public/
    ├── css/                # CSS files
    ├── js/                 # JavaScript files
    └── img/                # Image files
Contribution
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.