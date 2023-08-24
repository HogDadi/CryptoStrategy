import Cookie from 'js-cookie';

export default function updateCookie(name, newValue){
  const oldValue = Cookie.get(name);
  const updatedValue = oldValue + newValue;

  Cookie.set(name, updatedValue, {
    expires: 7,
    secure: false,
    sameSite: 'strict',
    path: '/'
  });
}