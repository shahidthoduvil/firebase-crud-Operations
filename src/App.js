
import './App.css';
import { Firebase } from './firebase/config'
import { getDocs, collection, getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
const db = getFirestore(Firebase)

function App() {


  var email = 'amal@gmail.com'
  var password = '123456'

  //signup
  const signup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('user is created', userCredential.user)
        alert('user is created')
        // ...
      }).catch((error) => {
        alert(error)
      });
  }
  //signin

  const signin = () => {


    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(Response => {
        console.log('user is signed');
        alert('user is signed')
      }).catch((error) => {
        alert(error)
      });
  }
 //signout


  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {

      console.log('signout is successfull');
      alert('signout is successfull')
    }).catch((error) => {
      alert(error)
    });
  }




  // get all documents in a collection
  const Showcollection = () => {

    getDocs(collection(db, 'products')).then(snapshot => {
      snapshot.forEach((obj) => {
        console.log(obj.data(), obj.id)
        alert('collection is got')
      })
    })
  }


  // add a document in a collection


  const AddDocument = () => {

    const productsRef = collection(db, "products");
    setDoc(doc(productsRef), { name: 'mi', price: 3000, type: 'watch' });

  }

  // delte a document in a collection
  const deletedocument = () => {

    deleteDoc(doc(db, 'products', 'xWrbVpoi7GVQD5NzSw9P')).catch(err => alert(err))
    console.log('delete')

  }



  const updatedocument = () => {
    const taskref = doc(db, 'products', 'xYeVgSoiOZkgjGDU9yxl');
    updateDoc(taskref, { name: 'hihih' });
    console.log('update')


  }


  return (
    <div className="App">
      <button onClick={signup}>signup</button>
      <button onClick={signin}>signin</button>
      <button onClick={signout}>signout</button>
      <button onClick={Showcollection}>get all</button>
      <button onClick={AddDocument}>set document</button>
      <button onClick={deletedocument}>delete the document</button>
      <button onClick={updatedocument}>update the document</button>
    </div>
  );
}

export default App;
