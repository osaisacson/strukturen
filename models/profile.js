class Profile {
  constructor(id, profileId, profileName, email, expoTokens = []) {
    this.id = id;
    this.profileId = profileId;
    this.profileName = profileName;
    this.email = email;
    this.expoTokens = expoTokens;
  }
}

export default Profile;
