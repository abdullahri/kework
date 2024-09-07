export const UserController = (req, res, next) => {

    const { name } = req.body
    res.status(200).send('User has been define');
    if (!name) {
        return res.status(400).json({ error: 'please show the name' });
    }
}