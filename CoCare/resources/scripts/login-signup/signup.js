// import and initialize **************
import { initialize } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
  collection,
  addDoc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  limit,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const { auth } = initialize();
const { firestore } = initialize();

// login ================

async function loginEmailPassword() {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    // console.log(userCredential.user);
    monitorAuthState();
  } catch (error) {
    console.log(error);
  }
}

submitBtn.addEventListener("click", loginEmailPassword);

// create account=================

async function createAccount() {
  const loginEmailSignUp = txtEmailSignUp.value;
  const loginPasswordSignUp = txtPasswordSignUp.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmailSignUp,
      loginPasswordSignUp
    );
    addUserToDatabase(userCredential.user);
    // console.log(userCredential.user);
    monitorAuthState();
  } catch (error) {
    console.log(error);
  }
  // this medthod allow user to login right away with just username and password. The better way is to have email link, sign in with google to enhance security
}
//***change how adding to database work by using uid from authentication to define documentID  */

// parent data>>input how many kid?>>draw number of form according to number of kid>> each submit create new object from kid class

//draw form>> amount of form equal amont of kid
let arrayOfKidObject = [];
kidAmountBth.addEventListener("click", showKidDetailsForm);
// *add feature for user to go back and change number of kids
function showKidDetailsForm() {
  let amontOfForm = Number(kidAmount.value);
  let kidOrder = 1;
  addKidForm();
  //add kid details form
  // for (let i = 0; i < amontOfForm; i++) {
  //   let formHeadline = document.createElement("p");
  //   formHeadline.innerHTML = `Kid #${i + 1}`;

  //   kidDetails.appendChild(formHeadline);

  //   let labelkidFirstName = document.createElement("label");
  //   labelkidFirstName.setAttribute(`for`, `labelkidFirstName${i + 1}`);
  //   labelkidFirstName.innerHTML = `kidFirstName`;

  //   let inputkidFirstName = document.createElement("input");
  //   inputkidFirstName.setAttribute(`type`, `text`);
  //   inputkidFirstName.setAttribute(`name`, `labelkidFirstName`);
  //   inputkidFirstName.setAttribute(`id`, `labelkidFirstName${i + 1}`);

  //   kidDetails.appendChild(labelkidFirstName);
  //   kidDetails.appendChild(inputkidFirstName);

  //   let labelKidLastName = document.createElement("label");
  //   labelKidLastName.setAttribute(`for`, `labelKidLastName${i + 1}`);
  //   labelKidLastName.innerHTML = `KidLastName`;

  //   let inputKidLastName = document.createElement("input");
  //   inputKidLastName.setAttribute(`type`, `text`);
  //   inputKidLastName.setAttribute(`name`, `labelKidLastName`);
  //   inputKidLastName.setAttribute(`id`, `labelKidLastName${i + 1}`);

  //   kidDetails.appendChild(labelKidLastName);
  //   kidDetails.appendChild(inputKidLastName);

  //   let labelkidAge = document.createElement("label");
  //   labelkidAge.setAttribute(`for`, `labelkidAge${i + 1}`);
  //   labelkidAge.innerHTML = `kidAge`;

  //   let inputkidAge = document.createElement("input");
  //   inputkidAge.setAttribute(`type`, `number`);
  //   inputkidAge.setAttribute(`name`, `labelkidAge`);
  //   inputkidAge.setAttribute(`id`, `labelkidAge${i + 1}`);

  //   kidDetails.appendChild(labelkidAge);
  //   kidDetails.appendChild(inputkidAge);

  //   let divAllergy = document.createElement("div");
  //   divAllergy.setAttribute(`id`, `allergyContainer`);
  //   divAllergy.innerHTML = `Please your kid allergy:<br>`;
  //   kidDetails.appendChild(divAllergy);

  //   let labelmilk = document.createElement("label");
  //   labelmilk.setAttribute(`for`, `labelmilk${i + 1}`);
  //   labelmilk.innerHTML = `milk`;

  //   let inputmilk = document.createElement("input");
  //   inputmilk.setAttribute(`type`, `checkbox`);
  //   inputmilk.setAttribute(`name`, `labelmilk`);
  //   inputmilk.setAttribute(`value`, `milk`);
  //   inputmilk.setAttribute(`id`, `labelmilk${i + 1}`);

  //   divAllergy.appendChild(inputmilk);
  //   divAllergy.appendChild(labelmilk);

  //   let labelEgg = document.createElement("label");
  //   labelEgg.setAttribute(`for`, `labelEgg${i + 1}`);
  //   labelEgg.innerHTML = `Egg`;

  //   let inputEgg = document.createElement("input");
  //   inputEgg.setAttribute(`type`, `checkbox`);
  //   inputEgg.setAttribute(`name`, `labelEgg`);
  //   inputEgg.setAttribute(`value`, `Egg`);
  //   inputEgg.setAttribute(`id`, `labelEgg${i + 1}`);

  //   divAllergy.appendChild(inputEgg);
  //   divAllergy.appendChild(labelEgg);

  //   let labelPeanut = document.createElement("label");
  //   labelPeanut.setAttribute(`for`, `labelPeanut${i + 1}`);
  //   labelPeanut.innerHTML = `Peanut`;

  //   let inputPeanut = document.createElement("input");
  //   inputPeanut.setAttribute(`type`, `checkbox`);
  //   inputPeanut.setAttribute(`name`, `labelPeanut`);
  //   inputPeanut.setAttribute(`value`, `Peanut`);
  //   inputPeanut.setAttribute(`id`, `labelPeanut${i + 1}`);

  //   divAllergy.appendChild(inputPeanut);
  //   divAllergy.appendChild(labelPeanut);

  //   let labelGluten = document.createElement("label");
  //   labelGluten.setAttribute(`for`, `labelGluten${i + 1}`);
  //   labelGluten.innerHTML = `Gluten`;

  //   let inputGluten = document.createElement("input");
  //   inputGluten.setAttribute(`type`, `checkbox`);
  //   inputGluten.setAttribute(`name`, `labelGluten`);
  //   inputGluten.setAttribute(`value`, `Gluten`);
  //   inputGluten.setAttribute(`id`, `labelGluten${i + 1}`);

  //   divAllergy.appendChild(inputGluten);
  //   divAllergy.appendChild(labelGluten);

  //   let labelOtherAllergy = document.createElement("label");
  //   labelOtherAllergy.setAttribute(`for`, `labelOtherAllergy${i + 1}`);
  //   labelOtherAllergy.innerHTML = `<br>OtherAllergy`;

  //   let inputOtherAllergy = document.createElement("input");
  //   inputOtherAllergy.setAttribute(`type`, `text`);
  //   inputOtherAllergy.setAttribute(`name`, `labelOtherAllergy`);
  //   inputOtherAllergy.setAttribute(`id`, `labelOtherAllergy${i + 1}`);

  //   divAllergy.appendChild(labelOtherAllergy);
  //   divAllergy.appendChild(inputOtherAllergy);

  //   let labelSchool = document.createElement("label");
  //   labelSchool.setAttribute(`for`, `labelSchool${i + 1}`);
  //   labelSchool.innerHTML = `School`;

  //   let inputSchool = document.createElement("input");
  //   inputSchool.setAttribute(`type`, `text`);
  //   inputSchool.setAttribute(`name`, `labelSchool`);
  //   inputSchool.setAttribute(`id`, `labelSchool${i + 1}`);

  //   //*put in school name and call map API for address,geolocation=======

  //   kidDetails.appendChild(labelSchool);
  //   kidDetails.appendChild(inputSchool);

  //   let labelSpecialNote = document.createElement("label");
  //   labelSpecialNote.setAttribute(`for`, `labelSpecialNote${i + 1}`);
  //   labelSpecialNote.innerHTML = `Special note:`;

  //   let inputSpecialNote = document.createElement("input");
  //   inputSpecialNote.setAttribute(`type`, `text`);
  //   inputSpecialNote.setAttribute(`name`, `labelSpecialNote`);
  //   inputSpecialNote.setAttribute(`id`, `labelSpecialNote${i + 1}`);

  //   kidDetails.appendChild(labelSpecialNote);
  //   kidDetails.appendChild(inputSpecialNote);

  //   //*put in image API

  //   let labelProfileImgKid = document.createElement("label");
  //   labelProfileImgKid.setAttribute(`for`, `labelSpecialNote${i + 1}`);
  //   labelProfileImgKid.innerHTML = `ProfileImgKid:`;

  //   let inputProfileImgKid = document.createElement("input");
  //   inputProfileImgKid.setAttribute(`type`, `text`);
  //   inputProfileImgKid.setAttribute(`name`, `labelSpecialNote`);
  //   inputProfileImgKid.setAttribute(`id`, `labelSpecialNote${i + 1}`);

  //   kidDetails.appendChild(labelProfileImgKid);
  //   kidDetails.appendChild(inputProfileImgKid);

  //   let confirmKidDetailsBtn = document.createElement("button");
  //   confirmKidDetailsBtn.setAttribute(`type`, `button`);
  //   confirmKidDetailsBtn.setAttribute(`id`, `confirmKidDetailsBtn${i + 1}`);
  //   confirmKidDetailsBtn.setAttribute(`onclick`, `createKidObject(${i + 1})`);
  //   confirmKidDetailsBtn.innerHTML = `confirm kid#${i + 1} details`;

  //   kidDetails.appendChild(confirmKidDetailsBtn);

  // *try const Btn1 = document.getElementById(`confirmKidDetailsBtn${i+1}`);
  // *try dynamic variable name (https://www.geeksforgeeks.org/how-to-use-dynamic-variable-names-in-javascript/)
  // var k = 'value';
  // var i = 0;
  // for(i = 1; i < 5; i++) {
  //     eval('var ' + k + i + '= ' + i + ';');
  // }
  // console.log("value1=" + value1);
  // console.log("value2=" + value2);
  // console.log("value3=" + value3);
  // console.log("value4=" + value4);
  // }

  function addKidForm() {
    if (kidOrder <= amontOfForm) {
      let formHeadline = document.createElement("p");
      formHeadline.innerHTML = `Kid #${kidOrder}`;

      KidForm.appendChild(formHeadline);

      let labelkidFirstName = document.createElement("label");
      labelkidFirstName.setAttribute(`for`, `labelkidFirstName`);
      labelkidFirstName.innerHTML = `kidFirstName`;

      let inputkidFirstName = document.createElement("input");
      inputkidFirstName.setAttribute(`type`, `text`);
      inputkidFirstName.setAttribute(`name`, `labelkidFirstName`);
      inputkidFirstName.setAttribute(`id`, `labelkidFirstName`);

      KidForm.appendChild(labelkidFirstName);
      KidForm.appendChild(inputkidFirstName);

      let labelKidLastName = document.createElement("label");
      labelKidLastName.setAttribute(`for`, `labelKidLastName`);
      labelKidLastName.innerHTML = `KidLastName`;

      let inputKidLastName = document.createElement("input");
      inputKidLastName.setAttribute(`type`, `text`);
      inputKidLastName.setAttribute(`name`, `labelKidLastName`);
      inputKidLastName.setAttribute(`id`, `labelKidLastName`);

      KidForm.appendChild(labelKidLastName);
      KidForm.appendChild(inputKidLastName);

      let labelkidAge = document.createElement("label");
      labelkidAge.setAttribute(`for`, `labelkidAge`);
      labelkidAge.innerHTML = `kidAge`;

      let inputkidAge = document.createElement("input");
      inputkidAge.setAttribute(`type`, `number`);
      inputkidAge.setAttribute(`name`, `labelkidAge`);
      inputkidAge.setAttribute(`id`, `labelkidAge`);

      KidForm.appendChild(labelkidAge);
      KidForm.appendChild(inputkidAge);

      let divAllergy = document.createElement("div");
      divAllergy.setAttribute(`id`, `allergyContainer`);
      divAllergy.innerHTML = `Please your kid allergy:<br>`;
      KidForm.appendChild(divAllergy);

      let labelmilk = document.createElement("label");
      labelmilk.setAttribute(`for`, `labelMilk`);
      labelmilk.innerHTML = `milk`;

      let inputmilk = document.createElement("input");
      inputmilk.setAttribute(`type`, `checkbox`);
      inputmilk.setAttribute(`name`, `labelMilk`);
      inputmilk.setAttribute(`value`, `milk`);
      inputmilk.setAttribute(`id`, `labelMilk`);

      divAllergy.appendChild(inputmilk);
      divAllergy.appendChild(labelmilk);

      let labelEgg = document.createElement("label");
      labelEgg.setAttribute(`for`, `labelEgg`);
      labelEgg.innerHTML = `Egg`;

      let inputEgg = document.createElement("input");
      inputEgg.setAttribute(`type`, `checkbox`);
      inputEgg.setAttribute(`name`, `labelEgg`);
      inputEgg.setAttribute(`value`, `Egg`);
      inputEgg.setAttribute(`id`, `labelEgg`);

      divAllergy.appendChild(inputEgg);
      divAllergy.appendChild(labelEgg);

      let labelPeanut = document.createElement("label");
      labelPeanut.setAttribute(`for`, `labelPeanut`);
      labelPeanut.innerHTML = `Peanut`;

      let inputPeanut = document.createElement("input");
      inputPeanut.setAttribute(`type`, `checkbox`);
      inputPeanut.setAttribute(`name`, `labelPeanut`);
      inputPeanut.setAttribute(`value`, `Peanut`);
      inputPeanut.setAttribute(`id`, `labelPeanut`);

      divAllergy.appendChild(inputPeanut);
      divAllergy.appendChild(labelPeanut);

      let labelGluten = document.createElement("label");
      labelGluten.setAttribute(`for`, `labelGluten`);
      labelGluten.innerHTML = `Gluten`;

      let inputGluten = document.createElement("input");
      inputGluten.setAttribute(`type`, `checkbox`);
      inputGluten.setAttribute(`name`, `labelGluten`);
      inputGluten.setAttribute(`value`, `Gluten`);
      inputGluten.setAttribute(`id`, `labelGluten`);

      divAllergy.appendChild(inputGluten);
      divAllergy.appendChild(labelGluten);

      let labelOtherAllergy = document.createElement("label");
      labelOtherAllergy.setAttribute(`for`, `labelOtherAllergy`);
      labelOtherAllergy.innerHTML = `<br>OtherAllergy`;

      let inputOtherAllergy = document.createElement("input");
      inputOtherAllergy.setAttribute(`type`, `text`);
      inputOtherAllergy.setAttribute(`name`, `labelOtherAllergy`);
      inputOtherAllergy.setAttribute(`id`, `labelOtherAllergy`);

      divAllergy.appendChild(labelOtherAllergy);
      divAllergy.appendChild(inputOtherAllergy);

      let labelSchool = document.createElement("label");
      labelSchool.setAttribute(`for`, `labelSchool`);
      labelSchool.innerHTML = `School`;

      let inputSchool = document.createElement("input");
      inputSchool.setAttribute(`type`, `text`);
      inputSchool.setAttribute(`name`, `labelSchool`);
      inputSchool.setAttribute(`id`, `labelSchool`);

      //*put in school name and call map API for address,geolocation=======

      KidForm.appendChild(labelSchool);
      KidForm.appendChild(inputSchool);

      let labelSpecialNote = document.createElement("label");
      labelSpecialNote.setAttribute(`for`, `labelSpecialNote`);
      labelSpecialNote.innerHTML = `Special note:`;

      let inputSpecialNote = document.createElement("input");
      inputSpecialNote.setAttribute(`type`, `text`);
      inputSpecialNote.setAttribute(`name`, `labelSpecialNote`);
      inputSpecialNote.setAttribute(`id`, `labelSpecialNote`);

      KidForm.appendChild(labelSpecialNote);
      KidForm.appendChild(inputSpecialNote);

      //*put in image API

      let labelProfileImgKid = document.createElement("label");
      labelProfileImgKid.setAttribute(`for`, `labelProfileImgKid`);
      labelProfileImgKid.innerHTML = `ProfileImgKid:`;

      let inputProfileImgKid = document.createElement("input");
      inputProfileImgKid.setAttribute(`type`, `text`);
      inputProfileImgKid.setAttribute(`name`, `labelProfileImgKid`);
      inputProfileImgKid.setAttribute(`id`, `labelProfileImgKid`);

      KidForm.appendChild(labelProfileImgKid);
      KidForm.appendChild(inputProfileImgKid);

      let confirmKidDetailsBtn = document.createElement("button");
      confirmKidDetailsBtn.setAttribute(`type`, `button`);
      confirmKidDetailsBtn.setAttribute(`id`, `confirmKidDetailsBtn`);
      // confirmKidDetailsBtn.setAttribute(`onclick`, `createKidObject()`);
      confirmKidDetailsBtn.innerHTML = `confirm kid#${kidOrder} details`;

      KidForm.appendChild(confirmKidDetailsBtn);

      kidOrder++;
      confirmKidDetailsBtn.addEventListener("click", addNextKid);
    } else {
      //activate register button
      console.log("else");
    }
  }

  //add next kid>>remove confirmKidDetailsBtn from previous kid's form>>create previous kid object>>draw form for next kid

  function addNextKid() {
    while (kidAddedDetails.firstChild) {
      kidAddedDetails.removeChild(kidAddedDetails.firstChild);
    }

    // put all allergy to array>>ready to put in object
    let allergyArr = [];
    const milkadded = labelMilk.checked;
    const eggadded = labelEgg.checked;
    const glutenadded = labelGluten.checked;
    const peanutadded = labelPeanut.checked;
    const otherAllergyBoxadded = labelOtherAllergy.checked;

    if (milkadded) {
      allergyArr.push(labelMilk.value);
    }
    if (eggadded) {
      allergyArr.push(labelEgg.value);
    }
    if (glutenadded) {
      allergyArr.push(labelGluten.value);
    }
    if (peanutadded) {
      allergyArr.push(labelPeanut.value);
    }
    if (labelOtherAllergy !== null) {
      allergyArr.push(labelOtherAllergy.value);
    }

    const kid = new kidObject(
      labelkidFirstName.value,
      labelKidLastName.value,
      labelkidAge.value,
      allergyArr,
      labelSchool.value,
      labelSpecialNote.value,
      labelProfileImgKid.value
    );
    kid.pushToArrayOfKidObject(kid);

    // display previous object with edit button
    let kidOrder2 = 1;
    for (let item of arrayOfKidObject) {
      let addedKid = document.createElement("div");
      addedKid.innerHTML = `Kid#${kidOrder2}`;
      addedKid.innerHTML += `<br>${item.kidFirstNameadded}`;
      addedKid.innerHTML += `<br>${item.kidLastNameadded}`;
      addedKid.innerHTML += `<br>${item.kidAgeadded}`;
      addedKid.innerHTML += `<br>${item.allergy}`;
      addedKid.innerHTML += `<br>${item.schooladded}`;
      addedKid.innerHTML += `<br>${item.specialNoteadded}`;
      addedKid.innerHTML += `<br>${item.profileImgKidadded}`;
      kidOrder2++;
      kidAddedDetails.appendChild(addedKid);
    }

    // remove previous form

    while (KidForm.firstChild) {
      KidForm.removeChild(KidForm.firstChild);
    }

    addKidForm();
    // console.log(arrayOfKidObject);
  }
}

class kidObject {
  constructor(
    kidFirstNameadded,
    kidLastNameadded,
    kidAgeadded,
    allergy,
    schooladded,
    specialNoteadded,
    profileImgKidadded
  ) {
    this.kidFirstNameadded = kidFirstNameadded;
    this.kidLastNameadded = kidLastNameadded;
    this.kidAgeadded = kidAgeadded;
    this.allergy = allergy;
    this.schooladded = schooladded;
    this.specialNoteadded = specialNoteadded;
    this.profileImgKidadded = profileImgKidadded;
  }

  pushToArrayOfKidObject() {
    arrayOfKidObject.push(this);
  }
}

async function addUserToDatabase(callBackFromCreateAccount) {
  try {
    const emailNewUser = callBackFromCreateAccount.email;
    const uidNewUser = callBackFromCreateAccount.uid;
    const firstNameParent = firstName.value;
    const lastNameParent = lastName.value;
    const profileImgParent = profileImg.value;

    // create document in database
    await setDoc(doc(firestore, `users/${uidNewUser}`), {
      email: emailNewUser,
      uid: uidNewUser,
      firstNameParent: firstNameParent,
      lastNameParent: lastNameParent,
      profileImgParent: profileImgParent,
      parentScore: 5,
    });

    // write kid document to subcollection

    const targetSubCollection = collection(
      firestore,
      `users/${uidNewUser}/kids`
    );
    console.log(arrayOfKidObject);
    for (let item of arrayOfKidObject) {
      console.log(item);
      let a = item;
      await addDoc(targetSubCollection, a);
    }
    //********** PROBLEM: error writing array of object to database****************** */

    console.log(`add to Database successfully`);
  } catch (error) {
    console.log(error);
  }
}

submitBtnSignUp.addEventListener("click", createAccount);

// search for friend & send friend request =================

async function searchForFriend() {
  try {
    const searchFriendQuery = query(
      collection(firestore, "users"),
      where("firstNameParent", "==", searchInput.value),
      // where("lastNameParent", "==", searchInput.value),
      // ***problem when try search in both firstname and last name
      limit(1)
    );

    const querySnapshot = await getDocs(searchFriendQuery);
    const searchResult = await querySnapshot.forEach((key) => {
      console.log(key.id);
      let result = key.data().firstNameParent;
      // result += key.data().lastNameParent;
      showSearchFriendToOutput(result);
    });

    // fixed issue when there is no user in database with that email
    // config the database to only allow searchForFriend when user logged in already.
  } catch (error) {
    console.log(error);
  }
}

// ***It will crash after second user try to add friend with this person since updateDoc will only uddate laest request

function showSearchFriendToOutput(callBackFromSearchForFriend) {
  let searchHeadline = document.createElement("p");
  searchHeadline.innerHTML = "Search results =";
  let createNewParagraph = document.createElement("p");
  createNewParagraph.setAttribute(`id`, `searchResult`);
  createNewParagraph.innerHTML = callBackFromSearchForFriend;
  let addFriendButton = document.createElement("button");
  addFriendButton.setAttribute(`id`, `sendFriendRequestBtn`);
  addFriendButton.setAttribute(`type`, `button`);
  // addFriendButton.setAttribute(`onclick`, `sendFriendRequest()`);
  addFriendButton.innerHTML = "Send friend request";
  //will cause an error when search result showing more than 1 since ID will duplicate

  output.appendChild(searchHeadline);
  output.appendChild(createNewParagraph);
  output.appendChild(addFriendButton);

  async function sendFriendRequest() {
    console.log(`sendFriendRequest is called`);
    // search for this user in database collection>document
    try {
      // =====new version==========================================================
      let targetedUser = searchResult.innerHTML;
      console.log(targetedUser);

      const searchFriendQuery = await query(
        collection(firestore, "users"),
        where("firstNameParent", "==", targetedUser),
        //*****now it retrieve search parameter from search box which can cause problem in the future where some  user may have a duplicate name */
        // where("lastNameParent", "==", targetedUser),
        limit(1)
      );

      const querySnapshot = await getDocs(searchFriendQuery);
      console.log(querySnapshot);
      let userID;
      const docURL = await querySnapshot.forEach((key) => {
        userID = key.id;
        console.log(`key.id`);
        console.log(key.id);
      });
      // console.log(userID)

      const currentUser = auth.currentUser;
      console.log(currentUser);
      const friendRequestSentField = {
        requestStatus: true,
        friendRequestFromUid: `${currentUser.uid}`,
        friendRequestFromEmail: `${currentUser.email}`,
        // above is worked because it pull data from auth>>below is undefined because it need to pull data from user database not auth
        // friendRequestFromFirstName: `${currentUser.firstNameParent}`,
        // friendRequestFromLastName: `${currentUser.lastNameParent}`,
        // friendRequestFromProfileImgParent: `${currentUser.profileImgParent}`,
      };

      const targetedDoc = doc(
        firestore,
        `users/${userID}/friend_request/${currentUser.uid}`
      );
      await setDoc(targetedDoc, friendRequestSentField);

      // ==========================================================

      //   let targetedUser = searchResult.innerHTML;

      //   const searchFriendQuery = await query(
      //     collection(firestore, "users"),
      //     where("email", "==", targetedUser),
      //     limit(1)
      //   );

      //   const querySnapshot = await getDocs(searchFriendQuery);
      //   let userID;
      //   const docURL = await querySnapshot.forEach((key) => {
      //     userID = key.id;
      //   });
      //   // console.log(userID)

      //   const currentUser = auth.currentUser;
      //   const friendRequestSentField = {
      //     friendRequestFrom: `${currentUser.email}`,
      //   };

      //   const targetedDoc = doc(
      //     firestore,
      //     `users/${userID}/friend_request/${currentUser.email}`
      //   );
      //   await setDoc(targetedDoc, friendRequestSentField, { merge: true });
    } catch (error) {
      console.log(error);
    }
  }

  sendFriendRequestBtn.addEventListener("click", sendFriendRequest);
}

submitBtnSearch.addEventListener("click", searchForFriend);

// show which user is logged in and thier score
let activeUserDocId;
console.log("activeUserDocId");
console.log(activeUserDocId);

async function monitorAuthState() {
  const user = auth.currentUser;

  const activeUserQuery = await query(
    collection(firestore, "users"),
    where("email", "==", user.email),
    limit(1)
  );

  const querySnapshot = await getDocs(activeUserQuery);
  let userParentScore;

  const docURL = await querySnapshot.forEach((key) => {
    userParentScore = key.data().parentScore;
    activeUserDocId = key.id;
  });

  if (user) {
    let loggedUser = user.email;

    //   console.log(loggedUser);
    showAuthStateToOutput(loggedUser, userParentScore);
    console.log(`auth.currentUser => ${loggedUser}`);
    console.log(`userParentScore => ${userParentScore}`);
  } else {
    let notLoggedInMessage = ` you're not logged in.`;
    //   console.log(notLoggedInMessage);
    showAuthStateToOutput(notLoggedInMessage);
  }
}

function showAuthStateToOutput(userEmail, parentScore) {
  let createUserParagraph = document.createElement("p");
  createUserParagraph.innerHTML = "User logged in now =";
  createUserParagraph.innerHTML += userEmail;
  let createScoreParagraph = document.createElement("p");
  createScoreParagraph.innerHTML = "Score =";
  createScoreParagraph.innerHTML += parentScore;
  output.appendChild(createUserParagraph);
  output.appendChild(createScoreParagraph);
}

async function logout() {
  await signOut(auth);
  clearAuthStateToOutput();
}

function clearAuthStateToOutput() {
  output.innerHTML = "";
}

btnLogout.addEventListener("click", logout);

//accepting friend request

// after click "friend list"

// >> loop through "friend_request" in database to display pending request
// >>>>>> show "accept" and "decline" button
// >>>>>>>>>>>> if accept update database by delete the pending request in friend_request and add document in friend_list with data 1. username 2. profilePic 3. timestamp and ask user to set this friend as authorize person with school and update database field
// >>>>>>>>>>>> if decline, delete request in database
// >> loop through "friend_list" in database to display existing friends with chat button and link to see full profile

async function showFriendList() {
  try {
    console.log(`showFriendList is called`);
    // getting path to current user document
    //how to get document ID of current user
    console.log(`activeUserDocId=` + activeUserDocId);
    const searchFriendListQuery = query(
      collection(firestore, `users/${activeUserDocId}/friend_requests`),
      where("requestStatus", "==", true),
      limit(10)
    );
    console.log(searchFriendListQuery);

    const querySnapshot = await getDocs(searchFriendListQuery);
    console.log(querySnapshot);
    const searchResult = await querySnapshot.forEach((key) => {
      console.log(`searchResult is called`);
      console.log(key.id);
      let result = key.data().uid;
      console.log(result);
      // showFriendRequestToOutput(result);
    });

    // fixed issue when there is no user in database with that email
    // config the database to only allow searchForFriend when user logged in already.
  } catch (error) {
    console.log(error);
  }
}

friendList.addEventListener("click", showFriendList);

// navigation ==========

submitBtn.addEventListener(`click`, () => {
  signIn.classList.toggle("active-div");
  loggedIn.classList.toggle("active-div");
});

linkToSignUp.addEventListener(`click`, () => {
  signIn.classList.toggle("active-div");
  signUp.classList.toggle("active-div");
});

backBtnSignUp.addEventListener(`click`, () => {
  signIn.classList.toggle("active-div");
  signUp.classList.toggle("active-div");
});

submitBtnSignUp.addEventListener(`click`, () => {
  signUp.classList.toggle("active-div");
  loggedIn.classList.toggle("active-div");
});

btnLogout.addEventListener(`click`, () => {
  signIn.classList.toggle("active-div");
  loggedIn.classList.toggle("active-div");
});
