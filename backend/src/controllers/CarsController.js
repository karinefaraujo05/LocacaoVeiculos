const connection = require('../database/connection');
const crypto = require('crypto');

module.exports ={

  async index(request,response) {
    const{page = 1 } = request.query;

    const count = await connection('cars').count();

    response.header('X-Total-Count', count['count(x)']);

    const cars = await connection ('cars')
      .join('location','location.id','=','cars.location_id')
      .limit(5)
      .offset((page-1) * 5)
      .select([
        'cars.*',
        'cars.model',
        'cars.year',
        'cars.description',
        'cars.city',
        'cars.value'
      ]);

      return response.json( cars )
},

  async create(request,response){
    const{model, year, description, city, value } = request.body;
    const location_id = request.headers.authorization; //espera que seja salvo no location.id a authoorization passada no headers da app

    const [id] = await connection('cars').insert({
      model,
      year,
      description,
      location_id,
      city,
      value
    });
    return response.json({id});
  },
    async delete(request,response){
      const {id} = request.params;
      const location_id = request.headers.authorization;

      const cars = await connection('cars')
        .where('id', id)
        .select('location_id')
        .first();

      if(cars.location_id != location_id) {
        return response.status(401).json({error: 'Operation not Permitted'});
      }
   await connection('cars').where('id', id).delete();
        return response.status(204).send();
    }
    
}