const connection = require('../database/connection');


module.exports = {
  async index(request,response){
    const location_id = request.headers.authorization;

    const cars = await connection('cars')
      .where('location_id', location_id)
      .select('*');
    
    return response.json(cars);

  }
}