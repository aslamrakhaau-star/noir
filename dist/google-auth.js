const login=document.querySelector('#googleLogin'),logout=document.querySelector('#googleLogout'),status=document.querySelector('#accountStatus');
const config=window.NOIR_FIREBASE_CONFIG;
if(!config?.apiKey||!config?.authDomain||!config?.projectId){status.textContent='Google sign-in is not configured yet. You can still browse and keep your list on this device.'}
else {
 try {
 const [{initializeApp},sdk]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js')]);
 const auth=sdk.getAuth(initializeApp(config));const provider=new sdk.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});
 await sdk.setPersistence(auth,sdk.browserLocalPersistence);
 sdk.onAuthStateChanged(auth,user=>{status.textContent=user?'Signed in as '+(user.displayName||user.email):'Sign in with your Google account.';login.hidden=!!user;logout.hidden=!user;login.disabled=false;document.querySelector('#profile').textContent=user?(user.displayName||user.email||'U').slice(0,1).toUpperCase():'◎'});
 login.onclick=async()=>{login.disabled=true;try{await sdk.signInWithPopup(auth,provider)}catch(e){status.textContent=e.code==='auth/popup-blocked'?'Allow the sign-in popup and try again.':e.code==='auth/popup-closed-by-user'?'Sign-in cancelled.':e.code==='auth/unauthorized-domain'?'This site address needs to be authorized in Firebase.':'Google sign-in could not connect. Please try again.'}finally{login.disabled=false}};
 logout.onclick=()=>sdk.signOut(auth).catch(()=>{status.textContent='Could not sign out. Please try again.'});
 }catch{status.textContent='Google sign-in could not load. Refresh to try again.'}
}
