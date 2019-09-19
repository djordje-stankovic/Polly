const Pool = require('./../models/pool');

exports.createNewPool = async (req, res) => {

const questionsForNewPool = await Pool.create(req.body)
console.log(req.body)
    
res.status(201).json({
    status:'success',
    data: {
        questions : questionsForNewPool
    }
});

}
exports.getPools = async (req, res) =>{
    try {
        const pool = await Pool.find();

        res.status(200).json({
            status : 'succes',
            data : {
                pool
            }
        })
        }catch (err){
            res.status(400).json({
                status : 'fail',
                mesage : 'Eror'
            })
        }
    }  
exports.getActivePool = async (req, res) =>{
    try {
          const pool = await Pool.findOne({"active" : true});
    
           res.status(200).json({
            status : 'succes',
             data : {
                  pool
              }
            })
           }catch (err){
              res.status(400).json({
                  status : 'fail',
                   mesage : 'Eror'
            })
          }
    }

    exports.createNewPool = async (req, res) =>{

        try {
            const newPool = await Pool.create(req.body);
        
            newPool.save()
            
           res.status(200).json({
               status : 'success',
               data : {
                   pool: newPool
               }
           })
        }catch (err){
            res.status(400).json({
                status : 'fail',
                mesage : 'Eror'
            })
        }}
exports.Deactivate = async (req, res) => {
    try {
        console.log(req)
    var pool = await Pool.findByIdAndUpdate(req.params.id ,req.body, {new : true})
    res.status(200).json({
        status : 'Success',
         data : {
              pool
          }
        })
    }catch(err){
        res.status(400).json({
            status : 'Fail',
            mesage : 'Error'
        })
    }
}
exports.IncermentAnswer = async (req, res) => {
    try{
        let questionId = req.body.questionId;
        let answerId = req.body.answerId;
        console.log(req.body)

        var pool = await Pool.update({active : true}, {$inc: {[`questions.${questionId}.answers.${answerId}.numberOfVotes`]: 1}})
        console.log(req.body  );
        res.status(200).json({
            status : 'Success',
             data : {
                  pool
              }
            })
    }catch(err){
        res.status(400).json({
            status : 'Fail',
            mesage : 'Error'
        })
    }
}
