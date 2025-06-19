const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Admin and Site Manager routes
router.get('/', siteController.getAllSites);
router.get('/with-attendance', siteController.getSitesWithAttendance);
router.get('/:id', siteController.getSite);
router.get('/manager/:managerId', siteController.getSitesByManager);

// Admin only routes
router.post('/', siteController.createSite);
router.patch('/:id/status', siteController.updateSiteStatus);
router.patch('/:id', siteController.updateSite);
router.delete('/:id', siteController.deleteSite);
router.post('/:id/foremen', siteController.addForemenToSite);
router.delete('/:id/foremen/:foremenId', siteController.removeForemenFromSite);

// Placeholder for site routes
router.get('/placeholder', (req, res) => {
    res.json({ message: 'Site routes' });
});

module.exports = router; 