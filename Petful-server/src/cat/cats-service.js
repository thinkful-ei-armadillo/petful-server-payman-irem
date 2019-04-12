'use strict';

const CatsService = {
  getAllCats(db) {
    return db
      .from('cats AS cat')
      .select(
        'cat.imageurl',
        'cat.imagedescription',
        'cat.name',
        'cat.sex',
        'cat.age',
        'cat.breed',
        'cat.story'
      )
      .orderBy('cat.day_added', 'asc');
  }
  /*getCatDetails(){

    },
    deleteCat(){

    }*/
};

module.exports = CatsService;
