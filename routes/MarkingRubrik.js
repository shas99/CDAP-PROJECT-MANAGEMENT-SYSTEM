const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewSubmissionForm,getSelectedRubrics,addSelectedRubrics,getRubricbyBatch,markpost,viewRubricsCreatedFromTemplateByID,viewRubricsCreatedFromTemplate,addRubricsfromtemplate,editRubrics,viewSpecificAbstractRubrics,viewRubrics,addRubrics,proposalMarkingConfiguration,viewProposalMarkingDetails,proposalReportMarkingConfiguration,viewProposalReportMarkingDetails,statusDocumentMarkingConfiguration,viewStatusDocumentMarkingDetails,progressPresentationMarkingConfiguration,ViewProgressPresentationMarkingDetails} = require('../controllers/MarkingRubrik')


//Proposal Presentation Routes
router.route("/proposalMarkingConfiguration/update/:id").put(proposalMarkingConfiguration)
router.route("/proposalMarkingConfiguration/:id").get(viewProposalMarkingDetails)

//Proposal Report Routes
router.route("/proposalReportMarkingConfiguration/update/:id").put(proposalReportMarkingConfiguration)
router.route("/proposalReportMarkingConfiguration/:id").get(viewProposalReportMarkingDetails)

//Status Document 01 Routes
router.route("/statusDocumentMarkingConfiguration/update/:id").put(statusDocumentMarkingConfiguration)
router.route("/statusDocumentMarkingConfiguration/:id").get(viewStatusDocumentMarkingDetails)

//Progress Presentation 01 Routes
router.route("/progressPresentationMarkingConfiguration/update/:id").put(progressPresentationMarkingConfiguration)
router.route("/progressPresentationMarkinsgConfiguration/:id").get(ViewProgressPresentationMarkingDetails)

//customisable rubrics
router.route("/addRubrics").post(addRubrics)

router.route("/viewRubrics").get(viewRubrics)

router.route("/viewSpecificAbstractRubrics").get(viewSpecificAbstractRubrics)

router.route("/editRubrics").put(editRubrics)

router.route("/addRubricsfromtemplate").post(addRubricsfromtemplate)

router.route("/viewRubricsCreatedFromTemplate").get(viewRubricsCreatedFromTemplate)

router.route("/viewRubricsCreatedFromTemplateByID/:id").get(viewRubricsCreatedFromTemplateByID)

router.route("/markpost").post(markpost)

router.route("/getRubricbyBatch").get(getRubricbyBatch)

router.route("/addSelectedRubrics").post(addSelectedRubrics)

router.route("/getSelectedRubrics").post(getSelectedRubrics)

router.route("/viewSubmissionForm/:id").get(viewSubmissionForm)
module.exports = router


