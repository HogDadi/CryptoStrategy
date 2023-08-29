import { getAuth, updateProfile } from "firebase/auth";

export default function UpdateUser(){

const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {

}).catch((error) => {

});
user.setCustomParameters({
  'login_hint': 'user@example.com'
});
}