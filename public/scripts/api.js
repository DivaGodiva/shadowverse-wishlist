/* global $*/
'use strict';

const api = (function () {
  const details = function (path) {
    return fetch(path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8'},
      body: null, 
      redirect: 'follow'
    });
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
  const remove = function (path, obj) {
    return fetch(path, { 
      method: 'DELETE',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(obj),
    });
  };
  return {
    create,
    details,
    update,
    remove
  };
}());