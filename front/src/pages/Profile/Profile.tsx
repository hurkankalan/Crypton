import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const img = "https://www.w3schools.com/howto/img_avatar.png";

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]); // Mise à jour pour utiliser l'état

  useEffect(() => {
    // Charger les mots-clés depuis le local storage au démarrage
    const storedKeywords = JSON.parse(localStorage.getItem("keywords") || "[]");
    setKeywords(storedKeywords);
  }, []);

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
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
    }
  };

  const handleDeleteKeyword = (keywordToDelete: string) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== keywordToDelete
    );
    setKeywords(updatedKeywords);
    localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
  };

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      setNewKeyword(""); // Réinitialiser le champ après l'ajout
    }
  };

  const handleSubmit = () => {
    // logic to submit form
    if (username === "" || email === "" || password === "") {
      toast.error("Please fill all the fields with valid informations");
    } else {
      toast.success("Profile updated successfully");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <img src={img} alt="" className={styles.profileImage} />
          <h2 className={styles.username}>Username</h2>
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
          <button className={styles.submitButton} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;