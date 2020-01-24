const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        // console.log(request.query)
        const {latitude , longitude, techs} = request.query;
        console.log(latitude, longitude)
        const techsArray = parseStringAsArray(techs);
        // console.log(techsArray);
        const devs = await Dev.find({
            techs: {
               $in: techsArray, 
            },
            location: {
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [latitude, longitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        // console.log(request.query)

      
        //Buscar todoss os devs num raio 10km
        //Filtrar por tecnologias
        console.log(devs)
        return response.json(devs)

    }
}