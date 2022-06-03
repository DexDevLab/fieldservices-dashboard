export default function handler(req, res) {
    const credentials = req.body;
    const adminUser = "admin";
    const adminPassword = "Field@2023";
    const adminLevel = 2;
    if (
        credentials.user === process.env.ADMIN_USER
        && credentials.password === process.env.ADMIN_PASSWORD
        && credentials.level > 0
        )
        {
            res.status(200).json({ user: credentials.user, level: credentials.level});
        }
        else
        {
            res.status(200).json(null);
        }
  }