//skirtas apsaugoti tam tikrus routus, kad juos galetu pasiekti tik prisijunge vartotojai, turintys galiojanti JWT tokena.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; //istraukia tokena is authorization headerio
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET); //tikrina tokena su slaptu raktu
        req.userId = payload.userId; //iraso vartotojo ID i request objekta
        next(); //kai tokenas galioja middleware paleidzia programos eiga tuoliau
    } catch {
        res.status(401).json({ error: 'Invalid token' }); //grazina klaida jei neteisingas tokenas
    }
};
