import { useState, useEffect, useContext } from "react";
import styles from "./Profile.module.scss";
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { updateUser } from "../../components/api/auth.api";
import { MyGlobalContext } from "../../context/context";
import AdminSection from "../../components/adminSection/adminSection";
import { useGlobalContext } from '../../context/context.ts'


const Profile: React.FC = () => {
  const img = "https://www.w3schools.com/howto/img_avatar.png";

  const [usernameUpdate, setUsernameUpdate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]); 
  const [favoriteCrypto, setFavoriteCrypto] = useState<string[]>([]);
  const [newFavoriteCrypto, setNewFavoriteCrypto] = useState<string>("");
  const [currencyUpdate, setCurrencyUpdate] = useState<string>("EUR");
  const { userId , setCurrency, username } = useContext(MyGlobalContext);
  const { role } = useGlobalContext();


  useEffect(() => {
    // Charger les mots-clés depuis le local storage au démarrage
    const storedKeywords = JSON.parse(localStorage.getItem("keywords") || "[]");
    setKeywords(storedKeywords);
    const storedFavoriteCrypto = JSON.parse(localStorage.getItem("favoriteCrypto") || "[]");
    setFavoriteCrypto(storedFavoriteCrypto);
  }, []);

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "username":
        setUsernameUpdate(e.target.value);
        break;
      case "email":
        if (e.target.value.includes("@")) {
          //a changer avec une vrai modif de mail
          setEmail(e.target.value);
        } else {
          setEmail("");
        }
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "newKeyword":
        setNewKeyword(e.target.value);
        break;
      case "currencyUpdate":
        setCurrencyUpdate(e.target.value);
        setCurrency(e.target.value);
        break;
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.name) {
      case "currencyUpdate":
        setCurrencyUpdate(e.target.value);
        setCurrency(e.target.value);
        break;
    }
  };



  const handleDeleteKeyword = (keywordToDelete: string) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== keywordToDelete
    );
    setKeywords(updatedKeywords);
    localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
  };

  const handleDeleteFavoriteCrypto = (favoriteCryptoToDelete: string) => {
    const updatedFavoriteCrypto = favoriteCrypto.filter(
      (favoriteCrypto) => favoriteCrypto !== favoriteCryptoToDelete
    );
    setFavoriteCrypto(updatedFavoriteCrypto);
    localStorage.setItem("favoriteCrypto", JSON.stringify(updatedFavoriteCrypto));
  }

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      setNewKeyword(""); // Réinitialiser le champ après l'ajout
    }
  };

  const handleAddFavoriteCrypto = () => {
    if(newFavoriteCrypto.length <= 3){
      toast.error("Please enter a valid crypto name or the entire name");
    }
    else{
      const lowerCaseFavoriteCrypto = newFavoriteCrypto.toLowerCase();
      if (lowerCaseFavoriteCrypto && !favoriteCrypto.includes(lowerCaseFavoriteCrypto)) {
        const updatedFavoriteCrypto = [...favoriteCrypto, lowerCaseFavoriteCrypto];
        setFavoriteCrypto(updatedFavoriteCrypto);
        localStorage.setItem("favoriteCrypto", JSON.stringify(updatedFavoriteCrypto));
        setNewFavoriteCrypto(""); // Réinitialiser le champ après l'ajout
      }
    }
  }

  const handleSubmit = async () => {
    // logic to submit form
    if (usernameUpdate === "" || email === "" || password === "" || currencyUpdate === "") {
      toast.error("Please fill all the fields with valid informations");
    } else {
      const status = await updateUser(
        userId.toString(), 
        usernameUpdate,
        email,
        password,
        currencyUpdate 
      );
  
      if (status === 201) {
        toast.success("Profile updated successfully");
        window.location.reload(); // Refresh the page
      } else {
        toast.error("Failed to update profile");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <img src={img} alt="" className={styles.profileImage} />
          <h2 className={styles.username}>{username}</h2>
        </div>
      </div>
      <div className={styles.form}>
        <h1 className={styles.title}>Edit your profile</h1>
        <div className={styles.formContent}>
          <label className={styles.label}>
            Username
            <input
              type="text"
              name="username"
              className={styles.input}
              onChange={handleFrom}
            />
          </label>
          <label className={styles.label}>
            Email
            <input
              type="email"
              name="email"
              className={styles.input}
              onChange={handleFrom}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              type="password"
              name="password"
              className={styles.input}
              onChange={handleFrom}
            />
          </label>
          <label className={styles.label}>
            Currency
            <select
              className={styles.input}
              name="currencyUpdate"
              onChange={handleSelectChange}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </label>
          <label className={styles.label}>
            Keywords
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Ajouter un mot-clé"
              className={styles.input}
            />
            <button onClick={handleAddKeyword}>Ajouter</button>
            <div className={styles.keywords}>
              {keywords.map((keyword, index) => (
                <div key={index} className={styles.keyword}>
                  {keyword}
                  <button onClick={() => handleDeleteKeyword(keyword)}>
                    <IoCloseCircleSharp />
                  </button>
                </div>
              ))}
            </div>
          </label>
          <label className={styles.label}>
            Crypto favoris
            <input
              type="text"
              value={newFavoriteCrypto}
              onChange={(e) => setNewFavoriteCrypto(e.target.value)}
              placeholder="Ajouter une crypto favoris"
              className={styles.input}
            />
            <button onClick={handleAddFavoriteCrypto}>Ajouter</button>
            <div className={styles.keywords}>
              {favoriteCrypto.map((favoriteCrypto, index) => (
                <div key={index} className={styles.keyword}>
                  {favoriteCrypto}
                  <button onClick={() => handleDeleteFavoriteCrypto(favoriteCrypto)}>
                    <IoCloseCircleSharp />
                  </button>
                </div>
              ))}
            </div>
          </label>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      { role === "admin" ?
        <AdminSection />
      : null}
    </div>
  );
};

export default Profile;