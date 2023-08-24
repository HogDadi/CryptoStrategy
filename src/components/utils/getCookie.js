import Cookie from 'js-cookie';

export default function getCookie(name) {
  return Cookie.get(name);
}