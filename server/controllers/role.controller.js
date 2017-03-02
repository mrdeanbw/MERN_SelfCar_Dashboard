import Role from '../models/role';

/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
export function getRoles(req, res) {
  Role.find().exec((err, roles) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ roles });
  });
}
