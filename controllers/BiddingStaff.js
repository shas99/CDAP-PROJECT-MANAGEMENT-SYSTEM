const { Batch } = require('aws-sdk');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const User = require('../models/User');
const BidProject = require('../models/BidProjects');
const AvailableProjects = require('../models/AvailableProject');


const Supervisors = require('../models/Supervisor')
const Staff = require('../models/Staff');
const { decode } = require('jsonwebtoken');

