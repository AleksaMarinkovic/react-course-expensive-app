import { googleAuthProvider } from "../firebase/firebase";
import { getAuth, signInWithPopup, signOut } from "@firebase/auth";

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogin = () => {
  return () => {
    return signInWithPopup(getAuth(), googleAuthProvider);
  };
}

export const startLogout = () => {
  return () => {
    return signOut(getAuth());
  }
}