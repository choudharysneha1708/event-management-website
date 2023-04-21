// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADfC3ZegZu9TG1Cwn3O8C3kSEZOXloP0M",
  authDomain: "onethreetwo-a87e0.firebaseapp.com",
  projectId: "onethreetwo-a87e0",
  storageBucket: "onethreetwo-a87e0.appspot.com",
  messagingSenderId: "472438557576",
  appId: "1:472438557576:web:6d30b0d47aefe532a9083d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

if (islogin) {
  console.log("hello!");
  document.getElementById("loginbtn").addEventListener("click", function () {
    console.log("hello3!");
    const loginemail = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;
    console.log(loginemail);
    console.log(password);
    signInWithEmailAndPassword(auth, loginemail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        location.replace("home/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
        alert(error);
      });
  });

  //----------------- user signup authentication ------------------------//
  const f =document.querySelector('#signUp-form');
  f.addEventListener('submit',(ev)=>{
  
  //document.getElementById("reg").addEventListener("click", (e) => {
    console.log("ho");
    const email_signup = document.getElementById("email").value;
    const pass_sgn = document.getElementById("pwd").value;
    const pass_sgn1 = document.getElementById("cpwd").value;
    const name=document.getElementById("user1").value;
    const phn=document.getElementById("phn").value;
    const dob=document.getElementById("date").value;
    const clg=document.getElementById("clg").value;
    const deg=document.getElementById("deg").value;
    const year=document.getElementById("year").value;
     //const profileImg=document.getElementById("profileImg").value;
   // const Img=ev.target.files[0];
    if (pass_sgn == pass_sgn1 && email_signup != "") {
      ev.preventDefault();

      createUserWithEmailAndPassword(auth, email_signup, pass_sgn)
        .then((cred) => {
          const userref=doc(db,"users",cred.user.uid);
          setDoc(userref,{
            name:name,
            email: email_signup,
            phone:phn,
            dob:dob,
            clg:clg,
            deg:deg,
            year:year
            
          })
          .then(()=>{
            const storageref=ref(storage,`userimg/${cred.user.uid}/profilepic`)
            uploadBytes(storageref,profileImg)
            .then(()=>{
              getDownloadURL(storageref)
              .then((link)=>{
                updateDoc(userref,{
                  profileImg:link,
                })
                .then(()=>{
                  console.log("image added!");
                }
                )
                .catch((e)=>{
                  alert(e);
                  console.log("link can't be added!")
                })
              })
              .catch((e)=>{
                alert(e);
                console.log("link can't be get!")
              })
            })
            .catch((e)=>{
              alert(e);
              console.log("img can't be uploaded!")
            })
            console.log("user Added");
            // location.reload();
          })
          .catch(()=>{
            alert("user cannot be added!");
          })
          // location.replace("index.html");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  });
} else if (ishome) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //----------------- ongoing events details printing ------------------------//
      const eventdb = collection(db, "event");
      getDocs(eventdb).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
        //----------------- upcoming events details printing ------------------------//

        var date=Date.now();
        var start=doc.data().starthack;
        var end=doc.data().endhack;
        if(date>=start && date<=end){
                const upcomingMain = document.querySelector("#liveh1");
                const upcomingCard = document.createElement("div");
                upcomingCard.classList = "course-col";
                const eventupcomingCard = `
                <h3>${doc.data().name}</h3>
                <img src="${doc.data().eventImg}" width="200px" >
                <p class="commu">
                   ${doc.data().description}
                </p>
                <button type="button" class="details">Details</button>
                  `;
                upcomingCard.innerHTML += eventupcomingCard;
                upcomingMain.appendChild(upcomingCard);
                const detailbutton=upcomingCard.querySelector('.details');
                detailbutton.addEventListener('click',()=>{
                localStorage.setItem("s",doc.id);
                console.log(localStorage.getItem("s"));
                window.location.href="../submit_project/index.html";
          });
        }
        else if(date>end)
        {
                const upcomingMain = document.querySelector("#past");
                const upcomingCard = document.createElement("div");
                upcomingCard.classList = "course-col";
                const eventupcomingCard = `
                <h3>${doc.data().name}</h3>
                <img src="${doc.data().eventImg}" width="200px" >
                <p class="commu">
                   ${doc.data().description}
                </p>
                <button type="button" class="details">Details</button>
                  `;
                upcomingCard.innerHTML += eventupcomingCard;
                upcomingMain.appendChild(upcomingCard);
                const detailbutton=upcomingCard.querySelector('.details');
                detailbutton.addEventListener('click',()=>{
                localStorage.setItem("s",doc.id);
                console.log(localStorage.getItem("s"));
                window.location.href="../hackathon/hackathon.html";
          });
        }
        else
        {
                const upcomingMain = document.querySelector("#upcoming");
                const upcomingCard = document.createElement("div");
                upcomingCard.classList = "course-col";
                const eventupcomingCard = `
                <h3>${doc.data().name}</h3>
                <img src="${doc.data().eventImg}" width="200px" >
                <p class="commu">
                   ${doc.data().description}
                </p>
                <button type="button" class="details">Details</button>
                  `;
                upcomingCard.innerHTML += eventupcomingCard;
                upcomingMain.appendChild(upcomingCard);
                const detailbutton=upcomingCard.querySelector('.details');
                detailbutton.addEventListener('click',()=>{
                localStorage.setItem("s",doc.id);
                console.log(localStorage.getItem("s"));
                window.location.href="../hackathon/hackathon.html";
          });
        }
          
        });
      });
    }
     else {
      location.replace("../index.html");
    }
  });
}
else if(ishost)
{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          
        }
         else {

          location.replace("../index.html");
        }
      });
      const hostform= document.querySelector('#host1')
      hostform.addEventListener('submit',(e1)=>{
        e1.preventDefault()
    
        const eventname = document.getElementById('firstName').value;
        const eventdes = document.getElementById('description').value;
        const startreg = document.getElementById('date1').value;
        const endreg = document.getElementById('date2').value;
        const starthack = document.getElementById('date3').value;
        const endhack = document.getElementById('date4').value;
        if(eventname=="" || eventdes=="" || !starthack|| !startreg || !endhack || !endreg){
          alert("Enter All Fields");
        }
        else{ 
            const StartdatetimeValue = startreg;
            const Sdatetime = new Date(StartdatetimeValue);
            const Stimestamp = Sdatetime.getTime();

            const EtartdatetimeValue = endreg;
            const Edatetime = new Date(EtartdatetimeValue);
            const Etimestamp = Edatetime.getTime();

            const SHtartdatetimeValue = starthack;
            const SHdatetime = new Date(SHtartdatetimeValue);
            const SHtimestamp = SHdatetime.getTime()

            const EHartdatetimeValue = endhack;
            const EHdatetime = new Date(EHartdatetimeValue);
            const EHtimestamp = EHdatetime.getTime()

            var host=auth.currentUser.uid;
            const eventDataRef = collection(db, "event");
            addDoc(eventDataRef, {
              name: eventname,
              host: host,
              description: eventdes,
              startreg: Stimestamp,
              endreg: Etimestamp,
              starthack: SHtimestamp,
              endhack: EHtimestamp,
            })
            
            .then((eventRef) => {
              const attenderef=doc(db,"registration", eventRef.id);
                    setDoc(attenderef,{

                        reguser : arrayUnion(host)
                    }).then(()=>{
                      console.log("added data!")
                    }).catch((e)=>{
                      alert(e);
                    })
              const stgref=ref(storage,`eventimg/${eventRef.id}/eventpic`)
              console.log(eventImg);
              uploadBytes(stgref,eventImg)
              .then(()=>{
                getDownloadURL(stgref)

                .then((lik)=>{
                  updateDoc(eventRef,{
                    eventImg:lik,
                  })
                  .then(()=>{
                    console.log("image added!");
                    
                  })
                  .catch((e)=>{
                    alert(e);
                    console.log("link can't be added!")
                  })
                })
                  .catch((e)=>{
                    alert(e);
                    console.log("can't get url");
                  })
                .catch((e)=>{
                  alert(e);
                  console.log("img can't be uploaded!");
                })
                
                console.log("user Added");
              })
             
                alert("Event added!");
                // location.replace("index.html")
        window.location.href="../home/index.html";
            })
              .catch((err) => {
                alert(err.message);
              })
        }
      })
}
else if(isprofile)
{
  onAuthStateChanged(auth, (user) => {

    if (user) {
      const userId=user.uid;
      const userref=doc(db,"users", userId);
      getDoc(userref)
      .then((userdata)=>{
        document.getElementById("name").innerHTML=userdata.data().name;
        document.getElementById("clg").innerHTML=userdata.data().clg;
        document.getElementById("deg").innerHTML=userdata.data().deg;
        document.getElementById("email").innerHTML=userdata.data().email;
        document.getElementById("img").src=userdata.data().profileImg;
      })
    }
     else {
      location.replace("../index.html");
    }
  });

}else if(isevedetail)
{
  let x;
  onAuthStateChanged(auth,(user)=>{
    
    if(user) {
       x=user.uid;
      const eventId=localStorage.getItem("s");
      console.log(eventId);
      const eventref=doc(db,"event", eventId);
      getDoc(eventref)
      .then((eventdetail)=>{
        let timestamp = eventdetail.data().startreg;
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let var1= day+"/"+month+"/"+year;
        let var2=var1+" "+ hours+":"+minutes+":"+seconds;

        document.getElementById("regs").innerHTML=var2;

         timestamp = eventdetail.data().endreg;
         date = new Date(timestamp);
         year = date.getFullYear();
         month = date.getMonth() + 1;
         day = date.getDate();
         hours = date.getHours();
         minutes = date.getMinutes();
         seconds = date.getSeconds();
        var1= day+"/"+month+"/"+year;
        var2=var1+" "+ hours+":"+minutes+":"+seconds;        
        document.getElementById("rege").innerHTML=var2;

        timestamp = eventdetail.data().starthack;
         date = new Date(timestamp);
         year = date.getFullYear();
         month = date.getMonth() + 1;
         day = date.getDate();
         hours = date.getHours();
         minutes = date.getMinutes();
         seconds = date.getSeconds();
        var1= day+"/"+month+"/"+year;
        var2=var1+" "+ hours+":"+minutes+":"+seconds;
        document.getElementById("hacks").innerHTML=var2;

        timestamp = eventdetail.data().endhack;
         date = new Date(timestamp);
         year = date.getFullYear();
         month = date.getMonth() + 1;
         day = date.getDate();
         hours = date.getHours();
         minutes = date.getMinutes();
         seconds = date.getSeconds();
        var1= day+"/"+month+"/"+year;
        var2=var1+" "+ hours+":"+minutes+":"+seconds;
        document.getElementById("Hacke").innerHTML=var2;
        document.getElementById("detail").innerHTML=eventdetail.data().description;
        document.getElementById("hackname").innerHTML=eventdetail.data().name;
        document.getElementById("hackimg").src=eventdetail.data().eventImg;
      })
    }else{
      location.replace("../index.html");
    }

  })
  const eventId =localStorage.getItem("s");
 // const userID=auth.currentUser.uid;
 
  const regref=doc(db,"registration",eventId);
  updateDoc(regref,{
    reguser : arrayUnion(x)
  })
  .then(()=>{
    alert("You are successfully registered!");
  
  })
  .catch((e)=>{
    alert(e);
  })
}
