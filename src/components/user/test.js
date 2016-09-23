//http://api.petfinder.com/my.method?key=12345&arg1=foo&token=67890&sig=abcdef
'use strict'

const API_KEY = "dfb0fba88f0e4ac77f0466ef94b3e9e2",
  API_SECRET = "af18b47bbafcb3dc5734b0d652ca774d",
  GENERAL_URL = "http://api.petfinder.com/";

let request = require('request'),
  dreamDog = require('./DreamDog.js'),
  parse = require('csv-parse'),
  async = require('async'),
  MongoClient = require('mongodb').MongoClient;

// request.get(`http://api.petfinder.com/pet.get?key=dfb0fba88f0e4ac77f0466ef94b3e9e2&arg1=foo&token=67890&sig=abcdef`,(err,res,body)=>{

//  console.log(body)
// })


class PetFinder {

  constructor() {

    this.AUTHORIZATION = 'Basic ZHJlYW1kb2dhcHA6bXktc2VjcmV0LXRva2VuLXRvLWNoYW5nZS1pbi1wcm9kdWN0aW9u';
    this.AUTHOR_SERVER = '174.36.245.123';
    this.API_SERVER = '198.11.247.162';
    this.uploading = true;
    this.threshold = 5;
    this.CUCount = 0;
    this.shelterToken = null;
    this.collection = null;
  }

  setCollection(collection) {

    this.collection = collection;
  }

  getPet(id, cb) {

    return request.get(`http://api.petfinder.com/pet.get?id=34534085&format=json&key=${API_KEY}`, cb);
  }
  getShelter(id, cb) {

    return request.get(`http://api.petfinder.com/shelter.get?id=${id}&format=json&key=${API_KEY}`, cb);
  }
  getPetViaShelter(id, cb) {

    return request.get(`http://api.petfinder.com/shelter.getPets?id=${id}&format=json&key=${API_KEY}`, cb);
  }
}

let petFinder = new PetFinder();


var parser = parse({
  delimiter: ','
}, function(err, data) {
  async.eachSeries(data, function(line, callback) {

    // line[1] = 'Doggierescuelv@yahoo.com';
    // line[0] = 'NV181'
    let callbackcalled = false;

    if (line[1].indexOf('-') >= 0) {
      callback();
      callbackcalled = true;
    }

    // else{


    petFinder.getShelter(line[0], (err, res, body) => {

      console.log(body)

    if (res.body) {

      let jb = JSON.parse(res.body).petfinder.shelter;
      let password = Math.floor(Math.random() * 9000000) + 1000000;

      // console.log(jb)

      petFinder.collection.findOne({
        'usernames': jb.email.$t
      }, (err, ele) => {

        if (!err && ele) {

        if (!callbackcalled)
          callback();

      } else {




        dreamDog.resigter(jb.email.$t.trim(), jb.email.$t, jb.name.$t, password, {
            address: jb.address1.$t + ' ' + jb.city.$t + ' ' + jb.country.$t + ' ' + jb.zip.$t,
            longitude: jb.longitude.$t,
            latitude: jb.latitude.$t
          },
          jb.phone.$t, (usernames, email, name, password, location, phone, user, defaultScope) => {
          petFinder.collection.insert({
          usernames,
          email,
          name,
          password,
          location,
          phone,
          user,
          defaultScope,
          petFinderId: line[0],
          uploaded: false

        }, (err, result) => {

          console.log('saved')

        if (!err) {

          console.log('get pets')



          petFinder.getPetViaShelter(line[0], (err, res, body) => {

            // console.log('getPetViaShelter',body);

            if (body) {
              let dogs = [];
              try {
                let pet_count = 0;
                let pets = JSON.parse(body).petfinder.pets.pet;
                async.eachSeries(pets, (pet, cb_pet) => {


                  // console.log('one pet',pet);

                  if (pet.animal.$t.trim().toLowerCase() != 'dog') {
                  cb_pet();
                } else {

                  console.log('in one pet');
                  let imageArr = [];
                  if (pet.media && pet.media.photos) {

                    for (let p in pet.media.photos.photo) {
                      if (pet.media.photos.photo[p]['@size'] && pet.media.photos.photo[p]['@size'] == 'x')
                        imageArr.push(pet.media.photos.photo[p]);
                    }

                    console.log('imageArr', imageArr);
                  }


                  let breeds = [];
                  for (let i = 0; i < pet.breeds.breed.length; i++) {

                    breeds.push(pet.breeds.breed[i].$t);
                    console.log(pet.breeds.breed[i])
                  }
                  if (breeds.length == 0 && pet.breeds.breed.$t) {
                    breeds = [pet.breeds.breed.$t];
                  }
                  console.log(breeds);


                  dreamDog.uploadDog({

                    animalId: `PETF-${pet.id.$t}`,
                    avatar: `${imageArr[0].$t}`,
                    //owner:api/me
                    breeds: breeds,
                    gender: `${pet.sex.$t}`,
                    name: `${pet.name.$t}`,
                    description: `${pet.description.$t}`,
                  }, user, (dog) => {


                    dog.breeds = breeds;
                    console.log('callback from uploadDog');
                  // console.log(dog);
                  // console.log(imageArr[1].$t)

                  for (var i = 1; i < imageArr.length; i++) {

                    dreamDog.uploadMedia(defaultScope, dog, imageArr[i].$t, {
                      address: jb.address1.$t + ' ' + jb.city.$t + ' ' + jb.country.$t + ' ' + jb.zip.$t,
                      longitude: jb.longitude.$t,
                      latitude: jb.latitude.$t
                    });

                  }


                  dogs.push(dog);
                  console.log(jb.name.$t);
                  petFinder.collection.update({
                    'name': jb.name.$t
                  }, {
                    $set: {
                      'dogs': dogs
                    }
                  }, (err) => {

                    // pet_count++;
                    // if(pet_count == pet.length){
                    //   console.log('next shelter');
                    // }


                    if (!err) {

                    cb_pet();

                  } else {

                    console.log(err);
                  }

                })

                })
                  // })


                }

              })


              } catch (e) {

                console.log('getPetViaShelter', err);
              }
            } else {
              console.log('getPetViaShelter', err);
        }
        });



        } else {

          console.log('this error',err);
        }

      })

      });

      }
    })
    }

  });
  })
})

MongoClient.connect('mongodb://localhost/test', (err, db) => {

  console.log('Connected correctly to server.');
petFinder.setCollection(db.collection('PetFinder'));
require('fs').createReadStream('shelters.csv').pipe(parser);

})
