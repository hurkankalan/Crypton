import { useState } from 'react';
import styles from './Profile.module.scss';
import { IoCloseCircleSharp } from "react-icons/io5";

const Profile: React.FC = () => {
    const img = "https://www.w3schools.com/howto/img_avatar.png";
    const keywords = ["BTC", "ETH", "BNB"]; // replace this with actual data


    const [username, setUsername] = useState<string>(""); 
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 
    const [newKeyword, setNewKeyword] = useState<string>(""); 

    const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name);
        switch (e.target.name) {
            case "username":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "newKeyword":
                setNewKeyword(e.target.value);
                break;
        }
    }

    const handleDeleteKeyword = (keyword: string) => {
        // logic to delete keyword
    };

    const handleSubmit = () => { 
        // logic to submit form
    }
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
                <form className={styles.formContent}>
                    <label className={styles.label}>
                        Username
                        <input type="text" name="username" className={styles.input} onChange={handleFrom}/>
                    </label>
                    <label className={styles.label}>
                        Email
                        <input type="email" name="email" className={styles.input} />
                    </label>
                    <label className={styles.label}>
                        Password
                        <input type="password" name="password" className={styles.input} />
                    </label>
                    <label className={styles.label}>
                        Keywords
                        <div className={styles.keywords}>
                            {keywords.map((keyword, index) => (
                                <div key={index} className={styles.keyword}>
                                    {keyword}
                                    <button onClick={() => handleDeleteKeyword(keyword)}><IoCloseCircleSharp /></button>
                                </div>
                            ))}
                        </div>
                    </label>
                    <button type="submit" className={styles.submitButton}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;