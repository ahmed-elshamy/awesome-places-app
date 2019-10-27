const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const fs = require("fs");
const UUID = require("uuid-v4");

const {Storage} = require("@google-cloud/storage");

const gcconfig = {
    projectId: "course-4cb7b",
    keyFilename: "awesome-places.json"
};

// const gcs = require("@google-cloud/storage")(gcconfig);
const gcs = new Storage(gcconfig);

admin.initializeApp({
    credential: admin.credential.cert(require("./awesome-places.json"))
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer ")){
            console.log("No token present!");
            response.status(403).json({error: "Unauthorized"});
            return;
        }
        let idToken;
        idToken = request.headers.authorization.split("Bearer ")[1];
        admin.auth().verifyIdToken(idToken)
            .then(decodedToken => {
                const body = JSON.parse(request.body);
                fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
                    console.log(err);
                    return response.status(500).json({error: err});
                });
                const bucket = gcs.bucket("course-4cb7b.appspot.com");
                const uuid = UUID();

                bucket.upload("/tmp/uploaded-image.jpg", {
                    uploadType: "media",
                    destination: "/places/" + uuid + ".jpg",
                    metadata: {
                        metadata: {
                            contentType: "image/jpeg",
                            firebaseStorageDownloadTokens: uuid
                        }
                    }
                }, (err, file) => {
                    if (!err){
                        response.status(201).json({
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                                bucket.name +
                                "/o/" +
                                encodeURIComponent(file.name) +
                                "?alt=media&token=" +
                                uuid
                        });
                    }else {
                        console.log(err);
                        response.status(500).json({error: err});
                    }
                });
                return null;
            })
            .catch(error => {
                console.log("Token is invalid!");
                response.status(403).json({error: "Unauthorized"});
            });
    });
});