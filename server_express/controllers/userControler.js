const User = require('./../models/user');
const jwt = require('jsonwebtoken');


let singIn = id =>{
    return jwt.sign({ id: id}, process.env.JWT_SECRET, process.env._JWT_EXPIRES_ID);
}
// exports.signup = async (req, res,next) => {
//     try{
//     const {email, password} = req.body;

//     const user = await User.findOne({email}).select('+password')
//     if(user){
//         res.status(400).json({
//             status : 'Fail',
//             mesage : 'Error'
//         })
//         return next("User alredy exist")
//     }
//     if(!user){
//         const newUser = await User.create(req.body);
//         res.status(200).json({
//             status : 'success',
//             token,
//             data : {               
//                 user : newUser
//             }
//               })
//               return next("Made it")
//     }
    
// }catch(err){
//         res.status(400).json({
//             status : 'Fail'
//         })
//     }
    

    
// }
exports.login = async (req, res, next) => {
    const {email, password} = req.body;   
    if(!email || !password) {
        return next("Please provide email and password")
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next("Incorect password or email")
    }
    const token = singIn(user._id);
    res.status(200).json({
        status: 'success',
        token

    })
}
exports.markVoteOnPool = async (req, res) => {
    try {
        const {userId, poolId} = req.body;
        const user = await  User.update({ _id: userId }, { $push: { votedPools: poolId } });
    res.status(200).json({
        status : 'Success',
         data : {
            user
          }
        })
    }catch(err){
        res.status(400).json({
            status : 'Fail',
            mesage : 'Error'
        })
    }
}