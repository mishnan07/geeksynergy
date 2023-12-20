const userModel = require ('../Models/userModel')

let success = null
let failure = null

const Home = async(req,res)=>{
    try {
         success = req.query.success;
         failure = req.query.failure
         const users = await userModel.find({})
        res.render('home',{success,failure,users})
        success=null
        failure=null
      
        
    } catch (error) {
        console.log(error.message);
    }
}
const Edit = async (req, res) => {
    try {
        
        const userId = req.query.id;
        if(!userId){
            return res.redirect('/admin/home?failure=select%the%20user');
        }
        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res.render('edit', { failure: 'User not found' });
        }

        res.render('edit', { user });
    } catch (error) {
        console.error(error);
        res.status(500).render('edit', { failure: 'Internal Server Error' });
    }
};

const Update = async (req, res) => {
    try {
        const { name, email, phone, profession,id } = req.body;

        const response = await userModel.updateOne(
            { _id: id },
            { $set: { name: name,email:email, mobile: phone, professional: profession } },
            { new: true } // Return the modified document rather than the original

        );

        console.log(response);

        if (response && response.modifiedCount > 0) {
            res.redirect('/admin/home?success=successfully%updated%20data');
            success=null
        } else {
            res.redirect('/admin/home?failure=no%changes%20made');
            failure=null
        }
        

    } catch (error) {
        res.render('home', { failure: 'Internal Server Error' });
    }
};

const Delete = async(req,res)=>{
    try {

        const userId=req.body.id
        const result = await userModel.deleteOne({ _id: userId });
        res.redirect('/admin/home?success=successfully%20deleted%20data');

    } catch (error) {
        
    }
}


module.exports = {
    Home,
    Edit,
    Update,
    Delete
}
