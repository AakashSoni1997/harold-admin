// ----------------------------------------------------------------------
let userDetail = JSON.parse(localStorage.getItem("security_auth"))
console.log("userDetail", userDetail)
const account = {
  displayName: userDetail !== null && userDetail.name,
  email: userDetail !== null && userDetail.email,
  photoURL: userDetail !== null && userDetail.profile_img_url !== null ? userDetail.profile_img_url : '/static/mock-images/avatars/avatar_1.jpg',
};

export default account;
