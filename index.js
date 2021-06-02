import {upload} from './js/upload/upload'
import './style/main.scss'
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDj1e58oeXOkrXcrLnhMkWfOiNW1VVxASE",
    authDomain: "fe-upload-f29c7.firebaseapp.com",
    projectId: "fe-upload-f29c7",
    storageBucket: "fe-upload-f29c7.appspot.com",
    messagingSenderId: "825205049392",
    appId: "1:825205049392:web:0ec741dfc7ff3864eec5f5"
  }

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage 
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url);
                })
            })
        })
    }
})