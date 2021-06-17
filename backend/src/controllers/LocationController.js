const connection = require('../database/connection');
const crypto = require('crypto');

module.exports ={
  
  async index(request,response) {
    const location = await connection ('location').select('*')
   
    return response.json(location);
},

  async create(request,response) {
    const { name, email, whatsapp, model, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
  

    await connection('location').insert({
      id, 
      name,
      email,
      whatsapp,
      model,
      city,
      uf
    });

    return response.json({ id });
}
}