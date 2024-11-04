// middleware/adminMiddleware.js

const adminMiddleware = (requireRole) => {
    return (req, res, next) => {
        // Check if req.user exists and has a role
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const userRole = req.user.role;

        // Allow access if the user has the required role or is a Super Admin
        if ( userRole === 'Super Admin') {
            return next();
        } 

        // Allow access for Admin, Moderator,Doctor or patient roles
        const allowedRoles = ['Admin', 'Moderator', 'patient','Doctor'];
        if (allowedRoles.includes(userRole)) {
            return next();
        } 

        // Deny access if no conditions are met
        return res.status(403).json({ message: 'Access denied' });
        
    }
}

module.exports = adminMiddleware;