// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const { Storage } = require('@google-cloud/storage');
const cors = require('cors')({ origin: true });
const { Expo } = require('expo-server-sdk');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment');

// The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp();
const fs = require('fs');
const UUID = require('uuid-v4');
// Imports the Google Cloud client library

// Create a new Expo SDK client
const expo = new Expo();

// Creates a client
const storage = new Storage({
  projectId: 'strukturen-5c143',
  keyFilename: 'strukturen-5c143-firebase.json',
});

exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const body = JSON.parse(request.body);

    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
      console.log(err);
      return response.status(500).json({ error: err });
    });
    const bucket = storage.bucket('strukturen-5c143.appspot.com');
    const uuid = UUID();

    return bucket.upload(
      '/tmp/uploaded-image.jpg',
      {
        uploadType: 'media',
        destination: '/pictures/' + uuid + '.jpg',
        metadata: {
          metadata: {
            contentType: 'image/jpeg',
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      (err, file) => {
        if (!err) {
          return response.status(201).json({
            image:
              'https://firebasestorage.googleapis.com/v0/b/' +
              bucket.name +
              '/o/' +
              encodeURIComponent(file.name) +
              '?alt=media&token=' +
              uuid,
          });
        } else {
          console.log(
            'Error when trying to upload the image into bucket, storeImage index.js: ',
            err
          );
          return response.status(500).json({ error: err });
        }
      }
    );
  });
});

function denormalize(data) {
  if (data) {
    const keys = Object.keys(data);

    if (keys.length) {
      return data[keys[0]];
    }
  }

  return null;
}

function getUserProfileById(profileId) {
  return new Promise((resolve, reject) => {
    admin
      .database()
      .ref('profiles')
      .orderByChild('profileId')
      .equalTo(profileId)
      .on('value', (snapshot) => {
        if (snapshot.exists) {
          resolve(denormalize(snapshot.val()));
        } else {
          reject(new Error('Does not exist.'));
        }
      });
  });
}

exports.sendPushNotifications = functions.database
  .ref('/goals/{goalId}')
  .onUpdate(async ({ before, after }) => {
    const beforeVal = before.val();
    const afterVal = after.val();

    const beforeReservedDate = beforeVal.reservedDate;
    const afterReservedDate = afterVal.reservedDate;
    const beforeSuggestedDate = beforeVal.suggestedDate;
    const afterSuggestedDate = afterVal.suggestedDate;
    const ownerId = afterVal.ownerId;
    const goalName = afterVal.title;

    //Sends a push notification when your goal gets reserved
    if (!beforeReservedDate && afterReservedDate) {
      const reservedUserId = afterVal.reservedUserId;

      try {
        const [reservedBy, goalOwner] = await Promise.all([
          getUserProfileById(reservedUserId),
          getUserProfileById(ownerId),
        ]);

        if (reservedBy && goalOwner.expoTokens) {
          const reservedMessage = {
            to: goalOwner.expoTokens,
            sound: 'default',
            title: 'Produkt Reserverad',
            body: `${reservedBy.profileName} reserverade precis ditt återbruk ${goalName}. Gå in och se vilken tid de föreslagit för upphämtning eller föreslå en tid själv.`,
            _displayInForeground: true,
          };

          return expo
            .sendPushNotificationsAsync([reservedMessage])
            .then(() => console.info('Goal notification sent!'))
            .catch((e) => console.error('Goal notification failed!', e.message));
        }
      } catch (error) {
        return console.error(error.message);
      }
    }

    //Sends a push notification when a proposed collection date is set for your goal
    if (!beforeSuggestedDate && afterSuggestedDate) {
      const reservedUserId = afterVal.reservedUserId;

      try {
        const [suggestedBy, goalOwner] = await Promise.all([
          getUserProfileById(reservedUserId),
          getUserProfileById(ownerId),
        ]);

        const byThemselves = suggestedBy === goalOwner;
        //If the owner was not the one suggesting the time
        if (!byThemselves && suggestedBy && goalOwner.expoTokens) {
          const dateMessage = {
            to: goalOwner.expoTokens,
            sound: 'default',
            title: 'Förslag på upphämtningstid angivet',
            body: `${suggestedBy.profileName} föreslog precis ${moment(afterSuggestedDate)
              .locale('sv')
              .format(
                'MMMM Do, HH:MM'
              )} som upphämtningstid för ditt återbruk: "${goalName}". Gå in och godkänn eller föreslå en annan tid.`,
            _displayInForeground: true,
          };

          return expo
            .sendPushNotificationsAsync([dateMessage])
            .then(() => console.info('Goal date notification sent!'))
            .catch((e) => console.error('Goal date notification failed!', e.message));
        }
      } catch (error) {
        return console.error(error.message);
      }
    }

    return null;
  });
