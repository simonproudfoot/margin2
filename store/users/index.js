
export const state = () => ({
  user: null,
  userDetails: null,
  anyValues: 0,
});
export const mutations = {
  test(val) {
   // alert(val)
  },
  SET_USER: (state, data) => {
    state.user = data;
  },
  SET_USER_DETAILS: (state, data) => {
    state.userDetails = data;
  },
  SET_USER_AVATAR: (state, data) => {
    state.userDetails['userPhotoURL'] = data
  },
  UPDATE_USER_DETAILS: (state, data) => {
    state.userDetails = {
      ...state.userDetails,
      ...data
    };
  }
};


export const actions = {
  async login({ dispatch }, account) {
    //console.log('Processing logon')
    await this.$fire.authReady()
    let authResult = await this.$fire.auth.signInWithEmailAndPassword(account.email, account.password);
    console.log('actions login', authResult)
    await dispatch("getJWT");
  },


  async getJWT({ commit }) {
    // get JWT From firebase
    await this.$fire.authReady()
    const token = await this.$fire.auth.currentUser.getIdToken();
    const { email, uid } = this.$fire.auth.currentUser;
    // set cookie
    //  Cookie.set("access_token", token);

    console.log('token', token)
    commit("SET_USER", { email, uid });

  },
  async loginFacebook({ dispatch }) {
    await this.$fire.authReady()

    const provider = new this.$fireModule.auth.FacebookAuthProvider();
    const result = await this.$fire.auth.signInWithPopup(provider);

    const { additionalUserInfo, user } = result;
    if (additionalUserInfo) {
      const { profile, isNewUser } = additionalUserInfo;
      if (isNewUser) {
        const firstName = profile.first_name || null;
        const lastName = profile.last_name || null;
        const photoURL = profile?.picture?.data?.url || null;
        await this.$fire.firestoreReady()
        await this.$fire.firestore
          .collection("users")
          .doc(user.uid)
          .set({
            userID: user.uid,
            firstName,
            lastName,
            photoURL,
            subscriptionPlan: "free",
            projects: []
          });
      }
    }
    await dispatch("getJWT");
  },
  async loginTwitter({ dispatch }) {

    await this.$fire.authReady()
    const provider = new this.$fireModule.auth.TwitterAuthProvider();
    const result = await this.$fire.auth.signInWithPopup(provider);
    const { additionalUserInfo, user } = result;
    if (additionalUserInfo) {
      const { profile, isNewUser } = additionalUserInfo;
      if (isNewUser) {
        const names =
          user.displayName?.split(" ") || profile.name?.split(" ") || [];
        const firstName = names.length ? names[0] : null;
        const lastName = names.length > 1 ? names[names.length - 1] : null;
        const photoURL =
          user.photoURL || profile.profile_image_url_https || null;
        await this.$fire.firestoreReady()
        await this.$fire.firestore
          .collection("users")
          .doc(user.uid)
          .set({
            userID: user.uid,
            firstName,
            lastName,
            photoURL,
            subscriptionPlan: "free",
            projects: []
          });
      }
    }
    await dispatch("getJWT");
  },
  async loginGithub({ dispatch }) {
    await this.$fire.firestoreReady()
    await this.$fire.authReady()
    const provider = new this.$fireModule.auth.GithubAuthProvider();
    const result = await this.$fire.auth.signInWithPopup(provider);

    const { additionalUserInfo, user } = result;
    if (additionalUserInfo) {
      const { profile, isNewUser } = additionalUserInfo;
      if (isNewUser) {
        const names =
          user?.displayName?.split(" ") || profile?.name?.split(" ") || [];
        const firstName = names.length ? names[0] : null;
        const lastName = names.length > 1 ? names[names.length - 1] : null;
        const photoURL = profile?.avatar_url || null;
        const email = user.email || profile.email || null;
        await this.$fire.firestore
          .collection("users")
          .doc(user.uid)
          .set({
            userID: user.uid,
            firstName,
            lastName,
            photoURL,
            email,
            subscriptionPlan: "free",
            projects: []
          });
      }
    }
    await dispatch("getJWT");
  },

  async createNewUser({ commit, dispatch }, account) {
    // create user

    await this.$fire.authReady()
    const user = await this.$fire.auth.createUserWithEmailAndPassword(
      account.email,
      account.password
    );
    await dispatch("getJWT");
    // send verification email
    dispatch("sendEmailVerification");
    return user
  },
  async sendEmailVerification() {
    await this.$fire.authReady()
    const user = this.$fire.auth.currentUser;
    if (user) {
      await this.$fire.auth.currentUser.sendEmailVerification();
    }
  },
  async resetPassword(context, payload) {
    await this.$fire.authReady()
    return this.$fire.auth.sendPasswordResetEmail(payload.email);
  },
  async getUserDetails({ commit, state }) {
    await this.$fire.authReady()
    await this.$fire.databaseReady()
    await this.$fire.firestoreReady()
    const userSnapshot = await this.$fire.firestore.collection("users").doc(state.user.uid).get();
    const userDetails = await userSnapshot.data();
    userDetails['userPhotoURL'] = ''
    commit("UPDATE_USER_DETAILS", userDetails);

    // avatar
    const dbRef = this.$fire.database.ref();
    let av = await dbRef.child("avatars").get(userDetails.username)

    if (av.val()) {
      commit("SET_USER_AVATAR", av.val()[userDetails.username])
    }
    return userDetails
  },




  async updateUserDetails({ commit, state }, payload) {
    //  await this.$fire.authReady()
    await this.$fire.firestoreReady()
    if (state.user.uid) {
      await this.$fire.firestore
        .collection("users")
        .doc(state.user.uid)
        .set(
          {
            ...payload
          },
          { merge: true }
        );
      commit("UPDATE_USER_DETAILS", payload);
    }
  },
  async changePassword({ dispatch }, payload) {
    await this.$fire.authReady()
    await dispatch("reauthenticate", payload);
    await this.$fire.auth.currentUser.updatePassword(payload.password);
  },
  async reauthenticate({ state }, payload) {
    await this.$fire.authReady()
    const providerId = this.$fire.auth.currentUser?.providerData?.[0]?.providerId;
    let credential = null;
    if (providerId === "password") {
      credential = this.$fire.auth.EmailAuthProvider.credential(
        state.user.email,
        payload.currentPassword
      );
      await this.$fire.auth.currentUser.reauthenticateWithCredential(credential);
    } else {
      if (providerId === "github.com") {
        await this.$fire.auth.currentUser.reauthenticateWithPopup(
          new this.$fireModule.auth.GithubAuthProvider()
        );
      } else if (providerId === "facebook.com") {
        await this.$fire.auth.currentUser.reauthenticateWithPopup(
          new this.$fireModule.auth.FacebookAuthProvider()
        );
      } else if (providerId === "twitter.com") {
        await this.$fire.auth.currentUser.reauthenticateWithPopup(
          new this.$fireModule.auth.TwitterAuthProvider()
        );
      }
    }
  }
};
export const getters = {
  user(state) {
    return state.user ? state.user : null;
  },
  userDetails(state) {
    return state.userDetails ? state.userDetails : null;
  },
  userPhotoURL: state => state.userDetails?.userPhotoURL || null,
  userCoverImage: state => state.userDetails?.coverImage || null

};



