import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, push, get, update, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
import { getAuth, signInAnonymously, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBhyGNzZRGgQShP_C9kwAzTm_g_0zJlzg",
  authDomain: "an-psixoloji-33442.firebaseapp.com",
  databaseURL: "https://an-psixoloji-33442-default-rtdb.firebaseio.com",
  projectId: "an-psixoloji-33442",
  storageBucket: "an-psixoloji-33442.firebasestorage.app",
  messagingSenderId: "528809299356",
  appId: "1:528809299356:web:59cae89a64e446dc520c59"
};

const ADMIN_EMAILS = ["samir.akhundoff@gmail.com", "anpsixologiya@gmail.com"];
const PATH = "usaqiq_leads";

const app = initializeApp(firebaseConfig, "usaqiq");
const db = getDatabase(app);
const auth = getAuth(app);

let authReady = null;
function ensureUser(){
  if(auth.currentUser) return Promise.resolve(auth.currentUser);
  if(!authReady){
    authReady = signInAnonymously(auth).then(c => c.user).finally(() => { authReady = null; });
  }
  return authReady;
}

function isAdmin(u){
  return !!(u && !u.isAnonymous && ADMIN_EMAILS.indexOf(u.email) !== -1 && u.emailVerified);
}

window.uiqLeads = {
  async submit(lead){
    await ensureUser();
    await push(ref(db, PATH), {
      name: lead.name,
      phone: lead.phone,
      child: lead.child || "",
      age: lead.age || "",
      scores: lead.scores || {},
      weak: lead.weak || [],
      consent: true,
      status: "new",
      createdAt: serverTimestamp()
    });
  },
  onAuth(cb){
    return onAuthStateChanged(auth, u => cb(isAdmin(u) ? u.email : null, !!u && !u.isAnonymous && !isAdmin(u)));
  },
  async signIn(){
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch(e){
      if(e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")){
        await signInWithRedirect(auth, provider);
      } else { throw e; }
    }
  },
  signOut(){ return signOut(auth); },
  async list(){
    const snap = await get(ref(db, PATH));
    const out = [];
    snap.forEach(ch => { out.push(Object.assign({ id: ch.key }, ch.val())); });
    out.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return out;
  },
  setStatus(id, status){
    const patch = { status: status, sentAt: status === "sent" ? Date.now() : null };
    return update(ref(db, PATH + "/" + id), patch);
  },
  remove(id){ return remove(ref(db, PATH + "/" + id)); }
};
