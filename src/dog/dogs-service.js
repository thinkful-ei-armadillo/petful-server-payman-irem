'use strict';

const DogsService = {
  getAllDogs(db) {
    return db
      .from('dogs AS dog')
      .select(
        'dog.imageurl',
        'dog.imagedescription',
        'dog.name',
        'dog.sex',
        'dog.age',
        'dog.breed',
        'dog.story'
      )
      .orderBy('dog.day_added', 'asc');
  }
  /*getCatDetails(){

    },
    deleteCat(){

    }*/
};

module.exports = DogsService;
