const { Service } = require("../Models/service");

async function handleViewService(req, res){
    try{
        console.log("finding services")
        const serviceData = await Service.find()
        console.log(serviceData)
       return res.status(200).send({serviceData: serviceData})
    } catch (error) {
        console.log(error)
        return res.send({error});
    }
}

module.exports = {
    handleViewService
};