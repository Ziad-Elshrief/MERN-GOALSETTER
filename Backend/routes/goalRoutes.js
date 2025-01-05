const express = require('express')
const router = express.Router()
const {getGoals,deleteGoal,setGoal,updateGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

router.get('/',protect,getGoals)
router.post('/',protect,setGoal)
router.put('/:id',protect,updateGoal)
router.delete('/:id',protect,deleteGoal)


module.exports = router