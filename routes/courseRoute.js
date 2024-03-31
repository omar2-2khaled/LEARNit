const express = require('express');
const courseController = require('../controllers/courseController');
const auth = require('../auth/authController');
const modulesController = require('../controllers/modulesController');
const videoController = require('../controllers/videoController');
const userController = require('../controllers/userController');
const router = express.Router();
//router.route('/leaderboard').get(courseController.getLeaderboard);

router
  .route('/')
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router.patch('/enroll/:id', auth.protect, userController.enroll)
router.patch('/bookmarks/:id', userController.addToBookmarks);
router
  .route('/:id')
  .get(courseController.getCourse)
  .delete(courseController.deleteCourse)
  .patch(courseController.updateCourse);

//CRUD on modules
router
  .route('/:courseId/module')
  .get(modulesController.getAllModules)
  .post(modulesController.createModule)

router
  .route('/:courseId/module/:moduleId')
  .get(modulesController.getModule)
  .patch(modulesController.updateModule)
  .delete(modulesController.deleteModule)

//CRUD on videos
router
  .route('/:courseId/module/:moduleId/videos')
  .get(videoController.getALlVids)
  .post(videoController.addVideo)
router
  .route('/:courseId/module/:moduleId/videos/:videoId')
  .get(videoController.getVideo)
  .patch(videoController.editVideo)
  .delete(videoController.deleteVideo)
module.exports = router;
