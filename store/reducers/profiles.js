import Profile from '../../models/profile';
import {
  SET_PROFILES,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  SET_CURRENT_PROFILE,
} from '../actions/profiles';

const initialState = {
  allProfiles: [],
  userProfile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES:
      return {
        ...state,
        allProfiles: action.allProfiles,
        userProfile: action.userProfile,
      };

    case SET_CURRENT_PROFILE: {
      const userProfile = action.payload.uid
        ? state.allProfiles.find((profile) => profile.profileId === action.payload.uid)
        : {};

      return {
        ...state,
        userProfile,
      };
    }
    case CREATE_PROFILE: {
      const newProfile = new Profile(
        action.profileData.firebaseId,
        action.profileData.profileId,
        action.profileData.profileName,
        action.profileData.email
      );

      return {
        ...state,
        allProfiles: state.allProfiles.concat(newProfile),
      };
    }

    case UPDATE_PROFILE: {
      const profileIndex = state.allProfiles.findIndex(
        (profile) => profile.profileId === action.currUser //Find the index of the profile where the profileId is the same as the currently logged in userId
      );
      const updatedProfile = new Profile(
        action.fid, //the id of the profile in firebase
        state.allProfiles[profileIndex].profileId, //prev state profileId (ie, don't update this)
        action.profileData.profileName,
        action.profileData.email,
        action.profileData.expoTokens
      );
      console.log('store/reducers/profiles/UPDATE_PROFILE, updated profile: ', updatedProfile);
      const updatedProfiles = [...state.allProfiles];
      updatedProfiles[profileIndex] = updatedProfile;

      return {
        ...state,
        allProfiles: updatedProfiles,
      };
    }
    default:
      return state;
  }
};
