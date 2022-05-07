const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()
const projectbidlistcontroller = require('../controllers/projectbidlistcontroller');

router.get('/projectbidlist/:id',projectbidlistcontroller.get_projectbidlist_projects);
router.post('/projectbidlist/:id',projectbidlistcontroller.add_projectbidlist_project);
router.delete('/projectbidlist/:groupId/:projectId',projectbidlistcontroller.delete_project);

module.exports = router;