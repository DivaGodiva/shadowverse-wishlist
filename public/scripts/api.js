/* global $*/
'use strict';

const api = (function () {
  // const search = function (path, query) {
  //   console.log(query);
  //   return $.ajax({
  //     type: 'GET',
  //     url: path,
  //     dataType: 'json',
  //     data: query,
  //   });
  // };
  const details = function (path) {
    return fetch(path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8'},
      body: null, 
      redirect: 'follow'
    });
    // return $.ajax({
    //   type: 'GET',
    //   dataType: 'json',
    //   url: path,
    // });
  };
  const update = function (path, obj) {
    return $.ajax({
      type: 'PUT',
      url: path,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
    });
  };
  const create = function (path, obj) {
    return fetch(path, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(obj),
    });
  };
  const remove = function (path) {
    return $.ajax({
      type: 'DELETE',
      dataType: 'json',
      url: path,
    });
  };
  return {
    create,
    // search,
    details,
    update,
    remove
  };
}());