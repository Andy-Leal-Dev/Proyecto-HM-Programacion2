
class Api {
    constructor(){
        this.getAllUsers = this.getAllUsers.bind(this);
    }
    
    getAllUsers(req,res){
        this.userModel.getUsersModel().then(responseUser => {
            res.json(responseUser);
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo productos");
        });
       
    }

}


export default Api;