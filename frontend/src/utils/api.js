const _baseUrl = 'http://localhost:3001'; /* ! */
const _headers = { 'Content-Type': 'application/json' };

function _checkResponse(res) {
  console.log(res.ok, res);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function signIn({ password, email }) {
  return fetch(`${_baseUrl}/signin`, {
    method: 'POST',
    headers: _headers,
    body: JSON.stringify({
      password: password,
      email: email,
    }),
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function signUp({ password, email }) {
  return fetch(`${_baseUrl}/signup`, {
    method: 'POST',
    headers: _headers,
    body: JSON.stringify({
      password: password,
      email: email,
    }),
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function getInitialCards() {
  return fetch(`${_baseUrl}/cards`, {
    headers: _headers,
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function addNewCard({ name, link }) {
  return fetch(`${_baseUrl}/cards`, {
    method: 'POST',
    headers: _headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function removeCard(cardId) {
  return fetch(`${_baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: _headers,
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function addLike(cardId) {
  return fetch(`${_baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: _headers,
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function removeLike(cardId) {
  return fetch(`${_baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: _headers,
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function getCurrentUserInfo() {
  return fetch(`${_baseUrl}/users/me`, {
    headers: _headers,
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function editUserInfo({ name, about }) {
  return fetch(`${_baseUrl}/users/me`, {
    method: 'PATCH',
    headers: _headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function editAvatar(link) {
  return fetch(`${_baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: _headers,
    body: JSON.stringify({
      avatar: link,
    }),
    credentials: 'include',
  }).then(res => _checkResponse(res));
}

export function check() {
  return fetch(`${_baseUrl}/users`, {
    method: 'HEAD',
    credentials: 'include',
  }).then(res => _checkResponse(res));
}
