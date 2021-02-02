import firebase from "firebase/app";
import 'firebase/storage';
import {upload} from "./upload";

const firebaseConfig = {
    apiKey: "AIzaSyDGZwKB52tBLampC0S6KTFdL00a-MBbFg0",
    authDomain: "upload-files-e6349.firebaseapp.com",
    projectId: "upload-files-e6349",
    storageBucket: "upload-files-e6349.appspot.com",
    messagingSenderId: "735305367391",
    appId: "1:735305367391:web:d84601437b8829dffac0ea"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`);
            const task = ref.put(file);

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%';
                const block = blocks[index].querySelector('.preview-info-progress');
                block.textContent = percentage;
                block.style.width = percentage;
            }, error => {
                console.log(error);
            }, () => {
                console.log('complete');
            })
        })
    }
});
