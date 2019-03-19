module.exports = function (req, res, next) { 
    
    if ( req.user.role == 'ResponsableZone'|| 
         req.user.role == 'Administrateur') next();
    else return res.status(403).send('Access denied.');
  }