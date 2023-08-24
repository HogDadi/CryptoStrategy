import Cookie from 'js-cookie';

export default function setCookie(name, value){
  Cookie.set(name, value,{
    expires: 7,
    secure: false,
    sameSite: 'strict',
    path: '/'
  })
}

