const connection = require('../database/connection');

module.exports ={
  
  async create(request,response) {
    const{id} = request.body;

    const location = await connection('location')
      .where('id', id)
      .select('name')
      .first();

    if(!location){
      return response.status(400).json({error: 'No Location encontrada com esse ID'});
    }

    return response.json(location);
  }
}