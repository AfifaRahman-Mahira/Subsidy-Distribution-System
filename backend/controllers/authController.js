const db = require('../utils/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if(!name || !email || !password || !role) return res.status(400).json({ message: "All fields required" });

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results)=>{
        if(err) return res.status(500).json(err);
        if(results.length > 0) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
                 [name,email,hashedPassword,role],
                 (err2,result2)=>{
                    if(err2) return res.status(500).json(err2);
                    return res.status(201).json({ message: "User registered successfully" });
                 });
    });
};

const login = (req,res)=>{
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: "Email & password required" });

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results)=>{
        if(err) return res.status(500).json(err);
        if(results.length === 0) return res.status(400).json({ message: "Invalid credentials" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "Login successful", token });
    });
};

module.exports = { register, login };
