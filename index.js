import http from "http";
import express from "express";
import { sequelize } from './database/connection.js';
import CONFIG from './config/config.js';
import path from "path";
import { fileURLToPath } from 'url';
import employeeRoutes from './routes/employeeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import assetsRoutes from './routes/assetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Jade as the view engine
app.set('view engine', 'jade');

// Set the directory where your view files are located
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next()
});

// Routes
app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/category', categoryRoutes);
app.use('/assets', assetsRoutes);
app.use('/transaction', transactionRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('auth/login');
});

app.get('/register', (req, res) => {
    res.render('auth/register');
});
app.get('/home', (req, res) => {
    res.render('home/dashboard');
});


sequelize.sync()
    .then(() => {
        app.listen(CONFIG.PORT, () => {
            console.log(`Server running in ${CONFIG.ENV} mode on port ${CONFIG.PORT}`);
        });
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });