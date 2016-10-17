'use strict'
import axios from 'axios'
const BASIC_AUTH = 'Basic ZHJlYW1kb2ctd2ViOmFSYmF6MjlkdmlCJWJkZDBwMTZ0';
const AUTHOR_SERVER = 'http://174.36.245.123:9999';
const API_SERVER = 'http://service.dreamdogapp.com:8080';
const ACCESS_LEVEL = {
  0:'VISITOR',
  1:'ADMIN',
  2:'USER'
}
class DataService{

  constructor(){

    this.userToken = '';
    this.userToken = localStorage._ddToken;
    this.user = null;
    this.userType = null;
    if (this.userToken && this.userToken.length > 0) {
      this._fetchUserProfile();
    } else {
      this.userType = ACCESS_LEVEL[0];
    }
  }

  setUserToken(token){

    this.userToken = localStorage._ddToken = token;
    this.userType = null;
    this._fetchUserProfile();

  }

  getUserType(){

    return this.userType;
  }

  _fetchUserProfile(){

    var self = this;

    this.fetUserInfo().then((res)=>{
      this.user = res.data;
      if(this.user.role == 'ADMIN'){

        self.userType  = ACCESS_LEVEL[1];
      }else{

        toastr.error('User must be an admin')
        self.userType  = ACCESS_LEVEL[0];
        delete localStorage._ddToken;
        self.userToken = null;
      }
    }).catch(function (error) {

      self.userType  = ACCESS_LEVEL[0];
      delete localStorage._ddToken;
      self.userToken = null;
    });
  }

  getUser(){

    return this.user;
  }

  deleteDogViaId(id){

    return axios({
      method: 'DELETE', url: `${API_SERVER}/api/dogs/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  getAllUsers(pageNum,pageSize){
    return axios({
      method: 'GET', url: `${API_SERVER}/api/users?size=${pageSize}&page=${pageNum}&name=`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  getAllBreeds(pageNum,pageSize){
    return axios({
      method: 'GET', url: `${API_SERVER}/api/breeds?allbreeds=true&size=${pageSize}&page=${pageNum}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }
  updateMediaViaId(media){

    return axios({
      method: 'PUT', url: `${API_SERVER}/api/media/${media.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:media
    })
  }

  updateBreedViaId(breed){

    return axios({
      method: 'PUT', url: `${API_SERVER}/api/breeds/${breed.id}`,
      headers: {

        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:breed
    })
  }

  getBreedViaId(id){
    return axios({
      method: 'GET', url: `${API_SERVER}/api/breeds/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  getDogViaId(id){
    return axios({
      method: 'GET', url: `${API_SERVER}/api/dogs/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  updateDogViaId(id,dog){
    return axios({
      method: 'PUT', url: `${API_SERVER}/api/dogs/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:dog
      })
  }

  deleteMediaViaId(mediaId){

    return axios({
      method: 'DELETE', url: `${API_SERVER}/api/media/${mediaId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})

  }

  getMediaViaMediaId(media){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/media/${media.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})

  }

  getMediaViaBreedId(breedId,pageNum,pageSize){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/breeds/${breedId}/media?page=${pageNum}&size=${pageSize}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})

  }


  getMediaViaAlbumId(albumId,pageNum,pageSize){

    return axios({
    method: 'GET', url: `${API_SERVER}/api/scopes/${albumId}/media?page=${pageNum}&size=${pageSize}`,
      headers: {
      'Content-Type': 'application/json',
        'Authorization': this.userToken
    }})

  }


  getMediaViaUserId(userId,pageNum,pageSize){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/media?page=${pageNum}&size=${pageSize}&userid=${userId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})


  }

  getMediaViaDogId(dogId,pageNum,pageSize){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/dogs/${dogId}/media?page=${pageNum}&size=${pageSize}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})


  }

  getDogsViaUserId(userId,pageNum,pageSize){
    return axios({
      method: 'GET', url: `${API_SERVER}/api/dogs?page=${pageNum}&size=${pageSize}&userid=${userId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  updateAlbumViaId(id,album){

    return axios({

      method: 'PUT', url: `${API_SERVER}/api/scopes/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:album

    })

  }

  deleteAlbumViaId(id){

    return axios({
      method: 'DELETE', url: `${API_SERVER}/api/scopes/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }


  getAlbumViaId(id){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/scopes/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  getAlbumsViaUserId(userId,pageNum,pageSize){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/scopes?page=${pageNum}&size=${pageSize}&userid=${userId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  updateUserViaId(id,user){

    return axios({
      method: 'PUT', url: `${API_SERVER}/api/admin/user/${user.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:user
      })
  }

  getUserViaId(id){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})

  }

  getUsersViaNickname(pageNum,pageSize,nickname){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/users?size=${pageSize}&page=${pageNum}&name=${nickname}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})
  }

  fetUserInfo (){

    return axios({
      method: 'GET', url: `http://service.dreamdogapp.com:8080/api/me`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})

  }

  login(username,password){

  return axios({
    method: 'POST', url: `${API_SERVER}/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': BASIC_AUTH
    },
    data: $.param(
      {
        'grant_type': 'password',
        'username': username,
        'password': password
      }
    )
  })
  }

  featureImage(image){

    return axios({
      method: 'PUT', url: `${API_SERVER}/api/media/${image.id}/featured`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:image
    })
  }

  defeatureImage(image){
    return axios({
      method: 'DELETE', url: `${API_SERVER}/api/media/${image.id}/featured`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }
    })
  }

  reportImage(image, reason){
    return axios({
      method: 'POST', url: `${API_SERVER}/api/media/${image.id}/reports`,
      headers:{
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:
      {
        'reason': reason
      }
    })
  }

  getFeatureMedias(){

    return axios({
      method: 'GET', url: `${API_SERVER}/api/media/featured`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      }})

  }

  resetPassword(email){
    return axios({
      method: 'POST', url: `${API_SERVER}/api/account/reset_password/init`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.userToken
      },
      data:
        {
          'emailAddress': email
        }
    })
  }
}

let dataServices = new DataService();
module.exports = dataServices;
