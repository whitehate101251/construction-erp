"// Fixed workerRoutes.js file"  
const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Worker routes - accessible to all authenticated users
router.get('/', workerController.getAllWorkers);
router.get('/count', workerController.getWorkersCount);
router.get('/:id', workerController.getWorkerById);

// Worker management routes - all authenticated users can add/update/delete workers
router.post('/', workerController.createWorker);
router.patch('/:id', workerController.updateWorker);
router.delete('/:id', workerController.deleteWorker);

module.exports = router; 