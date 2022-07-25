export function getIdToken() {
    const idTokenKey = Object.keys(localStorage).find(key=> key.includes('idToken'));
    const idToken = localStorage.getItem(idTokenKey);
    // console.log(idToken);
    return idToken;
}