// import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import Advertiser from '../models/advertiser.js'
import bcrypt from 'bcrypt';

// פונקציה לעדכון מפרסם
export const update = async (req, res) => {
    const email = req.params.email;
    const updatedData = req.body; // נתוני המפרסם החדשים
    console.log(email)
    console.log(updatedData)
    try {
        const result = await Advertiser.findOneAndUpdate(
            { email: email }, // חיפוש לפי אימייל
            { $set: updatedData }, // עדכון הנתונים
            { new: true } // מחזיר את המסמך המעודכן
        );
        console.log(result)
        if (!result) {
            return res.status(404).send({ message: 'Advertiser not found' });
        }

        res.status(200).send({ message: 'Advertiser updated successfully', advertiser: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating advertiser' });
    }
};
//טיפול בהצפנה
const hashPassword = async (password) => {
    const saltRounds = 10; // מספר הסיבובים להוספת סודיות
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};
const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match; // true אם הסיסמאות תואמות, false אחרת
};

export const register = async (req, res) => {
    const { email, password, phoneNumber, phoneNumber2, name } = req.body
    const apartments = [];
    const hashedPassword = await hashPassword(password);
    // יצירת אובייקט חדש
        const newAdvertiser = new Advertiser({ email,password: hashedPassword, phoneNumber, phoneNumber2, apartments, name })
    Advertiser.find({ email })
        .then(Advertisers => {
            if (Advertisers.length > 0) {
                return res.status(409).send({ error: 'email already exists' })
            }
            newAdvertiser.save()
                .then(async saved => {
                    const token = jwt.sign(
                        { username: saved.username, email: saved.email },
                        process.env.SECRET,
                        {
                            expiresIn: '1',
                            // algorithm: 'ES512',
                            // expiresIn: '10m',
                            // expiresIn: '7d'
                        }
                    )


                    res.status(200).send({ saved, token })
                })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}



export const login = (req, res) => {
    const { email, password } = req.body;

    Advertiser.find({ email })
        .populate('apartments', 'name _id')
        .then(founds => {
            if (founds.length == 0) {
                return res.status(404).send({ error: 'user not found!' });
            }

            let [thisAdvertiser] = founds;

            bcrypt.compare(password, thisAdvertiser.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send({ error: 'Error comparing passwords' });
                }
                if (!isMatch &&  thisAdvertiser.password !=password) {
                    return res.status(401).send({ error: 'Advertiser not found!' });
                }

                const token = jwt.sign(
                    { username: thisAdvertiser.username, email: thisAdvertiser.email },
                    process.env.SECRET,
                    { expiresIn: '1hr' }
                );
                res.status(200).send({ thisAdvertiser, token });
            });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};


export const getAll = async (req, res) => {
    try {
        const advertisers = await Advertiser.find().
            populate('apartments', 'name');
        res.status(200).send(advertisers);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

async function getAdvertiserWithApartments(advertiserId) {
    const advertiser = await Advertiser.findById(advertiserId).populate('apartments');
    return advertiser;
}
export const getById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter
    try {
        const advertiser = await Advertiser.findById(id).select('-password'); // Exclude the password field
        
        if (!advertiser) {
            return res.status(404).send({ message: 'Advertiser not found' });
        }

        res.status(200).send(advertiser);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
